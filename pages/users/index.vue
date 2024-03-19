<template>
  <QBasicTable
    :columns="columns"
    :rows="(data?.resource?.data as UserDetailsObject[])"
    @paginate="paginate"
    :pagination="{
      page: params.page,
      page_size: params.page_size,
      return_count: data?.resource?.pagination?.total_count,
    }"
    @sort="usersSortDrawerVisible = true"
    @filter="usersFilterDrawerVisible = true"
    :loading="pending"
    @search="searchUsers"
    no-data-label="No data found."
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="phone_number" :props="props">
          {{ props.row.phone_number }}
        </q-td>
        <q-td key="role" :props="props">
          {{ props.row.role }}
        </q-td>
        <q-td key="status" :props="props">
          <Badge
            :color="props.row.status === 'active' ? 'positive' : 'secondary'"
            >{{ $_.startCase(props.row.status) }}</Badge
          >
        </q-td>
        <q-td key="created_at" :props="props">
          <p>
            {{ $dayjs(props.row.created_at).format("MMM DD, YYYY") }}
          </p>
          <p>
            {{ $dayjs(props.row.created_at).format("hh:mm A") }}
          </p>
        </q-td>
        <q-td key="actions" :props="props">
          <div class="table__data-actions flex gap-2 flex-nowrap">
            <Button
              :to="{
                name: 'users-id',
                params: { id: props.row.cognito_id },
              }"
              color="primary"
              label="View"
              icon="visibility"
            />
            <Button
              color="negative"
              label="Deactivate"
              v-if="props.row.status === 'active'"
              @click="deactivateUser(props.row)"
              icon="backspace"
            />
            <Button
              v-else
              color="positive"
              label="Activate"
              @click="updateUserStatus(props.row)"
              icon="check_circle"
            />
          </div>
        </q-td>
      </q-tr>
    </template>
  </QBasicTable>
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

<script setup lang="ts">
import type {
  UserListParams,
  Filters,
  UserDetailsObject,
} from "@/types/users";
import type {
  Column,
  PaginationParams,
} from "@/types/q-basic-table";
import type { RoleObject } from "~/types/roles";
const { $api, $_, $toast, $dayjs } = useNuxtApp();
const usersFilterDrawerVisible = ref(false);
const usersSortDrawerVisible = ref(false);
const activeTab = ref<string | null>(null);
// PAGINATION
let search = ref<string | null>(null);
let filters: Filters = {
  filterBy: [],
  statuses: [],
  roles: [],
  created_at: [
    $dayjs().format("YYYY-MM-DD 00:00:00"),
    $dayjs().format("YYYY-MM-DD 23:59:59"),
  ],
};
const searchFilters = ref([]);
let sort = ref("created_at:desc");

let params = reactive<UserListParams>({
  page: 1,
  page_size: 10,
  return_count: true,
  sorts: [sort.value],
  search_filters: undefined,
  in_filters: undefined,
  between_filters: undefined,
});
const columns: Column[] = [
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "phone_number",
    label: "Mobile Number",
    align: "left",
    field: "phone_number",
  },
  {
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "created_at",
    label: "Created At",
    align: "left",
    field: "created_at",
  },
  {
    name: "actions",
    align: "left",
    label: "Actions",
    field: "actions",
  },
];
const { data, pending, refresh } = $api.users.getUsers(params);

function paginate(newPagination: PaginationParams) {
  params.page = newPagination.page;
  params.page_size = newPagination.rowsPerPage;
}
// PAGINATION

// SEARCH USER
async function searchUsers(searchValue: string) {
  search.value = searchValue;
  if (!searchValue) {
    // delete params.search_filters;
    params.search_filters = undefined;
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
function applyFilters(appliedFilters: Filters) {
  delete params.in_filters;
  delete params.between_filters;
  // params.in_filters = [];
  // params.between_filters = [];
  filters = appliedFilters;
  if (appliedFilters.statuses.length || appliedFilters.roles.length) {
    params.in_filters = [];
  }
  // if (appliedFilters.created_at?.length) {
  //   params.between_filters = [];
  // }
  if (appliedFilters.statuses.length) {
    params.in_filters = [
      ...(<[]>(<unknown>params?.in_filters)),
      {
        key: "status",
        value: appliedFilters.statuses,
      },
    ];
  }
  // if (appliedFilters.created_at?.length) {
  //   params.between_filters = [
  //     ...(<[]><unknown>params?.between_filters),
  //     {
  //       key: "created_at",
  //       value: [
  //         $dayjs(appliedFilters.created_at[0]).format("YYYY-MM-DD 00:00:00"),
  //         $dayjs(appliedFilters.created_at[1]).format("YYYY-MM-DD 23:59:59"),
  //       ],
  //     },
  //   ];
  // }
  if (appliedFilters.roles.length) {
    params.in_filters = [
      ...(<[]>params?.in_filters),
      {
        key: "role",
        value: $_.map(appliedFilters.roles, (role: RoleObject) => role.value),
      },
    ];
  }
  usersFilterDrawerVisible.value = false;
  refresh();
}
function applySorts(appliedSort: string) {
  sort.value = appliedSort;
  params.sorts = [sort.value];
  refresh();
  usersSortDrawerVisible.value = false;
}

// DELETE POLICY
const deleteConfirmationDialogVisible = ref(false);
const selectedUser = ref(null);
function deactivateUser(userDetails: any) {
  selectedUser.value = userDetails;
  deleteConfirmationDialogVisible.value = true;
}

async function updateUserStatus(userDetails: any = selectedUser.value) {
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
