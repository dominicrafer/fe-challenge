<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Sidebar />
    <q-page-container>
      <q-page padding class="page-content">
        <!-- <q-inner-loading
          :showing="isLoading"
          color="primary"
          label="Please wait..."
        ></q-inner-loading> -->
        <NuxtPage />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp();
const isLoading = ref<boolean | undefined>(false);
nuxtApp.hook("page:start", () => {
  isLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  isLoading.value = false;
});
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
