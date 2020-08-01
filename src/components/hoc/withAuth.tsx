import AuthContext, { initialAuthContextState } from "../contexts/AuthContext";
import { IWithAuthOptions, IAuthContextState } from "../../utils/types";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { me } from "../../utils/services";
import { apiClient } from "../../utils/helpers";

export default function withAuth(
    Component: React.ComponentType<any> | React.FC<any>,
    options?: IWithAuthOptions
): React.FC {
    return (props) => {
        const router = useRouter();
        const authContextState = useContext(AuthContext);
        const [
            { accessToken, authAttempted, user, authLoading },
            setAuthState,
        ] = useState<IAuthContextState>(authContextState);

        useEffect(
            function () {
                // embedded if statements are to limit the number of checks for logged in users.
                if (!accessToken) {
                    const storedToken = localStorage.getItem("accessToken");
                    if (!storedToken) {
                        router.push("/sign-up");
                    } else if (authAttempted && !validateUser()) {
                        router.push("/log-in");
                    } else {
                        authenticateUser(storedToken);
                    }
                }
            },
            [authAttempted]
        );

        function validateUser(): boolean {
            return (
                authAttempted &&
                user &&
                options?.allowedUserRoles?.includes(user.role) !== false
            );
        }

        function authenticateUser(accessToken: string) {
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

        return accessToken ? (
            <AuthContext.Provider
                value={{ accessToken, authAttempted, user, authLoading }}
            >
                <Component {...props} />
            </AuthContext.Provider>
        ) : null;
    };
}
