<template>
  <div class="page">
    <PageHeader title="Policies">
      <template #right-panel>
        <!-- v-has:policies.action-permission="`policies:write`" -->
        <router-link
          :to="{
            path: '/users/policies/create',
          }"
        >
          <Button color="positive" label="New Policy"></Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <QBasicTable
        :rows="data?.resource?.policies"
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
            <q-td key="policy" :props="props">
              {{ props.row.policy }}
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}
            </q-td>
            <q-td>
              <div class="flex gap-2 flex-nowrap">
                <!-- v-has:roles.action-permission="[`roles:edit`, 'roles:read']" -->
                <Button
                  :to="{
                    name: 'users-policies-id',
                    params: { id: props.row.policy },
                  }"
                  color="primary"
                  label="View"
                  icon="visibility"
                />
                <Button
                  color="negative"
                  label="Delete"
                  @click="deletePolicy(props.row.policy)"
                  icon="backspace"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </QBasicTable>
      <!-- <ConfirmationModal :show="deleteConfirmationModalVisible" title="Delete Policy" type="danger" confirmText="Delete"
        @close="deleteConfirmationModalVisible = false" @confirm="confirmDelete">
        <template #message>Are you sure you want to continue? This cannot be undone.</template>
      </ConfirmationModal> -->

      <ConfirmationDialog
        title="Delete Policy"
        v-model="deleteConfirmationModalVisible"
        @close="deleteConfirmationModalVisible = false"
        @confirm="confirmDelete"
      >
        <template #message
          >Are you sure you want to continue? This cannot be undone.</template
        >
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '~/types/q-basic-table';
const { $api, $_, $toast } = useNuxtApp();
// PAGINATION
let previousEvaluatedKey = ref<any[]>([]);
let nextEvaluatedKey = ref<string | null | undefined>(null);
const columns: Column[] = [
  {
    name: "policy",
    label: "Policy",
    align: "left",
    field: "policy",
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
const { data, pending, refresh } = $api.policies.getPolicies(
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
  const lastPolicyDetails: any = $_.last(data?.value?.resource?.policies);
  previousEvaluatedKey.value.push(nextEvaluatedKey.value);
  nextEvaluatedKey.value = lastPolicyDetails.role;
}
// PAGINATION

// DELETE POLICY
const deleteConfirmationModalVisible = ref(false);
const selectedPolicy = ref<string | null>(null);
function deletePolicy(id: string) {
  selectedPolicy.value = id;
  deleteConfirmationModalVisible.value = true;
}

async function confirmDelete() {
  if (selectedPolicy.value) {
    pending.value = true;
    deleteConfirmationModalVisible.value = false;
    await $api.policies.deletePolicy(selectedPolicy.value);
    $toast.success("Policy successfully deleted");
    refresh();
  }
}
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
