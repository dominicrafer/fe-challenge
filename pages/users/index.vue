<template>
  <div class="page">
    <PageHeader title="Users">
      <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template>
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/create',
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
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Mobile Number</th>
                <th align="left">Role</th>
                <th align="left">Status</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in data" :key="index">
                <td align="left">Name</td>
                <td align="left">Email</td>
                <td align="left">Mobile Number</td>
                <td align="left">Role</td>
                <td align="left">Status</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-id',
                        params: { id: user.id },
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
    <UsersFilterDrawer
      :show="showFilterDrawer"
      @close="
        () => {
          showFilterDrawer = false;
        }
      "
    />
    <UsersSortDrawer
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
        label: "active",
      },
      {
        label: "inactive",
      },
      {
        label: "deleted",
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
      tabs,
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