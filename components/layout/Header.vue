<template>
  <q-header class="header" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <div class="flex items-center">
          <q-btn flat round icon="menu" class="q-mr-sm text-white" @click="sidebarStore.toggleSidebar" />
        </div>
      </q-toolbar-title>
      <q-space />
      <q-toolbar-title>
        <div class="flex items-center justify-end">
          <q-btn-dropdown label="ecvphdevs@gmail.com" dropdown-icon="account_circle" class="text-white" flat no-icon-animation>
            <div class="row no-wrap q-pa-md">
              <div class="column w-full">
                <p class="text-primary"><strong>Email</strong></p>
                <p>ecvphdevs@gmail.com</p>
                <p class="mt-1 text-primary">
                  <strong>Contact</strong>
                </p>
                <p>+639211211122</p>
              </div>

              <q-separator vertical class="q-mx-lg" />

              <div class="flex flex-col justify-between">
                <Icon name="mdi:account-circle" color="#29345B" width="72" height="72" />

                <Button color="negative" label="Logout" push size="sm" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@/store/sidebar";
const sidebarStore = useSidebarStore();
</script>

<style lang="postcss" scoped>
.header {
  @apply flex flex-row justify-between items-center flex-grow-0 z-[99];
  @apply px-2 py-3 bg-primary  text-sm text-primary border-b border-baking-soda;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
}
</style>
