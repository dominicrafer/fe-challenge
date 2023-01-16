<template>
  <div class="container">
    <div
      class="container__header"
      v-if="title || subtitle || $slots['right-panel-title']"
    >
      <div class="header__left-panel">
        <span class="left-panel__title">{{ title }}</span>
        <span class="left-panel__subtitle">{{ subtitle }}</span>
      </div>
      <div class="header__right-panel">
        <span class="right-panel__title">
          <slot name="right-panel-title"></slot
        ></span>
      </div>
    </div>
    <div class="container__body"><slot></slot></div>
    <div class="container__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.container {
  @apply p-[12px] min-w-[250px];
  @apply bg-white;
  @apply rounded-xl;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
  &__header {
    @apply pb-[8px];
    .header__left-panel {
      @apply flex flex-col;
      .left-panel__title {
        @apply font-bold text-[1.5rem] text-primary;
      }
      .left-panel__subtitle {
        @apply text-[0.825rem];
      }
    }
  }
  &__body {
    @apply py-[8px];
  }
  &__footer {
    @apply pt-[8px];
    @apply border-t border-slate-300;
  }
}
</style>