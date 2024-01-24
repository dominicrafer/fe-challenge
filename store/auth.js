import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  persist: true,
  state: () => {
    return {
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
  },
  actions: {
    async login(email, password) {
      const { $auth, $api } = useNuxtApp();
      const response = await $auth.signIn({ username: email, password });
      console.log(response, 'LOGIN RESPONSE')
      if (response.isSignedIn && response.signInStep !== 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        const session = await $auth.fetchAuthSession()
        const { email, phone_number, name } = await $auth.fetchUserAttributes()
        console.log(session, 'session')
        this.auth.token = session.tokens.idToken.toString();
        this.auth.tokenExpiration =
          session.tokens.idToken.payload.exp;
        await $api.roles.getCurrentUserRole().then((auth) => {
          this.isAuthenticated = true;
          this.auth = {
            ...this.auth,
            userDetails: {
              email,
              contact: phone_number,
              name,
              modules: auth.data.value.resource.modules,
              policies: auth.data.value.resource.policies,
            },
          };
        });
      }
      return response;
    },
    async completeNewPassword(username, email, password) {
      const { $auth, $api } = useNuxtApp();
      const response = await $auth.confirmSignIn({ challengeResponse: password });
      console.log(response, 'confirm sign in')
      if (response.isSignedIn) {
        const session = await $auth.fetchAuthSession()
        const { email, phone_number, name } = await $auth.fetchUserAttributes()
        this.auth.token = session.tokens.idToken.toString();
        this.auth.tokenExpiration =
          session.tokens.idToken.payload.exp;
        await $api.roles.getCurrentUserRole().then((auth) => {
          this.isAuthenticated = true;
          this.auth = {
            ...this.auth,
            userDetails: {
              email,
              contact: phone_number,
              name,
              modules: auth.data.value.resource.modules,
              policies: auth.data.value.resource.policies,
            },
          };
        });
      }
    },
    async load() {
      const { $auth, $api } = useNuxtApp();
      try {
        await $auth.fetchUserAttributes().then(async (userDetails) => {
          const session = await $auth.fetchAuthSession()
          console.log(session, 'session!')
          console.log(userDetails, 'fetchUserAttributes!')
          this.auth.token = session.tokens.idToken.toString();
          this.auth.tokenExpiration =
            session.tokens.idToken.payload.exp;
          await $api.roles.getCurrentUserRole().then((role) => {
            this.isAuthenticated = true;
            this.auth = {
              ...this.auth,
              userDetails: {
                email: userDetails.email,
                contact: userDetails.phone_number,
                name: userDetails.name,
                modules: role.data.value.resource.modules,
                policies: role.data.value.resource.policies,
              },
            };
          });
        });
      } catch (error) {
        console.log(error, 'AUTH LOAD ERROR')
        this.auth = {
          userDetails: {
            email: null,
            phone_number: null,
            name: null,
          },
          token: null,
        };
      }
    },
    async logout() {
      const { $auth } = useNuxtApp();
      await $auth.signOut();
      this.isAuthenticated = false;
      this.auth = {
        userDetails: {
          email: null,
          phone_number: null,
          name: null,
        },
        token: null,
      };
    },
    async refresh() {
      const { $auth } = useNuxtApp();
      if (this.isAuthenticated) {
        try {
          const session = await $auth.fetchAuthSession();
          this.auth.token = session.tokens.idToken.toString();
          this.auth.tokenExpiration =
            session.tokens.idToken.payload.exp;
        } catch (err) {
          console.log(err, 'REFRESH ERROR');
          this.isAuthenticated = false;
        }
      }
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
    userDetails: (state) => state.auth.userDetails,
    token: (state) => state.auth.token,
    tokenExpiration: (state) => state.auth.tokenExpiration,
  },
});
