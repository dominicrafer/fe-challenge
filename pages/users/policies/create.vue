<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Create Policy" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersPolicyForm :submitHandler="submitHandler" ref="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PolicyPayload } from "~/types/policies";
const form = ref<Ref | null>(null);
let errors = ref([]);
async function submitHandler(data: PolicyPayload) {
  const { $api, $toast } = useNuxtApp();
  const { error } = await $api.policies.createPolicy(data);

  if (!error.value) {
    const router = useRouter();
    router.push("/users/policies");
    $toast.success("Policy successfully created.");
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
