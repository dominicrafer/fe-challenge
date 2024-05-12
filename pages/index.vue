<template>
  <div class="page">
    <PageHeader title="Frontend Challenge #3" />
    <div class="page__body">
      <Container padding="p-0">
        <VForm>
          <SectionTitle title="Personal Information"></SectionTitle>
          <div class="section">
            <FileUpload name="profile_picture" label="Profile Picture">Profile Picture</FileUpload>
            <InputField name="first_name" label="First Name" />
            <InputField name="last_name" label="Last Name" />
            <InputField name="personal_email" label="Personal Email" />
            <InputField name="personal_contact" label="Personal Contact" />
            <DatePicker label="Birthdate" name="birthdate" />
            <Select name="country" label="Country" :options="[]" use-input />
            <Select name="provinece" label="Province" :options="[]" use-input />
            <Select name="city" label="City" :options="[]" use-input />
            <Select name="barangay" label="Barangay" :options="[]" use-input />
            <InputField name="zip_code" label="Zip Code" />
            <Button type="submit">Submit</Button>
          </div>
          <SectionTitle title="Account Information"></SectionTitle>
          <div class="section">
            <InputField name="company_email" label="Company Email" />
            <InputField name="company_contact" label="Company Contact" />
            <InputField name="employee_number" label="Employee Number" />
            <InputField name="date_hired" label="Date Hired" />
            <DatePicker label="position" name="Position" />
            <Button type="submit">Submit</Button>
          </div>
          <SectionTitle title="Documents"></SectionTitle>
          <div class="section">
            <FileUpload name="diploma">Diploma</FileUpload>
            <FileUpload name="birth_certificate">Birth Certificate</FileUpload>
            <FileUpload name="bir_2316">BIR 2316</FileUpload>
            <FileUpload name="philhealth_pmrf">Philhealth PMRF</FileUpload>
            <FileUpload name="certificate_of_employment">Certificate of Employment</FileUpload>
            <FileUpload name="ids">IDs</FileUpload>
            <Button type="submit">Submit</Button>
          </div>
          <SectionTitle title="Additional Information"></SectionTitle>
          <div class="section">
            <InputField type="textarea" name="bio" label="Bio" />
            <p class="mt-3">References</p>
            <div class="flex flex-nowrap gap-2 items-center">
              <InputField name="name" label="Name" />
              <InputField name="contact" label="Contact" />
              <Icon name="simple-line-icons:plus" width="24" height="24" />
            </div>
            <Button type="submit" @click="$storage.list()">Submit</Button>
          </div>
          <SectionTitle title="Summary"></SectionTitle>
          <div class="p-2"></div>
          <Button type="submit">Submit</Button>
        </VForm>
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
