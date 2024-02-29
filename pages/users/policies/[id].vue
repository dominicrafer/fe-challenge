<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Edit Policy" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersPolicyForm
        :isLoading="pending"
        :policyDetails="policyDetails"
        :submitHandler="submitHandler"
        edit
        ref="form"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PolicyPayload } from "~/types/policies";

definePageMeta({
  layout: "default",
});
const { $api, $_ } = useNuxtApp();
const route: any = useRoute();
const { data, pending } = await $api.policies.getPolicyDetails(route.params.id);
const form = ref<Ref | null>(null);
let errors = ref([]);
let policyDetails = {
  policy: data.value?.resource.policy,
  description: data.value?.resource.description,
  actions: $_.map(data.value?.resource.actions, (actionDetails) => {
    return {
      label: actionDetails.action,
      value: actionDetails.action,
    };
  }),
};

async function submitHandler(data: PolicyPayload) {
  const { $api, $toast } = useNuxtApp();
  const { error } = await $api.policies.updatePolicy(route.params.id, data);
  if (!error.value) {
    const router = useRouter();
    router.push("/users/policies");
    $toast.success("Policy successfully updated.");
  } else {
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
