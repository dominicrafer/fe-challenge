<template>
  <Drawer title="Sort By" :show="show" @close="$emit('close')">
    <VForm :initialValues="{ sort }">
      <div class="sorts">
        <RadioButton
          id="name-asc"
          label="Name (A-Z)"
          inputValue="name:asc"
          name="sort"
          v-model="sort"
        />
        <RadioButton
          id="name-desc"
          label="Name (Z-A)"
          inputValue="name:desc"
          name="sort"
          v-model="sort"
        />
        <RadioButton
          id="email-asc"
          label="Email (A-Z)"
          inputValue="email:asc"
          name="sort"
          v-model="sort"
        />
        <RadioButton
          id="email-desc"
          label="Email (Z-A)"
          inputValue="email:desc"
          name="sort"
          v-model="sort"
        />
        <RadioButton
          id="created-at-asc"
          label="Created At (Oldest)"
          inputValue="created_at:asc"
          name="sort"
          v-model="sort"
        />
        <RadioButton
          id="created-at-desc"
          label="Created At (Newest)"
          inputValue="created_at:desc"
          name="sort"
          v-model="sort"
        />
      </div>
    </VForm>
    <template #footer>
      <Button variant="secondary" @click="$emit('close')">Cancel</Button>
      <Button variant="success" @click="$emit('apply', sort)">Apply</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  sort: {
    type: String,
    default: "created_at:desc",
  },
});
const sort = ref(props.sort);
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
