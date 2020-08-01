import { createContext, useState, useEffect } from "react";
import { IAuthContextState } from "../../utils/types";
import { me } from "../../utils/services";
import { apiClient } from "../../utils/helpers";

export const initialAuthContextState: IAuthContextState = {
    authLoading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
};

const AuthContext = createContext(initialAuthContextState);

export default AuthContext;

export const AuthContextProvider: React.FC = ({ children }) => {
    const [
        { accessToken, authAttempted, user, authLoading },
        setAuthState,
    ] = useState<IAuthContextState>(initialAuthContextState);

    useEffect(function () {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            authenticateToken(storedToken);
        }
    }, []);

    function authenticateToken(accessToken: string) {
        setAuthState((prevState) => ({
            ...prevState,
            authLoading: true,
        }));
        me(accessToken)
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                localStorage.setItem("accessToken", accessToken);
                setAuthState({
                    user,
                    accessToken,
                    authAttempted: true,
                    authLoading: false,
                });
            })
            .catch(function (err) {
                setAuthState((prevState) => ({
                    ...prevState,
                    authLoading: false,
                    authAttempted: true,
                }));
            });
    }
    return (
        <AuthContext.Provider
            value={{ accessToken, authAttempted, user, authLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
