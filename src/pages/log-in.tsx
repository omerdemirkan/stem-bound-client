import Layout from "../components/ui/Layout";
import Head from "next/head";
import AuthContext from "../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/constants";
import { Button, TextField } from "@material-ui/core";
import { logIn } from "../utils/services";

const LogInPage: React.FC = () => {
    const router = useRouter();
    const { authLoading, accessToken, login } = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();

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
                <title>STEM-bound - Log In</title>
            </Head>
            <h1>Log In</h1>

            <form onSubmit={handleSubmit((data) => login(data as any))}>
                <TextField
                    name="email"
                    inputRef={register({ required: true, pattern: emailRegex })}
                    label="Email"
                    error={errors.email}
                    helperText={errors.email && "Invalid email"}
                />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    inputRef={register({
                        required: "Required",
                        pattern: passwordRegex,
                    })}
                    error={errors.password}
                    helperText={
                        errors.email &&
                        "a number, lowercase and capital letters required"
                    }
                />
                <Button type="submit">SUBMIT</Button>
            </form>

            <style jsx>{``}</style>
        </Layout>
    );
};

export default LogInPage;
