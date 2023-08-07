<template>
  <q-dialog
    v-model="showDialog"
    @hide="$emit('hide')"
    @show="show"
    v-bind="$attrs"
  >
    <q-card class="card" :style="`width: ${width}; max-width: ${width}`">
      <div class="card__title">
        {{ title }}
      </div>
      <div class="card__content">
        <slot> </slot>
      </div>
      <q-inner-loading
        :showing="loading"
        color="primary"
        label="Please wait..."
      ></q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "600px",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["ok", "hide", "show"],
  setup(props, { emit }) {
    const showDialog = ref(props.show);
    watch(
      () => props.show,
      (show) => {
        showDialog.value = show;
      }
    );
    function show() {
      emit("show");
    }
    return {
      showDialog,
      show,
    };
  },
};
</script>

<style lang="postcss" scoped>
.card {
  &__title {
    @apply text-white bg-primary font-semibold text-lg text-left p-4;
  }
  &__content {
    @apply mt-2 px-4 pb-4;
  }
}
</style>
