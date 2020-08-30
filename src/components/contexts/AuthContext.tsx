import { createContext, useState, useEffect } from "react";
import { IAuthContextState, IUser } from "../../utils/types";
import { me, logIn, signUp } from "../../utils/services";
import { apiClient } from "../../utils/helpers";

export const initialAuthContextState: IAuthContextState = {
    authLoading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
    login: (options: { email: string; password: string }) => {},
    logout: () => {},
    signup: (options: { email: string; password: string }) => {},
    authenticateToken: (token: string) => {},
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

    function authenticateToken(accessToken: string) {
        updateAuthState({
            authLoading: true,
        });
        me(accessToken)
            .then(function ({ data: { accessToken, user } }) {
                handleAuthSuccess({ user, accessToken });
            })
            .catch(function (err) {
                handleAuthFailure();
            });
    }

    function login({ email, password }: { email: string; password: string }) {
        logIn({ email, password })
            .then(function ({ data: { accessToken, user } }) {
                handleAuthSuccess({ user, accessToken });
            })
            .catch(function (err) {
                handleAuthFailure();
            });
    }

    function signup(userData) {
        signUp(userData)
            .then(function ({ data: { accessToken, user } }) {
                handleAuthSuccess({ user, accessToken });
            })
            .catch(function (err) {
                handleAuthFailure();
            });
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
