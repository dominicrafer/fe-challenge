<template>
  <div class="header">
    <div class="header__left-panel">
      <Icon class="left-panel__burder-menu" name="cil:hamburger-menu" width="24" height="24" color="white" @click="sidebarStore.toggleSidebar()"></Icon>
    </div>
    <div class="header__right-panel">
      <div class="right-panel__profile">
        <Icon name="mdi:account-circle" color="white" width="30" height="30" />
        <div class="profile__details">
          <span class="details__name">{{ authStore.userDetails.name }}</span>
          <span class="details__role">{{ authStore.userDetails.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { useSidebarStore } from '@/store/sidebar';
export default {
  props: {
    title: {
      type: String,
      default: "Header",
    },
  },
  setup() {
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();

    return { authStore, sidebarStore }
  }
};
</script>

<style lang="postcss" scoped>
.header {
  @apply flex flex-row justify-between items-center flex-grow-0;
  @apply px-5 py-[20px] bg-primary  text-sm text-primary border-b border-baking-soda;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
  &__left-panel {
    /* .left-panel__burder-menu {
      @apply lg:hidden;
    } */
  }


  &__right-panel {
    @apply flex flex-row items-center gap-3;

    .right-panel__profile {
      @apply flex flex-row gap-2 items-center;

      .profile__details {
        @apply flex flex-col leading-3 uppercase;

        .details__name {
          @apply text-white font-medium text-sm;
        }

        .details__role {
          @apply text-[10px] text-gray-200;
        }
      }
    }
  }
}</style>