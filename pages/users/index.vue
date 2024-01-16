<template>
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
    :tabs="[
        {
          name: 'mails',
          icon: 'mail',
          label: 'Mails'
        },
        {
          name: 'alarms',
          icon: 'alarm',
          label: 'Alarms'
        },
      ]"
      :activeTab="activeTab"
  >
    <template #table-data>
      <table class="table__data">
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th align="left">Mobile Number</th>
            <th align="left">Role</th>
            <th align="center">Status



            </th>
            <th align="left" class="date">Created At</th>
            <th align="center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(userDetails, index) in data?.resource?.data" :key="index">
            <td align="left">{{ userDetails.name }}</td>
            <td align="left" width="200">{{ userDetails.email }}</td>
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
            <td align="left">
              <p>
                {{ $dayjs(userDetails.created_at).format("MMM DD, YYYY") }}
              </p>
              <p>
                {{ $dayjs(userDetails.created_at).format("hh:mm A") }}
              </p>
            </td>
            <td align="center">
              <div class="table__data-actions">
                <Button
                  :to="{
                    name: 'users-id',
                    params: { id: userDetails.cognito_id },
                  }"
                  color="primary"
                  label="View"
                  icon="visibility"
                />
                <Button
                  color="negative"
                  label="Deactivate"
                  v-if="userDetails.status === 'active'"
                  @click="deactivateUser(userDetails)"
                  icon="backspace"
                />
                <Button
                  v-else
                  color="positive"
                  label="Activate"
                  @click="updateUserStatus(userDetails)"
                  icon="check_circle"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </Table>
  <ConfirmationDialog
    v-model="deleteConfirmationDialogVisible"
    title="Deactivate User"
    type="danger"
    confirmText="Deactivate"
    @close="deleteConfirmationDialogVisible = false"
    @confirm="updateUserStatus"
  >
    <template #message>Are you sure you want to continue?</template>
  </ConfirmationDialog>
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
  <PageHeader title="Users">
    <template #right-panel>
      <Button
        color="positive"
        :to="{
          path: '/users/create',
        }"
        type="button"
        label="New User"
      >
      </Button>
    </template>
  </PageHeader>
</template>

<script>
definePageMeta({
  layout: "default",
  name: "user-list",
});
export default {
  setup() {
    const { $api, $_, $toast, $dayjs } = useNuxtApp();
    const usersFilterDrawerVisible = ref(false);
    const usersSortDrawerVisible = ref(false);
    const activeTab = ref(null);
    // PAGINATION
    let search = ref(null);
    let filters = {
      statuses: [],
      roles: [],
      created_at: [],
    };
    const searchFilters = ref([]);
    let sort = ref("created_at:desc");
    let params = reactive({
      page: 1,
      page_size: '10',
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
            search_keys: searchFilters.value.length
              ? searchFilters.value
              : ["name", "email", "phone_number"],
            value: searchValue,
          },
        ];
      }

      refresh();
    }
    // SEARCH USER
    function applyFilters(appliedFilters) {
      delete params.in_filters;
      delete params.between_filters;
      filters = appliedFilters;
      console.log(appliedFilters, "appliedFilters");
      if (appliedFilters.statuses.length || appliedFilters.roles.length) {
        params.in_filters = [];
      }
      if (appliedFilters.created_at?.length) {
        params.between_filters = [];
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
      if (appliedFilters.created_at?.length) {
        params.between_filters = [
          ...params?.between_filters,
          {
            key: "created_at",
            value: [
              $dayjs(appliedFilters.created_at[0]).format(
                "YYYY-MM-DD 00:00:00"
              ),
              $dayjs(appliedFilters.created_at[1]).format(
                "YYYY-MM-DD 23:59:59"
              ),
            ],
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
    const deleteConfirmationDialogVisible = ref(false);
    const selectedUser = ref(null);
    function deactivateUser(userDetails) {
      selectedUser.value = userDetails;
      deleteConfirmationDialogVisible.value = true;
    }

    async function updateUserStatus(userDetails = selectedUser.value) {
      pending.value = true;
      deleteConfirmationDialogVisible.value = false;
      const { error } = await $api.users.updateUserStatus({
        cognito_id: userDetails.cognito_id,
      });
      if (!error.value) {
        $toast.success(
          `User successfully ${
            userDetails.status === "active" ? "deactivated" : "activated"
          }`
        );
      }

      refresh();
    }
    // DELETE POLICY
    return {
      data,
      pending,
      selectedUser,
      deactivateUser,
      deleteConfirmationDialogVisible,
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
      activeTab
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
