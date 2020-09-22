import Layout from "../components/ui/Layout";
import Head from "next/head";
import AuthContext from "../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/constants";
import {
    Button,
    TextField,
    makeStyles,
    Typography,
    Divider,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import FormCard from "../components/ui/FormCard";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const LogInPage: React.FC = () => {
    const router = useRouter();
    const { authLoading, accessToken, login } = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState<Error>();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    const classes = useStyles();

    function onSubmit(values) {
        login(values)
            .then(() => router.push("/app/dashboard"))
            .catch(({ error }) => setError(error));
    }

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Log In</title>
            </Head>

            <FormCard style={{ margin: "15vh auto" }}>
                <Typography
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    <LockIcon style={{ marginRight: "20px" }} color="primary" />
                    Log In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error ? (
                        <Typography
                            paragraph
                            gutterBottom
                            align="center"
                            color="error"
                        >
                            {error.message}
                        </Typography>
                    ) : null}
                    <Divider />
                    <TextField
                        name="email"
                        inputRef={register({
                            required: "Required",
                            pattern: {
                                value: emailRegex,
                                message: "Invalid email",
                            },
                        })}
                        autoFocus
                        label="Email"
                        error={errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        inputRef={register({
                            required: "Required",
                            pattern: {
                                value: passwordRegex,
                                message:
                                    "A number, lowercase and capital letters required",
                            },
                        })}
                        error={errors.password}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        className={classes.submitButton}
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        disabled={authLoading || !!accessToken}
                    >
                        SUBMIT
                    </Button>
                </form>
            </FormCard>

            <style jsx>{``}</style>
        </Layout>
    );
};

export default LogInPage;
