<template>
  <div class="page">
    <PageHeader title="Transactions">
      <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :isLoading="false"
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
                <th align="left">Partner Name</th>
                <th align="left">MML Member Id</th>
                <th align="left">Convertion Type</th>
                <th align="left">Points</th>
                <th align="left">Miles</th>
                <th align="left">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(campaign, index) in data" :key="index">
                <td align="left">Campaign Title</td>
                <td align="left">MML Member Id</td>
                <td align="left">Convertion Type</td>
                <td align="left">Points</td>
                <td align="left">Miles</td>
                <td align="left">Created At</td>
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
  setup(props, { emit }) {
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];
    const tabs = [
      {
        label: "pending_otp",
      },
      {
        label: "verified",
      },
      {
        label: "completed",
      },
      {
        label: "voided",
      },
      {
        label: "cancelled",
      },
      {
        label: "source_credited",
      },
      {
        label: "source_debited",
      },
      {
        label: "destination_cancelled",
      },
      {
        label: "destination_debited",
      },
      {
        label: "reversal_failed",
      },
    ];

    return {
      data,
      tabs,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>