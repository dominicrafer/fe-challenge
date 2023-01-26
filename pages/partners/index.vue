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
    ];

    const isLoading = ref(false);
    const showFilterDrawer = ref(false);
    const showSortDrawer = ref(false);
    const filters = ref({});

    const searchAction = (e) => {
      console.log("search");
    };
    const exportAction = (e) => {
      console.log("export");
    };

    return {
      data,
      isLoading,
      showFilterDrawer,
      showSortDrawer,
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