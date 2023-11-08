chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "blobAdded") {
    // Handle the message, e.g., display the item in your extension UI
  }
});
