import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import {
    Typography,
    TextField,
    makeStyles,
    Card,
    Button,
    Divider,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import ChipInput from "../../components/ui/ChipInput";
import AsyncSelect from "../../components/ui/AsyncSelect";
import { fetchLocationInputOptions } from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EUserRoles } from "../../utils/types";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";
import InstructorSignUpForm from "../../components/forms/InstructorSignUpForm";

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
            <Typography variant="h4" component="h3" align="center" gutterBottom>
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
