<template>
  <VForm @submit="onSubmit" @keydown.enter.prevent v-slot="{ isSubmitting }" :initialValues="userDetails">
    <div class="users">
      <Container :loading="isLoading || pending" padding="p-0">
        <SectionTitle title="User Details" class="rounded-t-sm" />
        <div class="users__form">
          <div class="form__col">
            <InputField name="first_name" placeholder="First Name" rules="max:128|required" v-model="formData.first_name"
              v-model:isDirty="dirtyFieldValidator.first_name">
              <template #label> Name </template>
            </InputField>
            <InputField name="last_name" placeholder="Last Name" rules="max:128|required" v-model="formData.last_name"
              v-model:isDirty="dirtyFieldValidator.last_name">
              <template #label> Last Name </template>
            </InputField>
          </div>

          <div class="form__col">
            <Select name="role" placeholder="Select role" v-model="formData.role"
              v-model:isDirty="dirtyFieldValidator.role" :options="roleOptions" rules="select_required" trackBy="value"
              label="label">
              <template #label> Role </template>
            </Select>
            <InputField name="phone_number" placeholder="Enter Text" v-model="formData.phone_number"
              v-model:isDirty="dirtyFieldValidator.phone_number" rules="required|ph_phone_number">
              <template #label> Mobile Number </template>
            </InputField>
          </div>
          <InputField name="email" placeholder="Enter Text" rules="required|email|max:128" v-model="formData.email"
            v-model:isDirty="dirtyFieldValidator.email">
            <template #label> Email </template>
          </InputField>
          <!-- min:8|has_upper_lower_case|has_special_char|has_number|required -->
          <InputField type="password" name="password" placeholder="Enter Text" v-if="!edit" :rules="{
            required: true,
            min: 8,
            has_upper_lower_case: true,
            has_special_char: true,
            has_number: true,
          }" v-model="formData.password" v-model:isDirty="dirtyFieldValidator.password">
            <template #label> Password </template>
          </InputField>
          <div class="form__footer">
            <Button variant="warning" v-if="edit" @click="resetPassword" :loading="isSubmitting">Reset Password</Button>
            <Button variant="success" type="submit" :loading="isSubmitting">Save</Button>
          </div>
        </div>
      </Container>
      <Modal :show="newPasswordModalVisible" title="New Password" type="success" confirmText="Confirm"
        @close="newPasswordModalVisible = false" @confirm="newPasswordModalVisible = false">
        <div class="modal__message">
          <p class="text-xl">
            Password successfully generated for
            <strong>
              {{ userDetails.first_name }} {{ userDetails.last_name }}</strong>.
          </p>
          <p class="text-[32px] mt-5 font-bold text-center">
            {{ newPassword }}
          </p>
        </div>
      </Modal>
      <ConfirmationModal :show="leaveWarningModalVisible"
        :title="`${edit ? 'Cancel Updating User' : 'Cancel User Creation'}`" type="warning" confirmText="Proceed"
        @close="leaveWarningModalVisible = false" @confirm="confirmLeave">
        <template #message>Are you sure you want to cancel
          {{ edit ? "updating" : "creating" }} this user? Changes will not be
          saved.</template>
      </ConfirmationModal>
    </div>
  </VForm>
</template>

<script>
definePageMeta({
  layout: "default",
});
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
          password: null,
          email: null,
          phone_number: null,
          role: null,
          password: null,
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
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    const formData = reactive(props.userDetails);
    const deleteConfirmationModalVisible = ref(false);

    const dirtyFieldValidator = reactive({
      first_name: false,
      last_name: false,
      password: false,
      email: false,
      phone_number: false,
      role: false,
      password: false,
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

    const newPasswordModalVisible = ref(false);
    const newPassword = ref(null);
    async function resetPassword() {
      pending.value = true;
      const { data } = await $api.users.resetPassword({
        cognito_id: route.params.id,
      });
      newPasswordModalVisible.value = true;
      pending.value = false;
      newPassword.value = data.value.resource.generated_password;
    }

    function confirmLeave() {
      const router = useRouter();
      leaveWarningModalVisible.value = false;
      allowRouteLeave.value = true;
      router.push(leaveRoute.value);
    }

    return {
      roleOptions,
      dirtyFieldValidator,
      pending,
      roles,
      formData,
      onSubmit,
      resetPassword,
      newPassword,
      newPasswordModalVisible,
      deleteConfirmationModalVisible,
      leaveWarningModalVisible,
      confirmLeave,
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
    @apply grid grid-cols-2 gap-[12px];
  }

  .col__button {
    @apply mt-[28px];
  }
}

.modal__message {
  @apply flex flex-col gap-4;
}
</style>
