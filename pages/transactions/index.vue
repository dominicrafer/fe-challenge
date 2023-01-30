<template>
  <div class="page">
    <PageHeader title="Transactions">
      <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="isLoading"
        @paginate="paginateAction"
        @search="searchAction"
        @export="exportAction"
        @sort="
          () => {
            showSortDrawer = !showSortDrawer;
          }
        "
        @filter="
          () => {
            showFilterDrawer = !showFilterDrawer;
          }
        "
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
                <td align="left">Partner Name</td>
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
    <TransactionsFilterDrawer
      :show="showFilterDrawer"
      @close="
        () => {
          showFilterDrawer = false;
        }
      "
    />
    <TransactionsSortDrawer
      :show="showSortDrawer"
      @close="
        () => {
          showSortDrawer = false;
        }
      "
    />
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  setup(props) {
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
      ],
      tabs = [
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
      ],
      activeTab = ref(0),
      isLoading = ref(false),
      showFilterDrawer = ref(false),
      showSortDrawer = ref(false),
      queryStringParamaters = ref({
        search: "",
        filters: "",
        sorts: "",
        page: 1,
        page_size: 10,
      });

    function paginateAction(event) {
      queryStringParamaters.value = {
        ...queryStringParamaters.value,
        page: event,
      };
      console.log("paginate", queryStringParamaters.value);
    }

    function changeTabAction(event) {
      activeTab.value = event;
    }
    function searchAction(event) {
      queryStringParamaters.value = {
        ...queryStringParamaters.value,
        search: event,
      };
      console.log("search", queryStringParamaters.value);
    }
    function exportAction(event) {
      console.log("export", event);
    }

    return {
      data,
      tabs,
      activeTab,
      isLoading,
      showFilterDrawer,
      showSortDrawer,
      paginateAction,
      changeTabAction,
      searchAction,
      exportAction,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>