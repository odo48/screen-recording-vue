chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startScreenRecording") {
    // Start screen recording
  } else if (message.action === "stopScreenRecording") {
    // Stop screen recording
  }
});
