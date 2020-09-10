import Layout from "../components/ui/Layout";
import Head from "next/head";
import AuthContext from "../components/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/constants";
import {
    Button,
    TextField,
    Card,
    makeStyles,
    Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles({
    formCard: {
        width: "90%",
        maxWidth: "500px",
        margin: "15vh auto",
        padding: "30px",
    },
    submitButton: {
        marginTop: "30px",
    },
});

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

    const classes = useStyles();

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Log In</title>
            </Head>

            <Card className={classes.formCard}>
                <form onSubmit={handleSubmit((data) => login(data as any))}>
                    <LockIcon style={{ margin: "0 20px" }} />
                    <Typography variant="h4" align="center" color="textPrimary">
                        Log In
                    </Typography>
                    <TextField
                        name="email"
                        inputRef={register({
                            required: true,
                            pattern: emailRegex,
                        })}
                        label="Email"
                        error={errors.email}
                        helperText={errors.email && "Invalid email"}
                        fullWidth
                        margin="normal"
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
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        className={classes.submitButton}
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        disabled={authLoading}
                    >
                        SUBMIT
                    </Button>
                </form>
            </Card>

            <style jsx>{``}</style>
        </Layout>
    );
};

export default LogInPage;
