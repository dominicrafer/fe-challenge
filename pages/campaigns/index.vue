<template>
  <div class="page">
    <PageHeader title="Campaigns">
      <template #right-panel>
        <router-link
          :to="{
            path: '/campaigns/create',
          }"
        >
          <Button>Create</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        searchable
        exportable
        @export="exportAction"
        sortable
        @sort="sortAction"
        filterable
        @filter="filterAction"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Campaign Title</th>
                <th align="left">Campaign Code</th>
                <th align="left">Status</th>
                <th align="left">Channels</th>
                <th align="left">Discount Access</th>
                <th align="left">Discount Type</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="left">Campaign Title</td>
                <td align="left">Campaign Code</td>
                <td align="left">Status</td>
                <td align="left">Channels</td>
                <td align="left">Discount Access</td>
                <td align="left">Discount Type</td>
                <td align="right">Actions</td>
              </tr>
            </tbody>
          </table>
        </template>
      </Table>
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