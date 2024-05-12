export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean,
    auth: {
        userDetails: {
            email: string | null | undefined;
            contact: string | null | undefined;
            name: string | null | undefined;
            modules: Array<string>;
            policies: Array<string>;
        };
        token: string | null | undefined;
        tokenExpiration: number | null | undefined;
    };
}