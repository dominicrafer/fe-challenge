<template>
  <VForm @submit="onSubmit" :initialValues="userDetails">
    <template #default="{ isSubmitting }">
      <q-card>
        <SectionTitle title="User Details" class="rounded-t-sm" />
        <div class="users__form">
          <div class="row gap-2">
            <InputField
              class="col"
              name="first_name"
              placeholder="First Name"
              rules="max:128|required"
              v-model="formData.first_name"
              v-model:isDirty="dirtyFieldValidator.first_name"
            >
              <template #label> First Name </template>
            </InputField>
            <InputField
              class="col"
              name="last_name"
              placeholder="Last Name"
              rules="max:128|required"
              v-model="formData.last_name"
              v-model:isDirty="dirtyFieldValidator.last_name"
            >
              <template #label> Last Name </template>
            </InputField>
          </div>
          <div class="row gap-2">
            <Select
              name="role"
              class="col"
              placeholder="Select role"
              v-model="formData.role"
              v-model:isDirty="dirtyFieldValidator.role"
              :options="roleOptions"
              rules="select_required"
            >
              <template #label> Role </template>
            </Select>
            <InputField
              name="phone_number"
              class="col"
              placeholder="Enter Text"
              v-model="formData.phone_number"
              v-model:isDirty="dirtyFieldValidator.phone_number"
              rules="required|ph_phone_number"
            >
              <template #label> Mobile Number </template>
            </InputField>
          </div>
          <InputField
            name="email"
            placeholder="Enter Text"
            rules="required|email|max:128"
            v-model="formData.email"
            v-model:isDirty="dirtyFieldValidator.email"
          >
            <template #label> Email </template>
          </InputField>
          <InputField
            v-if="!edit"
            type="password"
            name="password"
            placeholder="Enter Text"
            rules="required|max:128"
            v-model="formData.password"
            v-model:isDirty="dirtyFieldValidator.password"
          >
            <template #label> Password </template>
          </InputField>
          <div class="form__footer">
            <!-- <Button
              color="warning"
              v-if="edit"
              @click="auditTrailDrawerVisible = true"
              :loading="isSubmitting"
              >View Audit Trail</Button
            > -->

            <Button
              color="positive"
              type="submit"
              :loading="isSubmitting"
              label="Save"
            ></Button>
          </div>
        </div>
      </q-card>

      <ConfirmationDialog
        :title="`${edit ? 'Cancel Updating User' : 'Cancel User Creation'}`"
        v-model="leaveWarningModalVisible"
        @close="leaveWarningModalVisible = false"
        @confirm="confirmLeave"
      >
        <template #message
          >Are you sure you want to cancel
          {{ edit ? "updating" : "creating" }} this user? Changes will not be
          saved.</template
        >
      </ConfirmationDialog>
    </template>
  </VForm>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "#vue-router";
import type { UserCreatePayload } from "~/types/users";
import type { RoleDetails, RoleObject } from "~/types/roles";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  userDetails: {
    type: Object,
    default() {
      return {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: "+639458288837",
        department: null,
        employee_number: null,
        role: null,
        partners: [],
      };
    },
  },
  submitHandler: {
    type: Function,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});
const leaveWarningModalVisible = ref(false);
const leaveRoute = ref<null | RouteLocationNormalized>(null);
const allowRouteLeave = ref(false);
onBeforeRouteLeave((to, from, next) => {
  if (allowRouteLeave.value) {
    next();
  } else {
    leaveWarningModalVisible.value = true;
    leaveRoute.value = to;
  }
});
// expose({ allowRouteLeave });
const { $api, $_, $toast } = useNuxtApp();
console.log("props.userDetails", props.userDetails);
const formData = reactive(props.userDetails);

const dirtyFieldValidator = reactive({
  first_name: false,
  last_name: false,
  email: false,
  phone_number: false,
  role: false,
  partners: false,
  employee_number: true,
  password: false,
});
let roleOptions = ref<RoleObject[]>([]);
const { data: roles, pending } = await $api.roles.getRoles();
if (roles.value?.resource.roles.length) {
  roleOptions.value = $_.map(
    roles.value.resource.roles,
    (roleDetails: RoleDetails) => {
      return {
        label: roleDetails.role,
        value: roleDetails.role,
      };
    }
  );
}

async function onSubmit(values: UserCreatePayload) {
  console.log(values.role.valueOf)
  allowRouteLeave.value = true;
  let payload = {
    ...values,
    role: values.role.valueOf,
  };
  if (props.edit) {
    let parsedPayload = {};
    $_.forEach(dirtyFieldValidator, (isDirty, key) => {
      if (isDirty) {
        parsedPayload[key] = key === "role" ? values[key].value : values[key];
      }
    });

    await props.submitHandler(parsedPayload);
  } else {
    await props.submitHandler(payload);
  }
}

function confirmLeave() {
  const router = useRouter();
  leaveWarningModalVisible.value = false;
  allowRouteLeave.value = true;
  router.push(leaveRoute.value);
}
const isFetchingPartners = ref(false);
let partnerOptions = reactive([]);
</script>

<style lang="postcss" scoped>
.users {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] p-4;

    .form__footer {
      @apply flex items-end justify-end gap-3;
    }
  }

  .form__col {
    @apply grid grid-cols-2 gap-[12px] items-start;
  }

  .col__button {
    @apply mt-[28px];
  }
}

.modal__message {
  @apply flex flex-col gap-4;
}
</style>
