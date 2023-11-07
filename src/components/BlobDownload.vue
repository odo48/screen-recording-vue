<template>
  <div>
    <video class="video" :src="getBlobURL(this.blob)" controls></video>
    <a
      :href="getBlobURL(this.blob)"
      :download="'video_' + (index + 1) + '.webm'"
      style="display: none"
      ref="downloadLink"
    ></a>
    <Button @click="downloadBlob"> Download Video # {{ index + 1 }} </Button>
  </div>
</template>

<script lang="ts">
import Button from "../components/Button.vue";

export default {
  name: "BlobDownload",
  components: {
    Button,
  },
  props: {
    blob: Blob,
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      blobURL: "",
    };
  },
  methods: {
    getBlobURL(blob: Blob) {
      return URL.createObjectURL(blob);
    },
    downloadBlob() {
      if (this.blob) {
        const downloadLink = this.$refs.downloadLink as HTMLAnchorElement;
        downloadLink.click();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../_variables";

.video {
  height: auto;
  width: 100%;
  padding: 8px 0;
  border-top: 2px solid $darker-blue;
}
</style>
