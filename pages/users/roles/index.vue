<template>
  <div class="page">
    <PageHeader title="Roles">
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/roles/create',
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
                <th align="left">Role</th>
                <th align="left">Policies</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(roles, index) in data" :key="index">
                <td align="left">Role</td>
                <td align="left">Policies</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-roles-id',
                        params: { id: roles.id },
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