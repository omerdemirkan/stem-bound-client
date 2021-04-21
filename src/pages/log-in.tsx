import StaticLayout from "../components/layouts/StaticLayout";
import Head from "next/head";
import LogInForm from "../components/forms/LogInForm";
import AuthContext from "../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import FormCard from "../components/ui/FormCard";
import LockIcon from "@material-ui/icons/Lock";
import FadeIn from "../components/ui/FadeIn";

const LogInPage: React.FC = () => {
    const router = useRouter();
    const { authLoading, accessToken, logIn } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string>();

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
            await logIn(values);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <StaticLayout>
            <Head>
                <title>Log In - STEM-bound</title>
            </Head>

            <FadeIn delayMs={100}>
                <FormCard header="Log In" Icon={LockIcon}>
                    <LogInForm
                        onSubmit={onSubmit}
                        loading={authLoading}
                        success={!!accessToken}
                        errorMessage={errorMessage}
                        CardProps={{ style: { margin: "15vh auto" } }}
                    />
                </FormCard>
            </FadeIn>

            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default LogInPage;
