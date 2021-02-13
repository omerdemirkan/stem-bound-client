import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import AuthContext from "../components/contexts/AuthContext";
import { useEffect, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { EUserRoles, IUserOriginal } from "../utils/types";
import UserRoleInput from "../components/util/UserRoleInput";
import HidableDiv from "../components/ui/HidableDiv";
import SignUpForm from "../components/forms/SignUpForm";
import useQueryState from "../hooks/useQueryState";
import Section from "../components/ui/Section";
import Button from "@material-ui/core/Button";
import Center from "../components/ui/Center";

const useStyles = makeStyles({
    stepper: {
        width: "90%",
        maxWidth: "1000px",
        margin: "auto",
        textAlign: "center",
    },
});

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useQueryState<EUserRoles>("role");
    const [error, setError] = useState<Error>();
    const [step, setStep] = useState<number>(0);
    const { accessToken, signUp, sendVerificationEmail } = useContext(
        AuthContext
    );
    const requestBodyRef = useRef<Partial<IUserOriginal>>();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    useEffect(
        function () {
            if (
                router?.query.sign_up_token &&
                typeof router.query.sign_up_token === "string"
            ) {
                handleSignUp(router?.query.sign_up_token);
                setStep(3);
            }
        },
        [router.query.sign_up_token]
    );

    useEffect(
        function () {
            if (userRole && step === 0) setStep(1);
        },
        [userRole]
    );

    async function handleSendVerificationEmail(values: Partial<IUserOriginal>) {
        requestBodyRef.current = { ...values, role: userRole };
        await handleResendVerificationEmail();
    }

    async function handleResendVerificationEmail() {
        try {
            await sendVerificationEmail(requestBodyRef.current);
            setStep(2);
        } catch (e) {
            setError(e);
        }
    }

    async function handleSignUp(signUpToken: string) {
        try {
            await signUp(signUpToken);
            router.push("/app/my-account");
        } catch (e) {
            setError(e);
        }
    }

    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Sign Up</title>
            </Head>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
                Sign Up
            </Typography>

            <SignUpStepper activeStep={step} />
            <Section spacing="xl" errorMessage={error?.message}>
                <HidableDiv visible={step === 0}>
                    <UserRoleInput
                        onChange={function (userRole) {
                            setUserRole(userRole);
                            setStep(1);
                        }}
                    />
                </HidableDiv>
                <HidableDiv visible={step === 1}>
                    <SignUpForm
                        userRole={userRole}
                        onSubmit={handleSendVerificationEmail}
                    />
                </HidableDiv>
                <HidableDiv visible={step === 2}>
                    <Typography variant="h5" align="center">
                        An email is being sent to{" "}
                        {requestBodyRef.current?.email}.
                    </Typography>
                    <Typography paragraph align="center">
                        If you don't find an email from us in your inbox, check
                        your spam and junk mail folders. You're almost there!
                    </Typography>
                    <Center>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleResendVerificationEmail}
                        >
                            Resend Email
                        </Button>
                    </Center>
                </HidableDiv>
            </Section>
        </StaticLayout>
    );
};

export default SignUpPage;

interface ISignUpStepperProps {
    activeStep: number;
}

export const SignUpStepper: React.FC<ISignUpStepperProps> = ({
    activeStep,
}) => {
    const classes = useStyles();
    return (
        <Stepper activeStep={activeStep} className={classes.stepper}>
            <Step>
                <StepLabel>Choose User Type</StepLabel>
            </Step>
            <Step>
                <StepLabel>Personal Information</StepLabel>
            </Step>
            <Step>
                <StepLabel>Verify Email</StepLabel>
            </Step>
        </Stepper>
    );
};
