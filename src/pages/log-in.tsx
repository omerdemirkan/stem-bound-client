import Layout from "../components/Layout";
import Head from "next/head";
import Input from "../components/Input";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { logInAsync } from "../store/auth";

const LogIn: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Log In</title>
            </Head>
            <h1>Log In</h1>

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values: { email: string; password: string }) => {
                    dispatch(
                        logInAsync({
                            email: values.email,
                            password: values.password,
                        })
                    );
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <Input
                            label="Password"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
};

export default LogIn;
