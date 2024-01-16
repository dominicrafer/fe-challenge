<template>
  <Form :submitHandler="onSubmit" :initialValues="userDetails">
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
              color="warning"
              v-if="edit"
              @click="resetPassword"
              :loading="isSubmitting"
              label="Reset Password"
              disable
              ></Button
            >
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
  </Form>
</template>

<script>
export default {
  props: {
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
          phone_number: null,
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
  },
  async setup(props, { expose }) {
    const leaveWarningModalVisible = ref(false);
    const leaveRoute = ref(null);
    const allowRouteLeave = ref(false);
    onBeforeRouteLeave((to, from, next) => {
      if (allowRouteLeave.value) {
        next();
      } else {
        leaveWarningModalVisible.value = true;
        leaveRoute.value = to;
      }
    });
    expose({ allowRouteLeave });
    const { $api, $_, $toast } = useNuxtApp();
    const route = useRoute();
    console.log("props.userDetails", props.userDetails);
    const formData = reactive(props.userDetails);

    console.log(formData, "FORM DATA");
    const deleteConfirmationModalVisible = ref(false);
    const auditTrailDrawerVisible = ref(false);

    const dirtyFieldValidator = reactive({
      first_name: false,
      last_name: false,
      email: false,
      phone_number: false,
      role: false,
      partners: false,
      employee_number: true,
    });
    let roleOptions = reactive([]);
    const { data: roles, pending } = await $api.roles.getRoles();
    roleOptions = $_.map(roles.value.resource.roles, (roleDetails) => {
      return {
        label: roleDetails.role,
        value: roleDetails.role,
      };
    });
    async function onSubmit(values) {
      allowRouteLeave.value = true;
      let payload = {
        ...values,
        role: values.role.value,
      };
      if (props.edit) {
        let parsedPayload = {};
        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          if (isDirty) {
            parsedPayload[key] =
              key === "role" ? values[key].value : values[key];
          }
        });

        await props.submitHandler(parsedPayload);
      } else {
        await props.submitHandler(payload);
      }
    }

    async function resetPassword() {
      pending.value = true;
      const { data, error } = await $api.users.forgotPassword({
        email: props.userDetails.email,
      });
      if (error.value) {
        $toast.error($_.values(error.value.data.errors)[0]);
      } else {
        $toast.success(
          "Password reset request successful. Email will be sent shortly to reset password.",
          { autoClose: false }
        );
      }
      pending.value = false;
    }

    function confirmLeave() {
      const router = useRouter();
      leaveWarningModalVisible.value = false;
      allowRouteLeave.value = true;
      router.push(leaveRoute.value);
    }
    const isFetchingPartners = ref(false);
    let partnerOptions = reactive([]);

    return {
      roleOptions,
      dirtyFieldValidator,
      pending,
      roles,
      formData,
      onSubmit,
      resetPassword,
      deleteConfirmationModalVisible,
      leaveWarningModalVisible,
      confirmLeave,
      isFetchingPartners,
      auditTrailDrawerVisible,
    };
  },
};
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
