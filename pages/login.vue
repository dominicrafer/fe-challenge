<template>
  <VForm @submit="submitHandler">
    <div class="login">
      <div class="login__header">
        <Icon name="mdi:account-circle" color="white" width="80" height="80" />
        <span class="header__title"> USER LOGIN </span>
      </div>
      <div class="login__body">
        <Alert type="danger" v-if="hasError" :title="errorMessage" />
        <InputField
          name="username"
          placeholder="Enter email"
          v-model="email"
          :rules="{ email: true }"
          v-if="!newPasswordRequired"
        >
          <template #label> Email </template>
        </InputField>
        <InputField
          name="password"
          placeholder="Enter password"
          v-model="password"
          type="password"
          rules="required"
          v-if="!newPasswordRequired"
        >
          <template #label> Password </template>
        </InputField>
        <InputField
          name="new-password"
          placeholder="Enter new password"
          v-model="newPassword"
          type="password"
          :rules="{
            required: true,
            min: 8,
            has_upper_lower_case: true,
            has_special_char: true,
            has_number: true,
          }"
          v-if="newPasswordRequired"
        >
          <template #label> New Password </template>
        </InputField>
        <InputField
          name="confirm-password"
          placeholder="Confirm password"
          v-model="confirmPassword"
          type="password"
          rules="confirm_password:@new-password"
          v-if="newPasswordRequired"
        >
          <template #label> Confirm Passwords </template>
        </InputField>
      </div>
      <div class="login__footer">
        <Button
          radius="rounded-xl"
          type="submit"
          color="primary"
          :loading="isLoading"
          showLoading
          :label="newPasswordRequired ? 'Continue' : 'Login'"
        >
        </Button>
      </div>
    </div>
  </VForm>
</template>

<script>
import { useAuthStore } from "@/store/auth";
definePageMeta({
  layout: "login",
});
export default {
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const hasError = ref(false);
    const authStore = useAuthStore();
    const errorMessage = ref(null);
    // Submit handler for conditional login type
    const newPasswordRequired = ref(false);
    function submitHandler() {
      if (newPasswordRequired.value) {
        doConfirmLogin();
      } else {
        doLogin();
      }
    }

    // Login
    const email = ref("dominic.rafer@ecloudvalley.com");
    const password = ref("#####Vmsi123");
    const confirmPassword = ref("#####Vmsi123");
    const { login } = authStore;
    let user = null;
    async function doLogin() {
      isLoading.value = true;
      await login(email.value, password.value)
        .then((res) => {
          console.log(res, "RESPONSE!!");
          hasError.value = false;
          if (
            res.nextStep.signInStep ===
            "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
          ) {
            user = res;
            isLoading.value = false;
            return (newPasswordRequired.value = true);
          }
          if (authStore.isUserAuthenticated) {
            router.push("/");
          }
          isLoading.value = false;
        })
        .catch((error) => {
          errorMessage.value = error.message;
          hasError.value = true;
          isLoading.value = false;
        });
    }

    // Login with change password
    const { completeNewPassword } = authStore;
    const newPassword = ref("#####Vmsi123");
    async function doConfirmLogin() {
      console.log("doconfirmlogin", user, email.value, newPassword.value);
      isLoading.value = true;
      await completeNewPassword(user, email.value, newPassword.value).then(
        () => {
          router.push("/");
        }
      );
    }
    return {
      email,
      password,
      doLogin,
      isLoading,
      hasError,
      errorMessage,
      newPasswordRequired,
      newPassword,
      confirmPassword,
      doConfirmLogin,
      submitHandler,
    };
  },
};
</script>

<style lang="postcss" scoped>
.login {
  @apply w-[25%] min-w-[400px];
  @apply bg-white;
  @apply rounded-2xl;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);

  &__header {
    @apply flex flex-col gap-[4px] items-center;
    @apply rounded-t-2xl;
    @apply py-5 px-3 tracking-widest;
    @apply bg-primary;
    @apply text-white text-xl font-semibold;
    box-shadow: 10px 4px 12px rgba(41, 68, 37, 0.12);
  }

  &__body {
    @apply px-10 pt-10;
    @apply flex flex-col;
    @apply gap-10;
  }

  &__footer {
    @apply flex justify-center;
    @apply mt-5 pt-3 pb-10;

    button {
      @apply w-[40%] text-center flex flex-col items-center;

      span {
        @apply w-full;
      }
    }
  }
}
</style>
