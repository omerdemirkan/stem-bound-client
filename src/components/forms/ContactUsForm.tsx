import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { IContactData } from "../../utils/types";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "20px",
    },
});

export interface IContactUsFormProps {
    onSubmit(contact: IContactData): any;
}

const ContactUsForm: React.FC<IContactUsFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, errors } = useForm();
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                inputRef={register({
                    required: "Required",
                })}
                required
                name="firstName"
                label="First Name"
                margin="normal"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                autoFocus
            />

            <TextField
                inputRef={register({
                    required: "Required",
                })}
                required
                name="lastName"
                label="Last Name"
                margin="normal"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
            />

            <TextField
                inputRef={register({
                    required: "Required",
                })}
                required
                name="email"
                label="Email"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                inputRef={register({
                    required: "Required",
                })}
                required
                name="message"
                label="Message"
                margin="normal"
                error={!!errors.message}
                helperText={errors.message?.message}
                variant="outlined"
                fullWidth
                multiline
                rows={6}
            />
            <br />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                className={classes.submitButton}
            >
                Submit
            </Button>
        </form>
    );
};

export default ContactUsForm;
