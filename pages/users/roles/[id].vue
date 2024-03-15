<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Edit Role" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersRoleForm
        :roleDetails="roleDetails"
        :submitHandler="submitHandler"
        :isLoading="pending"
        ref="form"
        edit
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { RolePayload } from "~/types/roles";
const { $api, $_ } = useNuxtApp();
const route: any = useRoute();
const form = ref<Ref | null>(null);
const { data, pending } = await $api.roles.getRoleDetails(route.params.id);
let roleDetails = {
  role: data.value?.resource.role,
  description: data.value?.resource.description,
  policies: data.value?.resource.policies,
};
let errors = ref([]);
async function submitHandler(data: RolePayload) {
  const { $api, $toast } = useNuxtApp();
  const { error } = await $api.roles.updateRole(route.params.id, data);
  if (!error.value) {
    const router = useRouter();
    router.push("/users/roles");
    $toast.success("Role successfully updated.");
  } else {
    console.log(error.value);
    errors.value = error.value.data.errors;
    if (error.value.data.errorCode !== "SERVER_ERROR") {
      form.value.allowRouteLeave = false;
    }
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
