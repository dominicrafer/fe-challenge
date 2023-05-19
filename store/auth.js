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
      const response = await $auth.signIn(email, password);
      if (response && !response.challengeName) {
        this.auth.token = response.signInUserSession.idToken.jwtToken;
        this.auth.tokenExpiration =
          response.signInUserSession.idToken.payload.exp;
        await $api.roles.getCurrentUserRole().then((auth) => {
          this.isAuthenticated = true;
          this.auth = {
            ...this.auth,
            userDetails: {
              email: response.attributes.email,
              contact: response.attributes.phone_number,
              name: response.attributes.name,
              modules: auth.data.value.resource.modules,
              policies: auth.data.value.resource.policies,
            },
          };
        });
      }
      return response;
    },
    async completeNewPassword(user, email, password) {
      const { $auth } = useNuxtApp();
      const response = await $auth.completeNewPassword(user, password, []);
      if (response) {
        return await this.login(email, password);
      }
    },
    async load() {
      try {
        const { $auth, $api } = useNuxtApp();
        await $auth.currentAuthenticatedUser().then(async (auth) => {
          this.auth.token = auth.signInUserSession.idToken.jwtToken;
          this.auth.tokenExpiration =
            auth.signInUserSession.idToken.payload.exp;
          await $api.roles.getCurrentUserRole().then((role) => {
            this.isAuthenticated = true;
            this.auth = {
              ...this.auth,
              userDetails: {
                email: auth.attributes.email,
                contact: auth.attributes.phone_number,
                name: auth.attributes.name,
                modules: role.data.value.resource.modules,
                policies: role.data.value.resource.policies,
              },
            };
          });
        });
      } catch (error) {
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
      const { $auth, $api } = useNuxtApp();
      try {
        await new Promise(async (resolve, reject) => {
          const cognitoUser = await $auth.currentAuthenticatedUser();
          const currentSession = await $auth.currentSession();
          await cognitoUser.refreshSession(
            currentSession.refreshToken,
            (err, session) => {
              console.log(session, "refresh");
              this.auth = {
                ...this.auth,
                token: session.idToken.jwtToken,
                tokenExpiration: session.idToken.payload.exp,
              };
              resolve();
            }
          );
        });
      } catch (error) {
        this.isAuthenticated = false;
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
