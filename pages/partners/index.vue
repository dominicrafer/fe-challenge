<template>
  <div class="page">
    <PageHeader title="Partners">
      <template #right-panel>
        <router-link
          :to="{
            path: '/partners/create',
          }"
        >
          <Button>Create</Button>
        </router-link>
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
                <th align="left">Status</th>
                <th align="left">Contract From</th>
                <th align="left">Contract To</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(partner, index) in data" :key="index">
                <td align="left">Campaign Title</td>
                <td align="left">Status</td>
                <td align="left">Contract From</td>
                <td align="left">Contract To</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'partners-id',
                        params: { id: partner.id },
                      }"
                    >
                      <Icon
                        width="20"
                        height="20"
                        style="color: #29335c"
                        name="material-symbols:preview"
                      />
                    </router-link>
                    <div>
                      <Icon
                        width="20"
                        height="20"
                        name="material-symbols:delete-outline"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Table>
    </div>
    <PartnersFilterDrawer
      :show="showFilterDrawer"
      @close="
        () => {
          showFilterDrawer = false;
        }
      "
    />
    <PartnersSortDrawer
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
  setup() {
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
      isLoading,
      showFilterDrawer,
      showSortDrawer,
      paginateAction,
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