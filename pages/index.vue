<template>
  <div class="page">
    <PageHeader title="Test Page" />
    <div class="page__body">
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  setup() {
    const { $api, $dayjs } = useNuxtApp();
    console.log($dayjs().format())

  },
};
</script>

<style lang="postcss" scoped>
</style>