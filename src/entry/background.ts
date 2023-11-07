import { addBlobToIndexedDB } from "../helpers/dbRequests";
let localWebcamStream: MediaStream;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startScreenRecording") {
    startScreenRecording();
  }

  if (message.action === "startWebcamRecording") {
    startWebcamRecording();
  }

  if (message.action === "stopWebcamRecording") {
    stopWebcamRecording();
  }
});

const startScreenRecording = () => {
  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        addBlobToIndexedDB(blob);
      };

      mediaRecorder.start();
    })
    .catch((error) => {
      alert("Error accessing screen capture: " + error);
    });
};

const startWebcamRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((webcamStream) => {
      localWebcamStream = webcamStream;
      const mediaRecorder = new MediaRecorder(webcamStream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        addBlobToIndexedDB(blob);
      };

      mediaRecorder.start();
    })
    .catch(function (error) {
      alert("Error accessing webcam:" + error);
    });
};

const stopWebcamRecording = () => {
  if (localWebcamStream) {
    const tracks = localWebcamStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }
};
