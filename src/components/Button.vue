<template>
  <button @click="handleClick" class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../_variables";

.btn {
  outline: none;
  box-shadow: none;
  background-color: $green;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 8px 16px;
  color: #dddddd;
  box-shadow: 0 2px 4px $white-box-shadow;
  transition: 0.5s;

  &:hover {
    box-shadow: 2px 4px 10px $white-box-shadow;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
