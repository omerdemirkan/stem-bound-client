import { useSelector, useDispatch } from "react-redux";
import { IWithAuthOptions, IAuthState } from "../../utils/types";
import { meAsync } from "../../store/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAuth(
    Component: React.ComponentType<any> | React.FC<any>,
    options?: IWithAuthOptions
): React.FC {
    return (props) => {
        const router = useRouter();
        const { accessToken, authAttempted, user }: IAuthState = useSelector(
            (state) => (state as any).auth
        );
        const dispatch = useDispatch();

        function validateUser(): boolean {
            return (
                authAttempted &&
                user &&
                options?.allowedUserRoles?.includes(user.role) !== false
            );
        }

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
                        dispatch(meAsync(storedToken));
                    }
                }
            },
            [authAttempted]
        );

        return accessToken ? (
            <Component
                {...props}
                accessToken={accessToken}
                authAttempted={authAttempted}
                user={user}
            />
        ) : null;
    };
}
