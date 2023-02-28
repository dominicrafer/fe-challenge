import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    persist: true,
    state: () => {
        return {
            isAuthenticated: false,
            auth: {
                userDetails: {
                    email: null,
                    phone_number: null,
                    name: null,
                },
                token: null,
                roles: []
            },
        }
    },
    actions: {
        async login(email, password) {
            const { $auth } = useNuxtApp();
            const response = await $auth.signIn(email, password)
            if (response && !response.challengeName) {
                this.isAuthenticated = true;
                this.auth = {
                    userDetails: {
                        email: response.attributes.email,
                        phone_number: response.attributes.phone_number,
                        name: response.attributes.name,
                    },
                    token: response.signInUserSession.accessToken.jwtToken,
                    roles: response.signInUserSession.idToken.payload['cognito:groups']
                }
            }
            console.log(response)
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
                    token: response.signInUserSession.accessToken.jwtToken,
                    roles: response.signInUserSession.idToken.payload['cognito:groups']
                }
            } catch (error) {
                console.log(error)
                this.auth = {
                    userDetails: {
                        email: null,
                        phone_number: null,
                        name: null,
                    },
                    token: null,
                    roles: []
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
                roles: []
            };
        }
    },
    getters: {
        isUserAuthenticated: state => state.isAuthenticated,
        userDetails: state => state.auth.userDetails,
        token: state => state.auth.token,
        roles: state => state.auth.roles,
    },
})