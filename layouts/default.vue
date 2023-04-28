<template>
  <div class="default">
    <Sidebar />
    <div class="default__content">
      <Header />
      <div class="flex-grow relative">
        <NuxtPage/>
        <div class="content__loader" v-if="isLoading">
          <div class="loader">
            <Spinner />
            <span> Loading, please wait... </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const nuxtApp = useNuxtApp();
    const isLoading = ref(false);
    nuxtApp.hook("page:start", () => {
      isLoading.value = true;
    });
    nuxtApp.hook("page:finish", () => {
      isLoading.value = false;
    });
   
    return { isLoading };
  },
};
</script>
<style lang="postcss" scoped>
.default {
  @apply w-[100vw] h-[100vh];
  @apply flex flex-row;
  @apply overflow-hidden;

  &__content {
    @apply flex-grow w-full flex flex-col bg-transparent overflow-auto;
    .content__loader {
      @apply w-full flex-grow;
      .loader {
        @apply w-full h-full;
        @apply flex flex-col items-center;
        @apply mt-[120px] gap-[10px];
        span {
          @apply font-bold text-primary;
        }
      }
    }
  }
}
</style>