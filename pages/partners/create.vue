<template>
  <div class="page">
    <PageHeader backRoute="/partners" title="Partners">
      <template #right-panel>
        <Button>Save</Button>
      </template>
    </PageHeader>
    <div class="page__body">
      <PartnersForm />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>