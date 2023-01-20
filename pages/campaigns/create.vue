<template>
  <div class="page">
    <PageHeader backRoute="/campaigns" title="Campaigns">
      <template #right-panel>
        <Button>Save</Button>
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