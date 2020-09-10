import Layout from "../../components/ui/Layout";
import Head from "next/head";
import { SignUpStepper } from ".";
import {
    Typography,
    TextField,
    makeStyles,
    Card,
    Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import ChipInput from "../../components/ui/ChipInput";

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
    const { register, handleSubmit, errors } = useForm();

    const classes = useStyles();

    function onSubmit() {}

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
                    <TextField
                        inputRef={register({
                            required: true,
                        })}
                        name="firstName"
                        label="First Name"
                        error={errors.firstName}
                        helperText={errors.firstName && "Required"}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        inputRef={register({
                            required: true,
                        })}
                        name="lastName"
                        label="Last Name"
                        error={errors.firstName}
                        helperText={errors.firstName && "Required"}
                        fullWidth
                        margin="normal"
                    />
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
                    <TextField
                        inputRef={register({
                            required: true,
                        })}
                        name="shortDescription"
                        label="Short Description"
                        placeholder="e.g Software Engineer at AT&T"
                        error={errors.firstName}
                        helperText={errors.firstName && "Required"}
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <TextField
                        inputRef={register}
                        name="longDescription"
                        label="Long Description (Optional)"
                        placeholder="Tell us about yourself!"
                        error={errors.firstName}
                        helperText={errors.firstName && "Required"}
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <TextField
                        inputRef={register}
                        name="specialties"
                        label="Speciaties"
                        placeholder="What's are your areas of expertise?"
                        error={errors.firstName}
                        helperText={errors.firstName && "Required"}
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <ChipInput
                        TextFieldProps={{
                            fullWidth: true,
                            label: "Specialties",
                            placeholder: "What's are your areas of expertise?",
                            margin: "normal",
                        }}
                        ref={register}
                    />
                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        type="submit"
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
