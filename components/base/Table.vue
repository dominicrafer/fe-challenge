<template>
  <Container :loading="loading">
    <div class="table">
      <div class="table__header">
        <div class="header__left-panel">
          <form
            v-if="searchable"
            @submit.prevent="$emit('search', searchValue)"
          >
            <InputField
              v-model="searchValue"
              name="search"
              placeholder="Search by name here..."
            >
              <template #icon>
                <Icon name="mdi:magnify" />
              </template>
            </InputField>
          </form>
        </div>
        <div class="header__right-panel">
          <Button v-if="exportable" @click="$emit('export')">
            <template #icon-start><Icon name="mdi:export" /></template>Export
          </Button>
          <Button v-if="sortable" @click="$emit('sort')">
            <template #icon-start><Icon name="mdi:sort" /></template>Sort By
          </Button>
          <Button v-if="filterable" @click="$emit('filter')">
            <template #icon-start
              ><Icon name="mdi:filter-cog-outline" /></template
            >Filter By
          </Button>
        </div>
      </div>
      <div class="table__body">
        <slot name="table-data"></slot>
      </div>
      <div class="table__footer">
        <v-pagination
          v-model="page"
          :pages="pages"
          :range-size="1"
          @update:modelValue="$emit('paginate', page)"
        />
      </div>
    </div>
  </Container>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    activatePage: {
      type: Number,
      default: 1,
    },
    pages: {
      type: Number,
      default: 10,
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
  },
  setup(props) {
    let page = ref(props.activatePage);
    let searchValue = ref("");
    return {
      page,
      searchValue,
    };
  },
  components: {
    VPagination,
  },
};
</script>

<style lang="postcss" scoped>
.table {
  @apply w-full relative;
  @apply flex flex-col;
  &__header {
    @apply w-full;
    @apply p-2;
    @apply flex flex-row items-center justify-between;
    @apply border-b border-baking-soda;

    .header__left-panel {
      @apply flex flex-row items-center;
      @apply float-right;
      @apply ml-2;
      @apply gap-2;
    }
    .header__right-panel {
      @apply flex flex-row items-center justify-end;
      @apply gap-2;
    }
  }
  &__body {
    @apply flex flex-col;
    @apply min-h-[600px] h-full;
    @apply pb-12;
  }
  &__footer {
    @apply flex flex-row justify-center items-end;
    @apply p-4;
  }
}
</style>