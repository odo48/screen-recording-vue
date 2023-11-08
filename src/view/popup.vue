<template>
  <div class="popup">
    <div class="popup__title">Media Recorder Extension</div>
    <div class="popup__container">
      <Button @click="this.startScreenRecording" :disabled="recording">
        Screen Record
      </Button>
      <Button @click="this.startWebcamRecording" :disabled="recording">
        Screen Webcam Recording
      </Button>
      <Button @click="this.stopRecording" :disabled="!recording"> Stop </Button>

      <p class="popup__container-recording" v-if="recording">Recording...</p>
      <div v-else>
        <div class="popup__container-subtitle" v-if="mediaStreams.length > 0">
          List of media streams:
        </div>
        <div class="popup__container-blobs">
          <BlobDownload
            v-for="(mediaStream, index) in mediaStreams"
            :key="index"
            :index="index"
            :blob="mediaStream"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getAllBlobsFromIndexedDB,
  getBlobFromIndexedDB,
} from "../helpers/dbRequests";
import BlobDownload from "../components/BlobDownload.vue";
import Button from "../components/Button.vue";

export default {
  name: "popupView",
  components: {
    BlobDownload,
    Button,
  },
  data() {
    return {
      recording: false,
      mediaStreams: [] as Blob[],
      dataFromContent: Blob,
    };
  },
  methods: {
    startScreenRecording() {
      chrome.runtime.sendMessage({ action: "startScreenRecording" });
    },
    startWebcamRecording() {
      chrome.runtime.sendMessage({ action: "startWebcamRecording" });
      this.recording = true;
    },
    stopRecording() {
      chrome.runtime.sendMessage({ action: "stopWebcamRecording" });
      this.recording = false;
    },
    getBlobs() {
      getAllBlobsFromIndexedDB((blobs) => {
        this.mediaStreams = blobs;
      });
    },
    getLastBlob() {
      getBlobFromIndexedDB(
        this.mediaStreams.length + 1,
        (retrievedBlob: Blob | null) => {
          if (retrievedBlob) {
            this.mediaStreams.push(retrievedBlob);
          } else {
            console.error("Blob with that key does not exist");
          }
        }
      );
    },
  },
  mounted() {
    this.getBlobs();
  },
  created() {
    // Listen for messages from the content script to show added video;
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "blobAdded") {
        this.dataFromContent = message.data;
      }
    });
  },
  watch: {
    dataFromContent(newData) {
      if (newData !== null) {
        this.getLastBlob();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../_variables";

.popup {
  background: $dark-blue;
  color: $light-grey;

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    background: $darker-blue;
    padding: 16px;
  }

  &__container {
    position: relative;
    width: 350px;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    border: 16px solid $darker-blue;
    border-top: none;

    &-subtitle {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    &-blobs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      max-height: 250px;
      overflow: auto;
      padding-right: 16px;
    }

    &-recording {
      font-size: 18px;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
