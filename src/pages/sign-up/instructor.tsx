import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import AuthContext from "../../components/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EUserRoles } from "../../utils/types";
import InstructorSignUpForm from "../../components/forms/InstructorSignUpForm";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const InstructorSignUpPage: React.FC = () => {
    const { signup, accessToken, authLoading } = useContext(AuthContext);
    const router = useRouter();

    const [error, setError] = useState<Error>();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    function onSubmit(values) {
        signup({ ...values, role: EUserRoles.INSTRUCTOR })
            .then(() => router.push("/app/dashboard"))
            .catch(setError);
    }

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Instructor Sign Up</title>
            </Head>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <SignUpStepper activeStep={1} />

            <InstructorSignUpForm
                onSubmit={onSubmit}
                loading={authLoading}
                success={!!accessToken}
                errorMessage={error?.message}
            />
        </Layout>
    );
};

export default InstructorSignUpPage;
