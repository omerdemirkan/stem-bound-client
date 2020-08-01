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
        const { accessToken, authAttempted, user, authLoading } = useContext(
            AuthContext
        );

        useEffect(
            function () {
                // embedded if statements are to limit the number of checks for logged in users.
                if (authAttempted) {
                    const storedToken = localStorage.getItem("accessToken");
                    if (!storedToken) {
                        router.push("/sign-up");
                    } else if (!validateUser()) {
                        router.push("/log-in");
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

        return accessToken ? <Component {...props} /> : null;
    };
}
