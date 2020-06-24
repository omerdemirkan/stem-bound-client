import Layout from "../components/Layout";
import Head from "next/head";
import Input from "../components/Input";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { logInAsync } from "../store/auth";

const LogIn: React.FC = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values: { email: string; password: string }) => {
            dispatch(
                logInAsync({
                    email: values.email,
                    password: values.password,
                })
            );
        },
    });
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Log In</title>
            </Head>
            <h1>Log In</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    label="Email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Input
                    label="Password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
};

export default LogIn;
