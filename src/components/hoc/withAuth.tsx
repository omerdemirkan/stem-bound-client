import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { meAsync } from "../../store/auth";
import { apiClient } from "../../utils/helpers";

export default function withAuth(
    Component: React.ComponentType | React.FC
): React.FC {
    return () => {
        const router = useRouter();
        const { accessToken, authAttempted } = useSelector(
            (state) => (state as any).auth
        );
        const dispatch = useDispatch();

        useEffect(
            function () {
                // embedded if statements are to limit the number of checks for logged in users.
                if (!accessToken) {
                    const storedToken = localStorage.getItem("accessToken");
                    if (authAttempted || !storedToken) {
                        router.push(storedToken ? "/log-in" : "/sign-up");
                    } else {
                        dispatch(meAsync(storedToken));
                    }
                } else if (!apiClient.getAuthHeader()) {
                    // For when users navigate between pages and re-instantiate the apiClient.
                    apiClient.setAuthHeader(accessToken);
                }
            },
            [authAttempted]
        );

        return <Component />;
    };
}
