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
                <th align="left">Campaign Title</th>
                <th align="left">Campaign Code</th>
                <th align="left">Status</th>
                <th align="left">Channels</th>
                <th align="left">Discount Access</th>
                <th align="left">Starts On</th>
                <th align="left">Ends On</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(campaign, index) in data" :key="index">
                <td align="left">Campaign Title</td>
                <td align="left">Campaign Code</td>
                <td align="left">Status</td>
                <td align="left">Channels</td>
                <td align="left">Discount Access</td>
                <td align="left">Starts On</td>
                <td align="left">Ends On</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'campaigns-id',
                        params: { id: campaign.id },
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
    <CampaignsFilterDrawer
      :show="showFilterDrawer"
      @close="
        () => {
          showFilterDrawer = false;
        }
      "
    />
    <CampaignsSortDrawer
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