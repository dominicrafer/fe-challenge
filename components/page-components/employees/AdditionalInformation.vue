<template>
  <VForm>
    <InputField type="textarea" name="bio" label="Bio" />
    <p class="mt-3">References</p>
    <div class="flex flex-nowrap gap-2 items-center">
      <InputField name="name" label="Name" />
      <InputField name="contact" label="Contact" />
      <Icon name="simple-line-icons:plus" width="24" height="24" />
    </div>
    <Button type="submit" @click="$storage.list()">Submit</Button>
  </VForm>
</template>

<script lang="ts" setup></script>
<style></style>
