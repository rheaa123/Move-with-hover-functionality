chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ tasks: [], hiddenTasks: [] }, function() {
      console.log("Storage initialized.");
    });
  });
  