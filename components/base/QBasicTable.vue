<template>
    <q-table
      class="sticky"
      :rows="rows"
      :columns="columns"
      v-bind="$attrs"
      :rows-per-page-options="[10, 15, 20, 25]"
      flat
      bordered
    >
      <template v-slot:top-left>
        <q-form class="flex items-center q-gutter-md">
          <InputField
            class="left-panel__search"
            v-model="searchValue"
            name="search"
            label="Search by name here..."
            customIconClass="search__custom-icon"
            :outlined="false"
          >
            <template #append>
              <!-- <Icon name="mdi:magnify" /> -->
              <div class="search__search-container">
                <Button
                  type="submit"
                  color="warning"
                  :class="{ 'no-dropdown': !$slots['search-filters'] }"
                  label="Search"
                  @click="search"
                >
                </Button>
              </div>
            </template>
          </InputField>
        </q-form>
      </template>
      <template v-slot:top-right>
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
  
      <template #body="props" v-if="$slots.body">
        <slot v-bind="props" name="body"></slot>
      </template>
      <template #body-cell="props" v-if="$slots['body-cell']">
        <slot v-bind="props" name="body-cell"></slot>
      </template>
  
      <template #loading class="h-px">
        <InnerLoading showing color="primary" />
      </template>
    </q-table>
  </template>
  
  <script setup lang="ts">
  interface columnTypes {
    name: string;
    label: string;
    field: string | ((row: any) => any);
    required?: boolean;
    align?: "left" | "right" | "center";
    sortable?: boolean;
    sort?: (a: any, b: any, rowA: any, rowB: any) => number;
    rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
    sortOrder?: "ad" | "da";
    format?: (val: any, row: any) => any;
    style?: string | ((row: any) => string);
    classes?: string | ((row: any) => string);
    headerStyle?: string;
    headerClasses?: string;
  }
  const props = defineProps({
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array as PropType<Array<columnTypes>>,
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
  });
  const emit = defineEmits(["search", "sort", "filter"]);
  const searchValue = ref(null);
  
  function search() {
    emit("search", searchValue.value);
  }
  </script>
  