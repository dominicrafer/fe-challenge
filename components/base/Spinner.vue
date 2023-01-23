<template>
  <div class="spinner-container">
    <div class="spinner-container__spinner" :class="spinnerSize"></div>
  </div>
</template>

<script>
export default {
  props: {
    spinnerSize: {
      type: String,
      default: "w-12 h-12 border-2",
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.spinner-container {
  &__spinner {
    @apply ease-linear rounded-full;
    border-bottom-color: white;
    border-top-color: #29335c;
    border-left-color: #29335c;
    border-right-color: #29335c;
    -webkit-animation: spinner-container__spinner 1.5s linear infinite;
    animation: spinner-container__spinner 1.5s linear infinite;
    &.reverse-color {
      border-bottom-color: #29335c;
      border-top-color: white;
      border-left-color: white;
      border-right-color: white;
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