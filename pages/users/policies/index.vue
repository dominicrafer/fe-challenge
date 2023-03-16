<template>
  <div class="page">
    <PageHeader title="Policies">
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/policies/create',
          }"
        >
          <Button variant="success">Create</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
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
                <th align="left">Module</th>
                <th align="left">Policy</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(policy, index) in data?.resource?.policies" :key="index">
                <td align="left">{{policy.module}}</td>
                <td align="left">{{policy.policy}}</td>
                <td align="center">
                  <div class="table__data-actions">
                    
                      <Icon
                        width="20"
                        height="20"
                        style="color: #29335c"
                        name="material-symbols:preview"
                      />
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
    const { $api } = useNuxtApp();
    const showFilterDrawer = ref(false);
    const showSortDrawer = ref(false);
    const queryStringParameters = reactive({
      search: "",
      filters: "",
      sorts: "",
      page: 1,
      page_size: 10,
    });
    const { data, pending } = $api.policies.getPolicies();

    function paginateAction(event) {
      queryStringParameters.value = {
        ...queryStringParameters.value,
        page: event,
      };
      console.log("paginate", queryStringParameters.value);
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

    return {
      data,
      pending,
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
