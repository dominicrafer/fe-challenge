<template>
  <div class="page">
    <PageHeader backRoute="/projects" title="Create Project" />
    <div class="page__body">
      <ProjectForm :submitHandler="submitHandler" />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        await $api.projects.createProject(data).then((response) => {
          const router = useRouter();
          router.push("/projects");
          $toast.success("Project successfully created.");
        });
      } catch (error) {
        console.log(error);
      }
    }
    return { submitHandler };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
