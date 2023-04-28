<template>
  <Drawer title="Filter By" :show="show" @close="$emit('close')">
    <VForm :initialValues="filters">
      <div class="form">
        <span class="form__filter-label">Search Filters</span>
        <div class="form__filters">
          <Checkbox
            id="Name"
            label="Name"
            inputValue="name"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Email"
            label="Email"
            inputValue="email"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Status"
            label="Status"
            inputValue="status"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Phone Number"
            label="Phone Number"
            inputValue="phone_number"
            name="filterBy"
            v-model="formData.filterBy"
          />
          <Checkbox
            id="Role"
            label="Role"
            inputValue="role"
            name="filterBy"
            v-model="formData.filterBy"
          />
        </div>
        <span class="form__filter-label mt-3">Status</span>
        <div class="form__filters">
          <Checkbox
            id="active"
            label="Active"
            inputValue="active"
            name="statuses"
            v-model="formData.statuses"
          />
          <Checkbox
            id="inactive"
            label="Inactive"
            inputValue="inactive"
            name="statuses"
            v-model="formData.statuses"
          />
        </div>
        <span class="form__filter-label mt-3">Roles</span>
        <div class="form__filters">
          <Select
            v-model:modelValue="formData.roles"
            name="roles"
            multiple
            searchable
            :options="roleOptions"
            trackBy="value"
            label="label"
            :isLoading="isFetchingRoles"
            :closeOnSelect="false"
          />
        </div>
      </div>
    </VForm>
    <template #footer>
      <Button variant="secondary" @click="$emit('close')">Cancel</Button>
      <Button variant="success" @click="$emit('apply', formData)">Apply</Button>
    </template>
  </Drawer>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    appliedFilters: {
      type: Object,
      default() {
        return {
          filterBy: [],
          statuses: [],
          roles: [],
        };
      },
    },
  },
  setup(props, { emit }) {
    const { $api, $_ } = useNuxtApp();
    let roleOptions = reactive([]);
    const formData = ref(props.appliedFilters);
    let isFetchingRoles = ref(false);
    const test = ref([]);
    watch(
      () => props.show,
      async (show) => {
        if (show) {
          isFetchingRoles.value = true;
          const { data } = await $api.roles.getRoles();
          $_.forEach(data.value.resource.roles, (roleDetails) => {
            roleOptions.push({
              label: roleDetails.role,
              value: roleDetails.role,
            });
          });
          isFetchingRoles.value = false;
        }
      }
    );

    return {
      formData,
      roleOptions,
      isFetchingRoles,
      test
    };
  },
};
</script>

<style lang="postcss" scoped>
.form {
  &__filter-label {
    @apply font-bold text-[1rem] mb-3 block;
  }
  &__filters {
    @apply ml-4;
    @apply flex flex-col gap-4;
  }
}
</style>
