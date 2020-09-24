import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../../utils/constants";
import {
    Button,
    TextField,
    makeStyles,
    Typography,
    Divider,
    CardProps,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import FormCard from "../ui/FormCard";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

interface Props {
    onSubmit(values: any): void;
    errorMessage?: string;
    loading?: boolean;
    success?: boolean;
    CardProps?: CardProps;
}

const LogInForm: React.FC<Props> = ({
    onSubmit,
    errorMessage,
    loading,
    success,
    CardProps,
}) => {
    const { register, handleSubmit, errors } = useForm();

    const classes = useStyles();

    return (
        <FormCard {...CardProps}>
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
                {errorMessage ? (
                    <Typography
                        paragraph
                        gutterBottom
                        align="center"
                        color="error"
                    >
                        {errorMessage}
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
                    disabled={loading || success}
                >
                    SUBMIT
                </Button>
            </form>
        </FormCard>
    );
};

export default LogInForm;
