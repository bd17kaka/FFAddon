var data = require("self").data;
const tabs = require("tabs");
 
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("panel").Panel({
  width: 290,
  height: 50,
  contentURL: data.url("text-entry.html"),
  contentScriptFile: data.url("get-text.js")
});
 
// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
require("widget").Widget({
  label: "ÎÒµÄËÑË÷"
  id: "text-entry",
  contentURL: data.url("index.png"),
  panel: text_entry
});

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});
 
// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
  text_entry.hide();
  tabs.open("http://www.google.com.hk/#hl=zh-CN&q="+text);
  tabs.open("http://www.baidu.com/s?wd="+text);
  console.log("http://www.google.com.hk/#hl=zh-CN&q="+text);
});