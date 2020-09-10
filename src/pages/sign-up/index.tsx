import Layout from "../../components/ui/Layout";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import InstructorSVG from "../../components/svg/illustrations/instructor";
import StudentSVG from "../../components/svg/illustrations/student";
import SchoolSVG from "../../components/svg/illustrations/school";
import Link from "next/link";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
    Card,
    CardActionArea,
    Typography,
    Grid,
    makeStyles,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        height: "100%",
    },
    cardActionArea: {
        height: "100%",
        padding: "40px 0 60px",
    },
});

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const { accessToken } = useContext(AuthContext);

    const classes = useStyles();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Sign Up</title>
            </Head>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
                Sign Up
            </Typography>

            <SignUpStepper activeStep={0} />
            <Grid
                container
                direction="row"
                alignContent="center"
                alignItems="stretch"
                wrap="wrap"
                spacing={3}
                style={{
                    width: "90%",
                    maxWidth: "1300px",
                    margin: "auto",
                    textAlign: "center",
                }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Link href="/sign-up/instructor">
                        <a>
                            <Card className={classes.card}>
                                <CardActionArea
                                    className={classes.cardActionArea}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        I'm an Instructor
                                    </Typography>
                                    <InstructorSVG />
                                </CardActionArea>
                            </Card>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Link href="/sign-up/school-official">
                        <a>
                            <Card className={classes.card}>
                                <CardActionArea
                                    className={classes.cardActionArea}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        gutterBottom
                                    >
                                        I'm a School Official
                                    </Typography>
                                    <SchoolSVG />
                                </CardActionArea>
                            </Card>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Link href="/sign-up/student">
                        <a>
                            <Card className={classes.card}>
                                <CardActionArea
                                    className={classes.cardActionArea}
                                >
                                    <Typography variant="h5" component="h2">
                                        I'm a Student
                                    </Typography>
                                    <StudentSVG />
                                </CardActionArea>
                            </Card>
                        </a>
                    </Link>
                </Grid>
            </Grid>
            <style jsx>{`
                .image-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </Layout>
    );
};

export default SignUpPage;

interface SignUpStepperProps {
    activeStep: number;
}

export const SignUpStepper: React.FC<SignUpStepperProps> = ({ activeStep }) => {
    return (
        <Stepper
            activeStep={activeStep}
            style={{
                width: "90%",
                maxWidth: "1300px",
                margin: "auto",
                textAlign: "center",
            }}
        >
            <Step>
                <StepLabel>Choose User Type</StepLabel>
            </Step>
            <Step>
                <StepLabel>Personal Information</StepLabel>
            </Step>
            <Step>
                <StepLabel>Add Profile Picture</StepLabel>
            </Step>
        </Stepper>
    );
};
