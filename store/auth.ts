import type { FetchUserAttributesOutput } from "aws-amplify/auth";
import type { AuthState } from "../types/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  persist: true,
  state: () => {
    const state: AuthState = {
      isAuthenticated: false,
      auth: {
        userDetails: {
          email: null,
          contact: null,
          name: null,
          modules: [],
          policies: [],
        },
        token: null,
        tokenExpiration: null,
      },
    };
    return state;
  },
  actions: {
    async login(email: string, password: string) {
      const { $auth, $api } = useNuxtApp();
      const response = await $auth.signIn({ username: email, password });
      if (
        response.isSignedIn &&
        response.nextStep.signInStep !==
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        const session = await $auth.fetchAuthSession();
        const { email, phone_number, name }: any =
          await $auth.fetchUserAttributes();
        this.auth.token = session?.tokens?.idToken?.toString();
        this.auth.tokenExpiration = session?.tokens?.idToken?.payload.exp;
        await $api.roles.getCurrentUserRole().then((auth: any) => {
          this.isAuthenticated = true;
          this.auth = {
            ...this.auth,
            userDetails: {
              email,
              contact: phone_number,
              name,
              modules: [],
              policies: []
              // modules: auth.data.value.resource.modules,
              // policies: auth.data.value.resource.policies,
            },
          };
        });
      }
      return response;
    },
    async completeNewPassword(password: string) {
      const { $auth, $api } = useNuxtApp();
      const response = await $auth.confirmSignIn({
        challengeResponse: password,
      });
      if (response.isSignedIn) {
        const session = await $auth.fetchAuthSession();
        const { email, phone_number, name } =
          await $auth.fetchUserAttributes();
        this.auth.token = session?.tokens?.idToken?.toString();
        this.auth.tokenExpiration = session?.tokens?.idToken?.payload.exp;
        await $api.roles.getCurrentUserRole().then((auth) => {
          this.isAuthenticated = true;
          this.auth = {
            ...this.auth,
            userDetails: {
              email,
              contact: phone_number,
              name,
              // modules: auth.data.value.resource.modules,
              // policies: auth.data.value.resource.policies,
              modules: [],
              policies: []
            },
          };
        });
      }
    },
    async load() {
      const { $auth, $api } = useNuxtApp();
      try {
        await $auth.fetchUserAttributes().then(async (userDetails: FetchUserAttributesOutput) => {
          const session = await $auth.fetchAuthSession();
          this.auth.token = session?.tokens?.idToken?.toString();
          this.auth.tokenExpiration = session?.tokens?.idToken?.payload.exp;
          await $api.roles.getCurrentUserRole().then((role: any) => {
            this.isAuthenticated = true;
            this.auth = {
              ...this.auth,
              userDetails: {
                email: userDetails.email,
                contact: userDetails.phone_number,
                name: userDetails.name,
                modules: [],
                policies: []
                // modules: role.data.value.resource.modules,
                // policies: role.data.value.resource.policies,
              },
            };
          });
        });
      } catch (error) {
        this.clearSessionState();
      }
    },
    async logout() {
      const { $auth } = useNuxtApp();
      await $auth.signOut();
      this.isAuthenticated = false;
      this.clearSessionState();
    },
    async refresh() {
      const { $auth } = useNuxtApp();
      if (this.isAuthenticated) {
        try {
          const session = await $auth.fetchAuthSession();
          this.auth.token = session?.tokens?.idToken?.toString();
          this.auth.tokenExpiration = session?.tokens?.idToken?.payload.exp;
        } catch (err) {
          this.isAuthenticated = false;
        }
      }
    },
    clearSessionState() {
      this.auth = {
        userDetails: {
          email: null,
          contact: null,
          name: null,
          modules: [],
          policies: [],
        },
        token: null,
        tokenExpiration: null,
      };
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
    userDetails: (state) => state.auth.userDetails,
    token: (state) => state.auth.token,
    tokenExpiration: (state) => state.auth.tokenExpiration,
  },
});
