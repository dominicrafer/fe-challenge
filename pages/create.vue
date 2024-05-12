<template>
  <div class="page">
    <PageHeader title="Create Employee" />
    <div class="page__body">
      <Container padding="p-0">
        <EmployeeForm />
      </Container>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $storage } = useNuxtApp();

const form = ref({
  personal_information: {
    profile_picture: null, // required, file, png/jpg, 10mb max
    first_name: null, // required, 128 characters, no special characters
    last_name: null, // required, 128 characters, no special characters
    personal_email: null, // required, email, 128 characters
    personal_contact: null, // required mobile number format
    birthdate: null, // required, no future dates
    country: null, // required, 128 characters
    city: null, // required, 128 characters
    province: null, // required, 128 characters
    zip_code: null // required, 128 characters
  },
  account_information: {
    company_email: null, // required, email, 128 characters
    company_contact: null, // required mobile number format
    employee_number: null, // required, 128 characters
    date_hired: null, // required, no future dates
    position: null // required, 128 characters
  },
  documents: {
    birth_certificate: null, // file, pdf, 10mb max
    bir_2316: null, // file, pdf, 10mb max
    philhealth_pmrf: null, // file, pdf, 10mb max
    certificate_of_employment: null, // file, pdf, 10mb max
    ids: null, // file, png/jpg, 10mb max
    diploma: null // file, pdf, 10mb max
  },
  additional_information: {
    hobbies: null, // required, 128 characters
    references: [], // required
    bio: null // required, 512 characters
  }
});
</script>
<style lang="postcss" scoped>
.section {
  @apply p-2 space-y-3;
}
</style>
