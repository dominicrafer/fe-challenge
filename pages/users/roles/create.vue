<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Create Role" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersRoleForm
        :submitHandler="submitHandler"
        :isLoading="isLoading"
        ref="form"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RolePayload } from "~/types/roles";

definePageMeta({
  layout: "default",
});
let errors = ref([]);
let isLoading = ref(false);
const form = ref<Ref | any>(null);
async function submitHandler(data: RolePayload) {
  const { $api, $toast } = useNuxtApp();
  isLoading.value = true;
  const { error } = await $api.roles.createRole(data);
  isLoading.value = false;
  if (!error.value) {
    const router = useRouter();
    router.push("/users/roles");
    $toast.success("Role successfully created.");
  } else {
    errors.value = error.value.data.errors;
    form.value.allowRouteLeave = false;
    const errorList: HTMLElement | any = document.getElementById("error-list");
    setTimeout(() => {
      errorList.scrollIntoView();
    }, 200);
  }
}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
