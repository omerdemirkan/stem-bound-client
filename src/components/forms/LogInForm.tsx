import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../../utils/constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { CardProps } from "@material-ui/core/Card";
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
    withoutCard?: boolean;
}

const LogInForm: React.FC<Props> = ({
    onSubmit,
    errorMessage,
    loading,
    success,
    CardProps,
    withoutCard,
}) => {
    const { register, handleSubmit, errors } = useForm();

    const classes = useStyles();

    const ModifiedFormCard = withoutCard
        ? ({ children }) => <div>{children}</div>
        : FormCard;

    return (
        <ModifiedFormCard
            {...CardProps}
            header="Log In"
            iconEl={
                <LockIcon style={{ marginRight: "20px" }} color="primary" />
            }
        >
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
        </ModifiedFormCard>
    );
};

export default LogInForm;
