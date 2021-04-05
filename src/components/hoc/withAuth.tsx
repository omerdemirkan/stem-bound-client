import AuthContext from "../contexts/AuthContext";
import { IWithAuthOptions } from "../../utils/types";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";

export default function withAuth<T>(
    Component: React.ComponentType<T> | React.FC<T>,
    options?: IWithAuthOptions
): React.FC<T> {
    return (props) => {
        const router = useRouter();
        const { accessToken, authAttempted, user } = useContext(AuthContext);

        useEffect(
            function () {
                // embedded if statements are to limit the number of checks for logged in users.
                if (authAttempted) {
                    const storedToken = localStorage.getItem("accessToken");
                    if (!storedToken) router.push("/sign-up");
                    else if (!validateUser()) router.push(getRedirectUrl());
                }
            },
            [authAttempted]
        );

        function validateUser(): boolean {
            return authAttempted && user && validateUserRole();
        }

        function validateUserRole(): boolean {
            return options?.allowedUserRoles?.includes(user.role) !== false;
        }

        function getRedirectUrl() {
            if (options?.unauthorizedUserRoleRedirect && !validateUserRole())
                return typeof options?.unauthorizedUserRoleRedirect === "string"
                    ? options?.unauthorizedUserRoleRedirect
                    : options?.unauthorizedUserRoleRedirect?.(user);

            return "/log-in";
        }

        return accessToken ? <Component {...props} /> : null;
    };
}
