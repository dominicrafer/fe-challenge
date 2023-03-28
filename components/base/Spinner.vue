<template>
  <div class="spinner-container">
    <div
      class="spinner-container__spinner"
      :class="[{ 'reverse-color': reverse }, size]"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "w-12 h-12",
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const sizeData = props.size;
    return {
      sizeData,
    };
  },
};
</script>

<style lang="postcss" scoped>
.spinner-container {
  @apply z-[52];
  &__spinner {
    @apply border-2 border-t-green-600 border-l-green-600 border-r-green-600 border-b-white;
    @apply ease-linear rounded-full;
    -webkit-animation: spinner-container__spinner 1.5s linear infinite;
    animation: spinner-container__spinner 1.5s linear infinite;

    &.reverse-color {
      @apply border-2 border-t-white border-l-white border-r-white border-b-primary !important;
    }
  }
}

@-webkit-keyframes spinner-container__spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner-container__spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>