<template>
  <div class="page">
    <PageHeader title="Test Page" />
    <div class="page__body" v-testing></div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  setup() {
    const { $api, $dayjs, $toast } = useNuxtApp();
    console.log($dayjs().format("HH:mm"));
  },
};
</script>

<style lang="postcss" scoped>
</style>