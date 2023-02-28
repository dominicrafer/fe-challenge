<template>
  <Container :loading="loading">

    <div class="table">

      <div class="table__content">
        <div class="content__tabs" v-if="tabs">
          <Tabs :tabs="tabs" :active="activeTab" @changeTab="(tab) => $emit('changeTab', tab)" />
        </div>
        <div class="content__header">
          <div class="header__left-panel">
            <form v-if="searchable" @submit.prevent="$emit('search', searchValue)">
              <InputField class="left-panel__search" v-model="searchValue" name="search"
                placeholder="Search by name here...">
                <template #icon>
                  <Icon name="mdi:magnify" />
                </template>
              </InputField>
            </form>
          </div>
          <div class="header__right-panel">
            <Button v-if="exportable" @click="$emit('export')" variant="primary-outline">
              <template #icon-start>
                <Icon name="mdi:export" width="20" height="20" />
              </template>Export
            </Button>
            <Button v-if="sortable" @click="$emit('sort')" variant="primary-outline">
              <template #icon-start>
                <Icon name="mdi:sort" width="20" height="20" />
              </template>Sort By
            </Button>
            <Button v-if="filterable" @click="$emit('filter')" variant="primary-outline">
              <template #icon-start>
                <Icon name="mdi:filter-cog-outline" width="20" height="20" />
              </template>Filter By
            </Button>
          </div>
        </div>
        <div class="content__body">
          <slot name="table-data"></slot>
        </div>
        <div class="content__footer">
          <v-pagination v-model="page" :pages="pages" :range-size="1" @update:modelValue="$emit('paginate', page)" />
        </div>
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
    tabs: {
      type: Array,
      default: []
    },
    activeTab: {
      type: [Number, String],
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
  setup(props, { emit }) {
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
  @apply w-full h-full;

  &__tabs {
    @apply inline-block;
    @apply w-full;
    @apply flex flex-row;
  }

  &__content {
    @apply w-full h-full relative;
    @apply flex flex-col;

    .content__header {
      @apply w-full;
      @apply px-2 py-5;
      @apply flex flex-row items-center justify-between;
      @apply border-b border-baking-soda;
      @apply flex-grow-0;

      .header__left-panel {
        @apply flex flex-row items-center;
        @apply float-right;
        @apply ml-2;
        @apply gap-2;

        .left-panel__search {
          @apply w-[350px];
        }
      }

      .header__right-panel {
        @apply flex flex-row items-center justify-end;
        @apply gap-2;
      }
    }

    .content__body {
      @apply flex flex-col flex-grow h-full;
      /* @apply min-h-[560px]; */
      /* @apply pb; */
    }

    .content__footer {
      @apply flex-grow-0;
      @apply flex flex-row justify-center items-end;
      @apply p-4;
    }
  }
}
</style>