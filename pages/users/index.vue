<template>
  <div class="page">
    <PageHeader title="Users">
      <!-- <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
      <template #right-panel>
        <NuxtLink
          :to="{
            path: '/users/create',
          }"
          v-has:users.action-permission="`users:write`"
        >
          <Button variant="success" type="button"> Create </Button>
        </NuxtLink>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        :pages="
          Math.ceil(data?.resource?.pagination.total_count / params.page_size)
        "
        @sort="usersSortDrawerVisible = true"
        @filter="usersFilterDrawerVisible = true"
        @paginate="paginate"
        @search="searchUsers"
        :exportable="false"
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
                <th align="left">Created At</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(userDetails, index) in data?.resource?.data"
                :key="index"
              >
                <td align="left">{{ userDetails.name }}</td>
                <td align="left">{{ userDetails.email }}</td>
                <td align="left">{{ userDetails.phone_number }}</td>
                <td align="left">{{ userDetails.role }}</td>
                <td align="left">{{ userDetails.status }}</td>
                <td align="left">{{ userDetails.created_at }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-id',
                        params: { id: userDetails.cognito_id },
                      }"
                      v-has:users.action-permission="`users:read`"
                    >
                      <Icon
                        width="20"
                        height="20"
                        style="color: #29335c"
                        name="material-symbols:preview"
                      />
                    </router-link>
                    <div>
                      {{ search }}
                      <Icon
                        v-has:users.action-permission="`users:delete`"
                        width="20"
                        height="20"
                        color="#E45959"
                        name="material-symbols:delete-outline"
                        @click="deleteUser(userDetails.cognito_id)"
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
    <ConfirmationModal
      :show="deleteConfirmationModalVisible"
      title="Delete User"
      type="danger"
      confirmText="Delete"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationModal>
    <UsersFilterDrawer
      :filters="filters"
      :show="usersFilterDrawerVisible"
      @close="usersFilterDrawerVisible = false"
      @apply="applyFilters"
    />
    <UsersSortDrawer
      :sorts="sorts"
      :show="usersSortDrawerVisible"
      @close="usersSortDrawerVisible = false"
      @apply="applySorts"
    />
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  props: {
    module: {
      type: String,
      default: "users",
    },
  },
  setup() {
    const { $api, $_ } = useNuxtApp();
    const usersFilterDrawerVisible = ref(false);
    const usersSortDrawerVisible = ref(false);
    // PAGINATION
    let search = ref(null);
    let filters = reactive(["name", "email"]);
    let sorts = reactive({
      name: "created_at:desc",
    });
    let params = reactive({
      page: 1,
      page_size: 10,
      return_count: true,
      sorts: $_.values(sorts),
      //search_filters
      //sorts
    });

    const { data, pending, refresh } = $api.users.getUsers(params, [
      params.page,
    ]);

    function paginate(page) {
      params.page = page;
    }
    // PAGINATION

    // SEARCH USER
    async function searchUsers(searchValue) {
      search.value = searchValue;
      if (!searchValue) {
        delete params.search_filters;
      } else {
        params.search_filters = [
          {
            search_keys: filters,
            value: searchValue,
          },
        ];
      }

      refresh();
    }
    // SEARCH USER

    function applyFilters(appliedFilters) {
      filters = appliedFilters.filterBy;
      usersFilterDrawerVisible.value = false;
    }
    function applySorts(appliedSorts) {
      sorts = appliedSorts;
      params.sorts = $_.values(sorts);
      refresh();
      usersSortDrawerVisible.value = false;
    }

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedUser = ref(null);
    function deleteUser(id) {
      selectedUser.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.users.deleteUser(selectedUser.value);
      refresh();
    }
    // DELETE POLICY

    return {
      data,
      pending,
      selectedUser,
      deleteUser,
      deleteConfirmationModalVisible,
      usersFilterDrawerVisible,
      usersSortDrawerVisible,
      confirmDelete,
      filters,
      sorts,
      params,
      paginate,
      searchUsers,
      search,
      applyFilters,
      applySorts,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
