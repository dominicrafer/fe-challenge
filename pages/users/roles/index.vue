<template>
  <div class="page">
    <PageHeader title="Roles">
      <template #right-panel>
        <!-- v-has:users.action-permission="`roles:write`" -->
        <router-link
          :to="{
            path: '/users/roles/create',
          }"
        >
          <Button color="positive" label="New Role"></Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <QBasicTable
        :rows="(data?.resource?.roles as RoleDetails[])"
        :columns="columns"
        :loading="pending"
        @nextPage="nextPage"
        @prevPage="prevPage"
        :filterable="false"
        :searchable="false"
        :exportable="false"
        :sortable="false"
        dynamoDBPagination
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="role" :props="props">
              {{ props.row.role }}
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}
            </q-td>
            <q-td>
              <div class="flex gap-2 flex-nowrap">
                <!-- v-has:roles.action-permission="[`roles:edit`, 'roles:read']" -->
                <Button
                  :to="{
                    name: 'users-roles-id',
                    params: { id: props.row.role },
                  }"
                  color="primary"
                  label="View"
                  icon="visibility"
                />
                <Button
                  color="negative"
                  label="Delete"
                  @click="deleteRole(props.row.role)"
                  icon="backspace"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </QBasicTable>
    </div>

    <ConfirmationDialog
      title="Delete Role"
      v-model="deleteConfirmationModalVisible"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationDialog>
  </div>
</template>

<script setup lang="ts">
import type { Column } from "~/types/q-basic-table";
import type { RoleDetails } from "~/types/roles";
definePageMeta({
  layout: "default",
});
const { $api, $_, $toast } = useNuxtApp();
// PAGINATION
let previousEvaluatedKey = ref<any[]>([]);
let nextEvaluatedKey = ref<number | null | undefined>(null);
const columns: Column[] = [
  {
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
  },
  {
    name: "description",
    label: "Description",
    align: "left",
    field: "description",
  },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
];
const { data, pending, refresh } = $api.roles.getRoles(
  {
    limit: 10,
    last_evaluated_sort_key: nextEvaluatedKey,
  },
  [nextEvaluatedKey]
);
function prevPage() {
  nextEvaluatedKey.value = previousEvaluatedKey.value.length
    ? $_.last(previousEvaluatedKey.value)
    : null;
  if (previousEvaluatedKey.value.length) {
    previousEvaluatedKey.value.pop();
  }
}
function nextPage() {
  const lastRoleDetails: any = $_.last(data?.value?.resource?.roles);
  previousEvaluatedKey.value.push(nextEvaluatedKey.value);
  nextEvaluatedKey.value = lastRoleDetails.role;
}
// PAGINATION

// DELETE POLICY
const deleteConfirmationModalVisible = ref(false);
const selectedRole = ref<string | null>(null);
function deleteRole(id: string) {
  selectedRole.value = id;
  deleteConfirmationModalVisible.value = true;
}

async function confirmDelete() {
  if (selectedRole.value) {
    pending.value = true;
    deleteConfirmationModalVisible.value = false;
    await $api.roles.deleteRole(selectedRole.value);
    $toast.success("Role successfully deleted");
    refresh();
  }
}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
