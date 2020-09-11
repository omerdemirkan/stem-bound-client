import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import {
    Typography,
    TextField,
    makeStyles,
    Card,
    Button,
    Divider,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import ChipInput from "../../components/ui/ChipInput";
import AsyncSelect from "../../components/ui/AsyncSelect";
import { fetchLocationInputOptions } from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { EUserRoles } from "../../utils/types";

const useStyles = makeStyles({
    formCard: {
        width: "90%",
        maxWidth: "500px",
        margin: "5vh auto",
        padding: "30px",
    },
    submitButton: {
        marginTop: "30px",
    },
});

const InstructorSignUpPage: React.FC = () => {
    const { register, handleSubmit, errors, control } = useForm();
    const { signup, accessToken, authLoading } = useContext(AuthContext);
    const router = useRouter();
    const classes = useStyles();

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    function onSubmit(values) {
        signup({ ...values, role: EUserRoles.INSTRUCTOR })
            .then(() => router.push("/app/dashboard"))
            .catch(({ errorMessage }) => console.error(errorMessage));
    }

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Instructor Sign Up</title>
            </Head>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
                Sign Up
            </Typography>
            <SignUpStepper activeStep={1} />

            <Card className={classes.formCard}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Personal Details
                    </Typography>
                    <Typography paragraph color="textSecondary" gutterBottom>
                        Just a few basic details to set up and you'll be on your
                        way!
                    </Typography>
                    <Divider />
                    <TextField
                        inputRef={register({
                            required: "Required",
                        })}
                        name="firstName"
                        label="First Name"
                        error={errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={register({
                            required: "Required",
                        })}
                        name="lastName"
                        label="Last Name"
                        error={errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        inputRef={register({
                            required: "Required",
                            pattern: {
                                value: emailRegex,
                                message: "Invalid Email",
                            },
                        })}
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
                    <TextField
                        inputRef={register({
                            required: "Required",
                        })}
                        name="shortDescription"
                        label="Short Description"
                        placeholder="e.g 3'th year Computer Science Student at CSUN"
                        error={errors.firstName}
                        helperText={errors.firstName?.message}
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <TextField
                        inputRef={register}
                        name="longDescription"
                        label="Long Description (Optional)"
                        placeholder="Tell us about yourself!"
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <Controller
                        name="specialties"
                        control={control}
                        rules={{
                            validate: (values) =>
                                values.length > 0 ||
                                "At least one specialty required",
                        }}
                        defaultValue={[]}
                        render={(params) => (
                            <ChipInput
                                {...params}
                                TextFieldProps={{
                                    fullWidth: true,
                                    label: "Specialties",
                                    placeholder:
                                        "What's are your areas of expertise?",
                                    margin: "normal",
                                    error: errors.specialties,
                                    helperText: errors.specialties?.message,
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="zip"
                        control={control}
                        rules={{ required: "Required" }}
                        defaultValue=""
                        render={(params) => (
                            <AsyncSelect
                                {...params}
                                fetchOptions={fetchLocationInputOptions}
                                TextFieldProps={{
                                    fullWidth: true,
                                    label: "Location",
                                    placeholder: "e.g Northridge",
                                    margin: "normal",
                                    error: errors.zip,
                                    helperText: errors.zip?.message,
                                }}
                            />
                        )}
                    />

                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={authLoading || !!accessToken}
                        fullWidth
                    >
                        SUBMIT
                    </Button>
                </form>
            </Card>
        </Layout>
    );
};

export default InstructorSignUpPage;
