<template>
  <div class="page">
    <PageHeader title="Campaigns">
      <template #right-panel>
        <Button>Create</Button>
      </template>
    </PageHeader>
    <div class="page__body">
      <CampaignsForm />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  setup() {},
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>