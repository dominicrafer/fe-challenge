<template>
  <div class="page">
    <PageHeader title="Test Page" />
    <div class="page__body">
      <!-- INSERT CONTENT HERE -->
    </div>
  </div>
</template>

<script setup>
const { $api, $_, $toast, $dayjs } = useNuxtApp();
watchEffect(() => {
  const { data, pending, refresh } = $api.users.getUsers({
    page: 1,
    page_size: 10,
    return_count: true,
  });
  console.log(data, "DATA");
});
</script>
<style lang="postcss" scoped></style>
