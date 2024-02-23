<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Create User" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersForm
        :submitHandler="submitHandler"
        :isLoading="isLoading"
        ref="form"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserCreatePayload } from "./types";

definePageMeta({
  layout: "default",
});
const form = ref<Ref | null>(null);
let errors = ref([]);
let isLoading = ref(false);
async function submitHandler(data: UserCreatePayload) {
  const { $api, $toast } = useNuxtApp();
  isLoading.value = true;
  const { error } = await $api.users.createUser(data);
  isLoading.value = false;
  if (!error.value) {
    const router = useRouter();
    router.push("/users");
    $toast.success("User successfully created.");
  } else {
    errors.value = error.value.data.errors;
    form.value.allowRouteLeave = false;
    const errorList: Element | null = document.getElementById("error-list");
    setTimeout(() => {
      errorList?.scrollIntoView();
    }, 200);
  }
}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
