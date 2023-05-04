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
          <Button variant="success" type="button"> New User </Button>
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
        <template #search-filters>
          <span class="filter-label">Search Filters</span>
          <div class="filters">
            <Checkbox
              id="Name"
              label="Name"
              inputValue="name"
              name="filterBy"
              v-model="searchFilters"
            />
            <Checkbox
              id="Email"
              label="Email"
              inputValue="email"
              name="filterBy"
              v-model="searchFilters"
            />
            <Checkbox
              id="Phone Number"
              label="Phone Number"
              inputValue="phone_number"
              name="filterBy"
              v-model="searchFilters"
            />
          </div>
        </template>
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Mobile Number</th>
                <th align="left">Role</th>
                <th align="center">Status</th>
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
                <td align="center">
                  <Badge
                    :variant="
                      userDetails.status === 'active' ? 'success' : 'secondary'
                    "
                    >{{ $_.startCase(userDetails.status) }}</Badge
                  >
                </td>
                <td align="left">{{ userDetails.created_at }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-id',
                        params: { id: userDetails.cognito_id },
                      }"
                      v-has:users.action-permission="[
                        `users:read`,
                        'users:edit',
                      ]"
                    >
                      <div
                        class="flex items-center justify-center gap-1 border-b border-primary"
                      >
                        <span class="text-primary">Edit </span>
                        <Icon
                          width="20"
                          height="20"
                          color="#29335c"
                          name="material-symbols:edit"
                        />
                      </div>
                    </router-link>

                    <div
                      class="flex items-center justify-center gap-1 border-b border-paprika"
                      @click="deactivateUser(userDetails)"
                      v-has:users.action-permission="`users:edit`"
                      v-if="userDetails.status === 'active'"
                    >
                      <span class="text-paprika">Deactivate</span>
                      <Icon
                        width="20"
                        height="20"
                        color="#E45959"
                        name="mdi:user-block"
                      />
                    </div>
                    <div
                      class="flex items-center justify-center gap-1 border-b border-green-600"
                      @click="updateUserStatus(userDetails)"
                      v-has:users.action-permission="`users:edit`"
                      v-else
                    >
                      <span class="text-green-600">Activate</span>
                      <Icon
                        width="20"
                        height="20"
                        color="#18B351"
                        name="mdi:user-check"
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
      title="Deactivate User"
      type="danger"
      confirmText="Deactivate"
      @close="deleteConfirmationModalVisible = false"
      @confirm="updateUserStatus"
    >
      <template #message>Are you sure you want to continue?</template>
    </ConfirmationModal>
    <UsersFilterDrawer
      :appliedFilters="filters"
      :show="usersFilterDrawerVisible"
      @close="usersFilterDrawerVisible = false"
      @apply="applyFilters"
    />
    <UsersSortDrawer
      :sort="sort"
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
  setup() {
    const { $api, $_, $toast } = useNuxtApp();
    const usersFilterDrawerVisible = ref(false);
    const usersSortDrawerVisible = ref(false);
    // PAGINATION
    let search = ref(null);
    let filters = {
      statuses: [],
      roles: [],
    };
    const searchFilters = ref([]);
    let sort = ref("created_at:desc");
    let params = reactive({
      page: 1,
      page_size: 10,
      return_count: true,
      sorts: [sort.value],
    });

    const { data, pending, refresh } = $api.users.getUsers(params);

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
            search_keys: searchFilters.value.length ? searchFilters.value : ["name"],
            value: searchValue,
          },
        ];
      }

      refresh();
    }
    // SEARCH USER
    function applyFilters(appliedFilters) {
      delete params.in_filters;
      filters = appliedFilters;
      if (appliedFilters.statuses.length || appliedFilters.roles.length) {
        params.in_filters = [];
      }
      if (appliedFilters.statuses.length) {
        params.in_filters = [
          ...params?.in_filters,
          {
            key: "status",
            value: appliedFilters.statuses,
          },
        ];
      }
      if (appliedFilters.roles.length) {
        params.in_filters = [
          ...params?.in_filters,
          {
            key: "role",
            value: $_.map(appliedFilters.roles, (role) => role.value),
          },
        ];
      }
      usersFilterDrawerVisible.value = false;
      refresh();
    }
    function applySorts(appliedSort) {
      sort.value = appliedSort;
      params.sorts = [sort.value];
      refresh();
      usersSortDrawerVisible.value = false;
    }

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedUser = ref(null);
    function deactivateUser(userDetails) {
      selectedUser.value = userDetails;
      deleteConfirmationModalVisible.value = true;
    }

    async function updateUserStatus(userDetails = selectedUser.value) {
      pending.value = true;
      console.log(selectedUser, "selectedUser");
      await $api.users.updateUserStatus({
        cognito_id: userDetails.cognito_id,
      });
      $toast.success(
        `User successfully ${
          userDetails.status === "active" ? "deactivated" : "activated"
        }`
      );

      refresh();
    }
    // DELETE POLICY
    return {
      data,
      pending,
      selectedUser,
      deactivateUser,
      deleteConfirmationModalVisible,
      usersFilterDrawerVisible,
      usersSortDrawerVisible,
      updateUserStatus,
      filters,
      sort,
      params,
      paginate,
      searchUsers,
      search,
      applyFilters,
      applySorts,
      searchFilters,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
.filter-label {
  @apply font-bold text-[1rem] mb-3 block;
}
.filters {
  @apply flex flex-col gap-4;
}
</style>
