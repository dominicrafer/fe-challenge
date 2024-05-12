<template>
  <VForm>
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
  </VForm>
</template>
