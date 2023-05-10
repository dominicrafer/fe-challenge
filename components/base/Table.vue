<template>
  <Container :loading="loading">
    <div class="table">
      <div class="table__content">
        <div class="content__tabs" v-if="tabs">
          <Tabs
            :tabs="tabs"
            :active="activeTab"
            @changeTab="(tab) => $emit('changeTab', tab)"
          />
        </div>
        <template
          v-if="
            exportable ||
            sortable ||
            searchable ||
            filterable ||
            $slots['header-right-panel']
          "
        >
          <div class="content__header">
            <div class="header__left-panel">
              <form
                v-if="searchable"
                @submit.prevent="$emit('search', searchValue)"
              >
                <InputField
                  class="left-panel__search"
                  v-model="searchValue"
                  name="search"
                  placeholder="Search by name here..."
                  customIconClass="search__custom-icon"
                >
                  <template #icon>
                    <!-- <Icon name="mdi:magnify" /> -->
                    <div class="search__search-container">
                      <Button
                        type="submit"
                        class="search-container__search-button"
                        variant="warning"
                        >Search
                      </Button>
                      <Popper
                        class="search-container__popper"
                        placement="bottom-end"
                      >
                        <Icon
                          name="mdi:chevron-down"
                          class="search-container__custom-icon"
                          color="white"
                          width="20"
                          height="20"
                        />
                        <template #content>
                          <slot name="search-filters"></slot>
                        </template>
                      </Popper>
                    </div>
                  </template>
                </InputField>
              </form>
            </div>
            <div class="header__right-panel">
              <Button
                v-if="exportable"
                v-has:action-permission="exportPermission"
                @click="$emit('export')"
                variant="warning"
              >
                <template #icon-start>
                  <Icon name="mdi:export" width="20" height="20" /> </template
                >Export
              </Button>
              <Button v-if="sortable" @click="$emit('sort')" variant="warning">
                <template #icon-start>
                  <Icon name="mdi:sort" width="20" height="20" /> </template
                >Sort By
              </Button>
              <Button
                v-if="filterable"
                @click="$emit('filter')"
                variant="warning"
              >
                <template #icon-start>
                  <Icon
                    name="mdi:filter-cog-outline"
                    width="20"
                    height="20"
                  /> </template
                >Filter By
              </Button>
              <slot name="header-right-panel"></slot>
            </div>
          </div>
        </template>
        <div class="content__body">
          <slot name="table-data"></slot>
        </div>
        <div class="content__footer">
          <v-pagination
            v-if="paginationType === 'default'"
            v-model="page"
            :pages="pages"
            :range-size="1"
            @update:modelValue="$emit('paginate', page)"
          />

          <div
            class="footer__pagination-ddb"
            v-if="paginationType === 'dynamodb'"
          >
            <Icon
              name="material-symbols:chevron-left-rounded"
              class="pagination-ddb__prev"
              width="24"
              height="24"
              @click="$emit('prevPage')"
            />
            <Icon
              name="material-symbols:chevron-right-rounded"
              class="pagination-ddb__next"
              width="24"
              height="24"
              @click="$emit('nextPage')"
            />
          </div>
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
    module: {
      type: String,
      default: null,
    },
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
      default: [],
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
    paginationType: {
      type: String,
      // default or dynamodb
      default: "default",
    },
  },
  setup(props, { emit }) {
    console.log(props.module);
    let page = ref(props.activatePage);
    let searchValue = ref("");
    const exportPermission = `${props.module}Export`;
    return {
      page,
      searchValue,
      exportPermission,
    };
  },
  components: {
    VPagination,
  },
};
</script>

<style lang="postcss">
.table {
  @apply w-full h-full min-h-[580px];
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
          .search__search-container {
            @apply flex h-full items-center;
            .search-container__search-button {
              @apply py-0 px-2 h-full text-sm rounded-none;
            }

            .search-container__popper {
              @apply h-full block border-none m-0 h-full !important;
              > div:first-child {
                @apply h-full;
              }
              .popper {
                @apply cursor-default w-max;
              }
              .search-container__custom-icon {
                border-radius: 0px 5px 5px 0px;
                @apply h-full bg-yellow-500 border-l border-white;
                &:hover {
                  filter: brightness(110%);
                }
              }
            }
          }
        }
      }

      .header__right-panel {
        @apply flex flex-row items-center justify-end;
        @apply gap-2;
      }
    }

    .content__body {
      @apply flex flex-col flex-grow h-full;
    }

    .content__footer {
      @apply flex-grow-0;
      @apply flex flex-row justify-center items-end;
      @apply p-4;
      .footer__pagination-ddb {
        @apply flex gap-[20px];
        @apply cursor-pointer;
        .pagination-ddb__prev,
        .pagination-ddb__next {
          &:hover {
            @apply bg-slate-200;
          }
        }
      }
    }
  }
}
.search__custom-icon {
  @apply top-0 right-0 h-full !important;
}
</style>
