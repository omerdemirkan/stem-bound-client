import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import Typography from "@material-ui/core/Typography";
import SchoolOfficialSignUpForm from "../../components/forms/SchoolOfficialSignUpForm";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { EUserRoles } from "../../utils/types";

const SchoolOfficialSignUpPage: React.FC = () => {
    const [error, setError] = useState<Error>();
    const { accessToken, signup, authLoading } = useContext(AuthContext);

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
        signup({ ...values, role: EUserRoles.SCHOOL_OFFICIAL })
            .then(() => router.push("/app/dashboard"))
            .catch(setError);
    }
    return (
        <Layout>
            <Head>
                <title>STEM-bound - School Official Sign Up</title>
            </Head>
            <Typography variant="h3" component="h1" align="center">
                Sign Up
            </Typography>
            <SignUpStepper activeStep={1} />
            <SchoolOfficialSignUpForm
                onSubmit={onSubmit}
                loading={authLoading}
                success={!!accessToken}
                errorMessage={error?.message}
            />
        </Layout>
    );
};

export default SchoolOfficialSignUpPage;
