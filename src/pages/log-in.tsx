import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import LogInForm from "../components/forms/LogInForm";
import AuthContext from "../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";

const LogInPage: React.FC = () => {
    const router = useRouter();
    const { authLoading, accessToken, login } = useContext(AuthContext);
    const [error, setError] = useState<Error>();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    async function onSubmit(values) {
        try {
            await login(values);
        } catch (e) {
            setError(e);
        }
    }

    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Log In</title>
            </Head>

            <LogInForm
                onSubmit={onSubmit}
                loading={authLoading}
                success={!!accessToken}
                errorMessage={error?.message}
                CardProps={{ style: { margin: "15vh auto" } }}
            />

            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default LogInPage;
