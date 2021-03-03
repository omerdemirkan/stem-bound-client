import { createContext, useState, useEffect } from "react";
import {
    IAuthContextState,
    IUser,
    IAuthHelperResponse,
    IUserOriginal,
} from "../../utils/types";
import {
    me,
    logIn,
    signUp,
    setSignUpEmailRecipient,
    sendVerificationEmail,
} from "../../utils/services";
import { apiClient, mapUserData } from "../../utils/helpers";
import { cache } from "swr";

export const initialAuthContextState: IAuthContextState = {
    authLoading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
    logIn: async (options: { email: string; password: string }) => ({
        ok: true,
    }),
    logout: () => {},
    signUp: async (...args) => ({ ok: true }),
    sendVerificationEmail: async (...args) => ({ ok: true }),
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
            handleAuthSuccess({ user: mapUserData(user), accessToken });
            return { ok: true };
        } catch (e) {
            handleAuthFailure();
            return Promise.reject(e.error);
        }
    }

    async function handleLogIn({
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

            handleAuthSuccess({ user: mapUserData(user), accessToken });
            return { ok: true };
        } catch (e) {
            handleAuthFailure();
            return Promise.reject(e);
        }
    }

    async function handleSendVerificationEmail(
        userData: Partial<IUserOriginal>
    ): Promise<IAuthHelperResponse> {
        updateAuthState({
            authLoading: true,
        });

        const { message } = await sendVerificationEmail(userData);
        setSignUpEmailRecipient(userData.email);
        updateAuthState({
            authLoading: false,
        });
        return { ok: true, message };
    }

    async function handleSignUp(
        signUpToken: string
    ): Promise<IAuthHelperResponse> {
        updateAuthState({
            authLoading: true,
        });

        const {
            data: { accessToken, user },
        } = await signUp(signUpToken);
        handleAuthSuccess({ user: mapUserData(user), accessToken });
        return { ok: true };
    }

    function logout() {
        apiClient.deleteAuthHeader();
        localStorage.removeItem("accessToken");
        setAuthState(initialAuthContextState);
        // clears swr cache so previously logged-in user's data isn't shown
        cache.clear();
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
                logout,
                authenticateToken,
                mutateUser,
                logIn: handleLogIn,
                sendVerificationEmail: handleSendVerificationEmail,
                signUp: handleSignUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
