let s = document.createElement("script");

// install clearScript.js
s = document.createElement("script");
s.src = chrome.runtime.getURL("payload/clearScript.js");
(document.head || document.documentElement).appendChild(s);

// install formatScript.js
s = document.createElement("script");
s.src = chrome.runtime.getURL("payload/formatScript.js");
(document.head || document.documentElement).appendChild(s);