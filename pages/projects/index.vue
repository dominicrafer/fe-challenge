<template>
  <div class="page">
    <PageHeader title="Projects">
      <!-- <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
      <template #right-panel>
        <NuxtLink
          :to="{
            path: '/projects/create',
          }"
          v-has:projects.action-permission="`projects:write`"
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
        @sort="projectsSortDrawerVisible = true"
        @filter="projectsFilterDrawerVisible = true"
        @paginate="paginate"
        @search="searchProjects"
        :exportable="false"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Project</th>
                <th align="left">Customer</th>
                <th align="left">Business</th>
                <th align="left">Service Type</th>
                <th align="left">Account Manager</th>
                <th align="left">Status</th>
                <th align="left">Create At</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(projectDetails, index) in data?.resource?.data"
                :key="index"
              >
                <td align="left">{{ projectDetails.name }}</td>
                <td align="left">{{ projectDetails.customer_name }}</td>
                <td align="left">{{ projectDetails.business_name }}</td>
                <td align="left">{{ projectDetails.service_type }}</td>
                <td align="left">{{ projectDetails.account_manager_name }}</td>
                <td align="left">{{ projectDetails.status }}</td>
                <td align="left">{{ projectDetails.created_at }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'projects-id',
                        params: { id: projectDetails.id },
                      }"
                      v-has:projects.action-permission="`projects:read`"
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
                        v-has:projects.action-permission="`projects:delete`"
                        width="20"
                        height="20"
                        color="#E45959"
                        name="material-symbols:delete-outline"
                        @click="
                          projectDetails.status != 'deleted'
                            ? deleteProject(projectDetails.id)
                            : null
                        "
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
      title="Delete Project"
      type="danger"
      confirmText="Delete"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationModal>
    <ProjectsFilterDrawer
      :filters="filters"
      :show="projectsFilterDrawerVisible"
      @close="projectsFilterDrawerVisible = false"
      @apply="applyFilters"
    />
    <ProjectsSortDrawer
      :sorts="sorts"
      :show="projectsSortDrawerVisible"
      @close="projectsSortDrawerVisible = false"
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
      default: "projects",
    },
  },
  setup() {
    const { $api, $_ } = useNuxtApp();
    const projectsFilterDrawerVisible = ref(false);
    const projectsSortDrawerVisible = ref(false);
    // PAGINATION
    let search = ref(null);
    let filters = reactive(["name", "contact_name"]);
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

    const { data, pending, refresh } = $api.projects.getProjects(params, [
      params.page,
    ]);

    function paginate(page) {
      params.page = page;
    }
    // PAGINATION

    // SEARCH USER
    async function searchProjects(searchValue) {
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
      projectsFilterDrawerVisible.value = false;
    }
    function applySorts(appliedSorts) {
      sorts = appliedSorts;
      params.sorts = $_.values(sorts);
      refresh();
      projectsSortDrawerVisible.value = false;
    }

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedProject = ref(null);
    function deleteProject(id) {
      selectedProject.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.projects.deleteProject(selectedProject.value);
      refresh();
    }
    // DELETE POLICY

    return {
      data,
      pending,
      selectedProject,
      deleteProject,
      deleteConfirmationModalVisible,
      projectsFilterDrawerVisible,
      projectsSortDrawerVisible,
      confirmDelete,
      filters,
      sorts,
      params,
      paginate,
      searchProjects,
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
