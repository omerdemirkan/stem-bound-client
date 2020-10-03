import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import Typography from "@material-ui/core/Typography";

const StudentSignUpPage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>STEM-bound - Student Sign Up</title>
            </Head>
            <Typography variant="h3" component="h1" align="center">
                Sign Up
            </Typography>
            <SignUpStepper activeStep={1} />
        </Layout>
    );
};

export default StudentSignUpPage;
