import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/contexts/AuthContext";
import Section from "../../components/ui/Section";
import StaticLayout from "../../components/ui/StaticLayout";

const VerifyEmailPage: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<Error>();
    const { verifyemail } = useContext(AuthContext);
    useEffect(
        function () {
            if (
                router.query?.sign_up_token &&
                typeof router.query?.sign_up_token === "string"
            )
                verifyemail(router.query.sign_up_token)
                    .then(() => router.push("/app/my-account"))
                    .catch(setError);
        },
        [router.query]
    );
    return (
        <StaticLayout>
            <Section errorMessage={error.message}>
                <Typography align="center" paragraph>
                    Creating your account
                </Typography>
            </Section>
        </StaticLayout>
    );
};

export default VerifyEmailPage;
