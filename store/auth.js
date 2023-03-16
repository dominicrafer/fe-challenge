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
        },
        token: null,
        tokenExpiration: null,
      },
    };
  },
  actions: {
    async login(email, password) {
      const { $auth } = useNuxtApp();
      const response = await $auth.signIn(email, password);
      if (response && !response.challengeName) {
        this.isAuthenticated = true;
        this.auth = {
          userDetails: {
            email: response.attributes.email,
            contact: response.attributes.phone_number,
            name: 'Test User',
          },
          token: response.signInUserSession.idToken.jwtToken,
          tokenExpiration: response.signInUserSession.idToken.payload.exp,
        };
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
        const { $auth } = useNuxtApp();
        const response = await $auth.currentAuthenticatedUser();
        this.auth = {
          userDetails: {
            email: response.attributes.email,
            phone_number: response.attributes.phone_number,
            name: response.attributes.name,
          },
          token: response.signInUserSession.idToken.jwtToken,
          tokenExpiration: response.signInUserSession.idToken.payload.exp,
        };
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
      const { $auth } = useNuxtApp();
      try {
        const cognitoUser = await $auth.currentAuthenticatedUser();
        const currentSession = await $auth.currentSession();
        cognitoUser.refreshSession(
          currentSession.refreshToken,
          (err, session) => {
            console.log(session , 'refresh')
            this.auth = {
              ...this.auth,
              token: session.idToken.jwtToken,
              tokenExpiration: session.idToken.payload.exp,
            };
          }
        );
      } catch (error) {
        this.isAuthenticated = false;
        console.log(error)
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
