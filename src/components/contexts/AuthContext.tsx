import { createContext, useState, useEffect } from "react";
import {
    IAuthContextState,
    IUser,
    IAuthHelperResponse,
} from "../../utils/types";
import { me, logIn, signUp } from "../../utils/services";
import { apiClient } from "../../utils/helpers";

export const initialAuthContextState: IAuthContextState = {
    authLoading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
    login: async (options: { email: string; password: string }) => ({
        ok: true,
    }),
    logout: () => {},
    signup: async (options: { email: string; password: string }) => ({
        ok: true,
    }),
    authenticateToken: async (token: string) => ({ ok: true }),
    mutateUser: (user: IUser) => {},
};

const AuthContext = createContext(initialAuthContextState);

export default AuthContext;

export const AuthContextProvider: React.FC = ({ children }) => {
    const [
        { accessToken, authAttempted, user, authLoading },
        setAuthState,
    ] = useState<Partial<IAuthContextState>>(initialAuthContextState);

    const updateAuthState = (updates: Partial<IAuthContextState>) =>
        setAuthState((prev) => ({ ...prev, updates }));

    useEffect(function () {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            authenticateToken(storedToken);
        } else {
            handleAuthFailure();
        }
    }, []);

    async function authenticateToken(
        token: string
    ): Promise<IAuthHelperResponse> {
        updateAuthState({
            authLoading: true,
        });

        try {
            const {
                data: { accessToken, user },
            } = await me(token);
            handleAuthSuccess({ user, accessToken });
            return { ok: true };
        } catch (e) {
            handleAuthFailure();
            return Promise.reject(e.error);
        }
    }

    async function login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<IAuthHelperResponse> {
        updateAuthState({
            authLoading: true,
        });

        try {
            const {
                data: { accessToken, user },
            } = await logIn({ email, password });
            handleAuthSuccess({ user, accessToken });
            return { ok: true };
        } catch (e) {
            handleAuthFailure();
            return Promise.reject(e.error);
        }
    }

    async function signup(userData): Promise<IAuthHelperResponse> {
        updateAuthState({
            authLoading: true,
        });

        try {
            const {
                data: { accessToken, user },
            } = await signUp(userData);
            handleAuthSuccess({ user, accessToken });
            return { ok: true };
        } catch (e) {
            handleAuthFailure();
            return Promise.reject(e.error);
        }
    }

    function logout() {
        apiClient.deleteAuthHeader();
        localStorage.removeItem("accessToken");
        setAuthState(initialAuthContextState);
    }

    function handleAuthSuccess({
        user,
        accessToken,
    }: {
        user: IUser;
        accessToken: string;
    }) {
        apiClient.setAuthHeader(accessToken);
        localStorage.setItem("accessToken", accessToken);
        setAuthState({
            user,
            accessToken,
            authAttempted: true,
            authLoading: false,
        });
    }

    function handleAuthFailure() {
        updateAuthState({
            authLoading: false,
            authAttempted: true,
        });
    }

    function mutateUser(user: IUser) {
        updateAuthState({ user });
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                authAttempted,
                user,
                authLoading,
                login,
                logout,
                signup,
                authenticateToken,
                mutateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
