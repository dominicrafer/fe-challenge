<template>
  <div class="page">
    <PageHeader title="Employees">
      <template #right-panel><Button label="Add New Employee" color="positive" icon="add" to="/create"></Button></template>
    </PageHeader>
    <div class="page__body">
      <QBasicTable
        :columns="columns"
        :rows="!pending ? (employeeList.resource.data.items as EmployeeDetails[]) : []"
        @paginate="() => {}"
        :pagination="{
          page: 1,
          page_size: 10,
          return_count: 0
        }"
        :loading="pending"
        no-data-label="No data found."
        :filterable="false"
        :searchable="false"
        :sortable="false"
        :dynamicSlots="['date_hired', 'actions']"
      >
        <template #date_hired="props">
          <q-td :props="props"
            ><p>
              {{ $dayjs(props.row.account_information.date_hired).format("MMM DD, YYYY") }}
            </p>
          </q-td>
        </template>
        <template #actions="props">
          <q-td :props="props" class="space-x-2">
            <Button
              :to="{
                // name: 'users-id',
                // params: { id: props.row.cognito_id }
              }"
              color="primary"
              label="View"
              icon="visibility"
            />
            <Button color="negative" label="Delete" icon="delete" />
          </q-td>
        </template>
      </QBasicTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmployeeDetails } from "@/types/employee";
import type { Column } from "@/types/q-basic-table";
const columns: Column[] = [
  {
    name: "employee_number",
    label: "Employee Number",
    align: "left",
    field: (row: EmployeeDetails) => row.account_information.employee_number
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: (row: EmployeeDetails) => `${row.personal_information.first_name} ${row.personal_information.last_name}`
  },
  {
    name: "company_email",
    label: "Email",
    align: "left",
    field: (row: EmployeeDetails) => row.account_information.company_email
  },
  {
    name: "position",
    label: "Position",
    align: "left",
    field: (row: EmployeeDetails) => row.account_information.position
  },
  {
    name: "date_hired",
    label: "Date Hired",
    align: "left",
    field: (row: EmployeeDetails) => row.account_information.date_hired
  },
  {
    name: "actions",
    align: "left",
    label: "Actions",
    field: "actions"
  }
];
const { $api, $dayjs } = useNuxtApp();

const { data: employeeList, pending } = $api.employee.getEmployees();
</script>
<style lang="postcss" scoped></style>
