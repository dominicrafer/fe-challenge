<template>
  <VForm
    @submit="onSubmit"
    v-slot="{ isSubmitting }"
    :initialValues="userDetails"
    :key="isLoading"
  >
    <div class="users">
      <Container
        :loading="isLoading || pending"
        padding="p-0"
        width="xl:w-1/2 w-full"
      >
        <SectionTitle title="User Details" class="rounded-t-sm" />
        <div class="users__form">
          <div class="form__col">
            <InputField
              name="first_name"
              placeholder="Enter Text"
              rules="alpha_spaces"
              v-model="formData.first_name"
              v-model:isDirty="dirtyFieldValidator.first_name"
            >
              <template #label> Name </template>
            </InputField>
            <InputField
              name="last_name"
              placeholder="Enter Text"
              rules="alpha"
              v-model="formData.last_name"
              v-model:isDirty="dirtyFieldValidator.last_name"
            >
              <template #label> Last Name </template>
            </InputField>
          </div>

          <div class="form__col">
            <Select
              name="role"
              placeholder="Select role"
              v-model="formData.role"
              v-model:isDirty="dirtyFieldValidator.role"
              :options="roleOptions"
              trackBy="value"
              label="label"
            >
              <template #label> Role </template>
            </Select>
            <InputField
              name="phone_number"
              placeholder="Enter Text"
              v-model="formData.phone_number"
              v-model:isDirty="dirtyFieldValidator.phone_number"
              rules="phone_number"
            >
              <template #label> Mobile Number </template>
            </InputField>
          </div>
          <InputField
            name="email"
            placeholder="Enter Text"
            rules="email"
            v-model="formData.email"
            v-model:isDirty="dirtyFieldValidator.email"
          >
            <template #label> Email </template>
          </InputField>
          <InputField
            type="password"
            name="password"
            placeholder="Enter Text"
            rules="min:8"
            v-model="formData.password"
            v-model:isDirty="dirtyFieldValidator.password"
          >
            <template #label> Password </template>
          </InputField>
          <div class="form__footer">
            <Button variant="success" type="submit" :loading="isSubmitting"
              >Save</Button
            >
          </div>
        </div>
      </Container>
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
  setup(props) {
    const { $api, $_ } = useNuxtApp();
    const formData = reactive(props.userDetails);
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
    const { data: roles, pending, refresh } = $api.roles.getRoles();
    watch(
      roles,
      (rolesUpdate) => {
        $_.forEach(rolesUpdate.resource.roles, (roleDetails) => {
          roleOptions.push({
            label: roleDetails.role,
            value: roleDetails.role,
          });
        });
      },
      { deep: true }
    );

    async function onSubmit(values) {
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

    return {
      roleOptions,
      dirtyFieldValidator,
      pending,
      roles,
      formData,
      onSubmit,
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
      @apply flex flex-col items-end;
    }
  }

  .form__col {
    @apply grid grid-cols-2 gap-[12px];
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>
