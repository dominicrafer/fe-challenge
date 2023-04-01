<template>
  <Drawer title="Filter By" :show="show" @close="$emit('close')">
    <VForm :initialValues="sorts">
      <div class="sorts">
        <div>
          <div class="sorts__label">Name</div>
          <div class="sorts__options">
            <RadioButton
              id="name-asc"
              label="Name (A-Z)"
              inputValue="name:asc"
              name="name"
              v-model="formData.name"
            />
            <RadioButton
              id="name-desc"
              label="Name (Z-A)"
              inputValue="name:desc"
              name="name"
              v-model="formData.name"
            />
          </div>
        </div>
        <div>
          <div class="sorts__label">Email</div>
          <div class="sorts__options">
            <RadioButton
              id="email-asc"
              label="Email (A-Z)"
              inputValue="email:asc"
              name="email"
              v-model="formData.email"
            />
            <RadioButton
              id="email-desc"
              label="Email (Z-A)"
              inputValue="email:desc"
              name="email"
              v-model="formData.email"
            />
          </div>
        </div>
        <div>
          <div class="sorts__label">Created At</div>
          <div class="sorts__options">
            <RadioButton
              id="status-asc"
              label="Created At (Oldest)"
              inputValue="status:asc"
              name="created_at"
              v-model="formData.created_at"
            />
            <RadioButton
              id="status-desc"
              label="Created At (Newest)"
              inputValue="status:desc"
              name="created_at"
              v-model="formData.created_at"
            />
          </div>
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
    sorts: {
      type: Object,
      default() {
        return {
          name: null,
          email: null,
          created_at: null,
        };
      },
    },
  },
  setup(props, { emit }) {
    const formData = reactive(props.sorts);
    return {
      formData,
    };
  },
};
</script>

<style lang="postcss" scoped>
.sorts {
  @apply flex flex-col gap-4;
  &__label {
    @apply text-[1rem] font-bold mb-3;
  }
  &__options {
    @apply flex flex-col gap-4 ml-4;
  }
}
</style>