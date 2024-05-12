<template>
  <q-stepper v-model="step" ref="stepper" color="primary" animated>
    <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1"> <PersonalInformation /> </q-step>

    <q-step :name="2" title="Account Information" icon="create_new_folder" :done="step > 2"> <AccountInformation /> </q-step>

    <q-step :name="3" title="Documents" icon="assignment"> <Documents /></q-step>

    <q-step :name="4" title="Additional Information" icon="add_comment"><Summary /> </q-step>
  </q-stepper>
</template>
<script setup lang="ts">
const step = ref(3);
</script>
