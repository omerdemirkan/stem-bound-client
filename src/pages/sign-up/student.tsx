import StaticLayout from "../../components/ui/StaticLayout";
import Head from "next/head";
import { SignUpStepper } from ".";
import Typography from "@material-ui/core/Typography";
import StudentSignUpForm from "../../components/forms/StudentSignUpForm";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EUserRoles } from "../../utils/types";
import AuthContext from "../../components/contexts/AuthContext";

const StudentSignUpPage: React.FC = () => {
    const [error, setError] = useState<Error>();
    const { user, accessToken, signup, authLoading } = useContext(AuthContext);

    const router = useRouter();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    function onSubmit(values) {
        signup({ ...values, role: EUserRoles.STUDENT })
            .then(() => router.push("/sign-up/send-email"))
            .catch(setError);
    }
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Student Sign Up</title>
            </Head>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <SignUpStepper activeStep={1} />
            <StudentSignUpForm
                onSubmit={onSubmit}
                loading={authLoading}
                success={!!accessToken}
                errorMessage={error?.message}
            />
        </StaticLayout>
    );
};

export default StudentSignUpPage;
