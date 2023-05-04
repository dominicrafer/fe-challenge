<template>
  <NuxtLayout>
    <template #error>
      <div class="error">
        <Icon
          name="material-symbols:error-outline"
          color="#FF6A6A"
          width="120"
          height="120"
        />
        <p class="error__status-code">
          {{ error.statusCode }}
        </p>
        <p class="error__message">{{ errorMessage }}</p>
      </div>
    </template>
  </NuxtLayout>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
    },
  },
  setup(props) {
    const errorMessage = computed(() => {
      switch (props.error.statusCode) {
        case 404:
          return "Ooops, page not found.";
        case 401:
          return "You are not authorized to access this service.";
        default:
          return props.error.message;
      }
    });
    return { errorMessage };
  },
};
</script>

<style lang="postcss" scoped>
.error {
  @apply w-full h-full flex flex-col items-center mt-10 gap-2;
  &__status-code {
    @apply text-[42px] font-bold text-pastel-red;
  }
  &__message {
    @apply text-[28px] font-semibold text-pastel-red;
  }
}
</style>
