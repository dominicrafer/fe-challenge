<template>
  <q-table
    class="sticky"
    :rows="!$_.isEmpty(rows) ? rows : []"
    :columns="columns"
    v-bind="$attrs"
    :rows-per-page-options="[10, 15, 20, 25]"
    flat
    bordered
    v-model:pagination="mappedPaginationState"
    @request="paginate"
  >
    <template v-slot:top-left v-if="searchable">
      <VForm class="flex items-center q-gutter-md" @submit="search">
        <InputField
          class="w-[300px]"
          v-model="searchValue"
          name="search"
          label="Search by name here..."
          customIconClass="search__custom-icon"
          :outlined="false"
        >
          <template #append>
            <Icon
              name="material-symbols:search"
              class="cursor-pointer"
              @click="search"
            >
            </Icon>
          </template>
        </InputField>
      </VForm>
    </template>
    <template v-slot:top-right v-if="sortable || filterable">
      <div class="flex gap-2 items-center">
        <Button
          v-if="sortable"
          @click="$emit('sort')"
          color="warning"
          label="Sort By"
          icon="sort"
        />

        <Button
          v-if="filterable"
          @click="$emit('filter')"
          color="warning"
          label="Filter By"
          icon="filter_alt"
        />

        <slot name="header-right-panel"></slot>
      </div>
    </template>
    <template #header="props" v-if="$slots.headers">
      <slot v-bind="props" name="headers"></slot>
    </template>

    <template #body="props" v-if="$slots.body && rows?.length">
      <slot v-bind="props" name="body"></slot>
    </template>
    <template #body-cell="props" v-if="$slots['body-cell']">
      <slot v-bind="props" name="body-cell"></slot>
    </template>

    <template #loading>
      <InnerLoading showing color="primary" />
    </template>
    <template #bottom v-if="dynamoDBPagination">
      <div class="w-full flex justify-center gap-4">
        <Icon
          name="material-symbols:chevron-left-rounded"
          class="cursor-pointer"
          width="24"
          height="24"
          @click="emit('prevPage')"
        />
        <Icon
          name="material-symbols:chevron-right-rounded"
          class="cursor-pointer"
          width="24"
          height="24"
          @click="emit('nextPage')"
        />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { Column } from "@/types/q-basic-table";

const props = defineProps({
  rows: {
    type: Array,
  },
  columns: {
    type: Array as PropType<Array<Column>>,
    required: true,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  exportable: {
    type: Boolean,
    default: true,
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Object,
    default() {
      return {
        page: 1,
        page_size: 10,
        return_count: null,
      };
    },
  },
  dynamoDBPagination: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "search",
  "sort",
  "filter",
  "paginate",
  "prevPage",
  "nextPage",
]);
const searchValue = ref(null);
const mappedPaginationState = ref({
  page: props.pagination.page,
  rowsPerPage: props.pagination.page_size,
  rowsNumber: props.pagination.return_count,
});

watch(
  () => props.pagination.return_count,
  (totalCount) => {
    mappedPaginationState.value.rowsNumber = totalCount;
  }
);
function paginate({ pagination }: any) {
  mappedPaginationState.value = {
    page: pagination.page,
    rowsPerPage: pagination.rowsPerPage,
    rowsNumber: pagination.rowsNumber,
  };
  emit("paginate", mappedPaginationState.value);
}

function search() {
  emit("search", searchValue.value);
}
</script>
