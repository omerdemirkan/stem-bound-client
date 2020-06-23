import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { meAsync } from "../store/auth";

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
                }
            },
            [authAttempted]
        );

        return <Component />;
    };
}
