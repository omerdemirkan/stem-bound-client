import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function withAuth(
    Component: React.ComponentType | React.FC
): React.FC {
    return () => {
        const router = useRouter();
        const { accessToken, authAttempted } = useSelector(
            (state) => (state as any).auth
        );

        useEffect(
            function () {
                if (authAttempted && !accessToken) {
                    router.push("/log-in");
                }
            },
            [authAttempted]
        );

        return <Component />;
    };
}
