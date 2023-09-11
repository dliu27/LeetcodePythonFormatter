chrome.commands.onCommand.addListener(function (command) {
	if (command === "execute_code") {
		console.log('Command executed:')
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tabId = tabs[0].id;
			chrome.scripting.executeScript({
			target: { tabId: tabId },
			function: injectContentScript
			});
		});
	}
  });
  
  function injectContentScript() {
	// Send a message to the content script to trigger resetCode
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		function: () => {
		  chrome.runtime.sendMessage({ action: "execute_code" });
		}
	  });
	});
  }