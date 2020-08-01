import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import AuthContext from "../components/contexts/AuthContext";
import useFormData from "../components/hooks/useFormData";
import { useDispatch } from "react-redux";
import { logInAsync } from "../store/auth";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { EForms, IFormData } from "../utils/types";

const LogInPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const formData: IFormData = useFormData(EForms.USER_LOG_IN);
    const { authLoading, accessToken } = useContext(AuthContext);

    async function logInHandler(values: { email: string; password: string }) {
        dispatch(
            logInAsync({
                email: values.email,
                password: values.password,
            })
        );
    }

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
                <title>Stem-bound - Log In</title>
            </Head>
            <h1>Log In</h1>

            <Form
                onSubmit={logInHandler}
                isSubmitting={authLoading}
                {...formData}
            />
            <style jsx>{``}</style>
        </Layout>
    );
};

export default LogInPage;
