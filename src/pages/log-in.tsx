import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { logInAsync } from "../store/auth";
import { logInFormData } from "../utils/constants";

const LogIn: React.FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);

    async function logInHandler(values: { email: string; password: string }) {
        dispatch(
            logInAsync({
                email: values.email,
                password: values.password,
            })
        );
    }

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Log In</title>
            </Head>
            <h1>Log In</h1>

            <Form
                inputs={logInFormData.inputs}
                isSubmitting={loading}
                initialValues={logInFormData.initialValues}
                onSubmit={logInHandler}
            />
        </Layout>
    );
};

export default LogIn;
