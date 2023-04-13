<template>
  <div class="page">
    <PageHeader backRoute="/projects" title="Edit Project" />
    <div class="page__body">
      <ProjectForm
        :projectDetails="projectDetails"
        :initialReferenceValues="initialReferenceValues"
        :submitHandler="submitHandler"
        :isLoading="pending"
        edit
      />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    let projectDetails = {
      name: null,
      business: null,
      account_number: null,
      service: null,
      account_manager: null,
      customer: null,
      references: {},
    };
    let initialReferenceValues = {};
    const { data, pending } = $api.projects.getProjectDetails(
      route.params.id,
      projectDetails
    );
    watch(
      () => data.value,
      (result) => {
        let data = result.resource;
        projectDetails.name = data?.name;
        projectDetails.business = {
          label: data?.business_name,
          value: data?.business_name,
        };
        projectDetails.account_number = {
          label: data?.bank_account_number,
          value: data?.bank_account_number,
        };
        projectDetails.service = {
          label: data?.service_type,
          value: data?.service_type,
        };
        projectDetails.account_manager = {
          label: data?.account_manager_name,
          value: {
            cognito_id: data?.account_manager_uuid,
            name: data?.account_manager_name,
          },
        };
        projectDetails.customer = {
          label: data?.customer_name,
          value: {
            id: data?.customer_id,
            name: data?.customer_name,
          },
        };
        $_.forEach(data?.references, (value, key) => {
          projectDetails.references[key] = value;
          initialReferenceValues[key] = value;
        });
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.projects.updateProject(route.params.id, data);
        router.push("/projects");
        $toast.success("Project successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      initialReferenceValues,
      projectDetails,
      submitHandler,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
