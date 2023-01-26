<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Users">
      <template #right-panel>
        <Button>Save</Button>
      </template>
    </PageHeader>
    <div class="page__body">
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