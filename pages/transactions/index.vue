<template>
  <div class="page">
    <PageHeader title="Transactions" />
    <!-- <template #left-panel>
        <Tabs  :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
    <div class="page__body">
      <Table :loading="isLoading" :tabs="tabs" :activeTab="activeTab" @changeTab="changeTab" @paginate="paginateAction"
        @search="searchAction" @export="exportAction" @sort="
          () => {
            showSortDrawer = !showSortDrawer;
          }
        " @filter="
  () => {
    showFilterDrawer = !showFilterDrawer;
  }
">
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
    <TransactionsFilterDrawer :show="showFilterDrawer" @close="
      () => {
        showFilterDrawer = false;
      }
    " />
    <TransactionsSortDrawer :show="showSortDrawer" @close="
      () => {
        showSortDrawer = false;
      }
    " />
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
      ],
      activeTab = ref('pending_otp'),
      isLoading = ref(false),
      showFilterDrawer = ref(false),
      showSortDrawer = ref(false),
      queryStringParameters = reactive({
        search: "",
        filters: "",
        sorts: "",
        page: 1,
        page_size: 10,
      });

    function paginateAction(event) {
      queryStringParameters.value = {
        ...queryStringParameters.value,
        page: event,
      };
      console.log("paginate", queryStringParameters.value);
    }

    function changeTabAction(event) {
      activeTab.value = event;
    }
    function searchAction(event) {
      queryStringParameters.value = {
        ...queryStringParameters.value,
        search: event,
      };
      console.log("search", queryStringParameters.value);
    }
    function exportAction(event) {
      console.log("export", event);
    }

    function changeTab(tab) {
      console.log(tab, 'TAB')
      activeTab.value = tab;
      console.log(activeTab.value, 'ACTIVE TAB')
    }

    return {
      data,
      tabs,
      activeTab,
      isLoading,
      showFilterDrawer,
      showSortDrawer,
      changeTab,
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