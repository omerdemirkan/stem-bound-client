import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex, urlRegex } from "../../utils/constants";
import ChipInput from "../util/ChipInput";
import { ISignUpFormProps } from "./SignUpForm";
import HidableTextField from "../util/HidableTextField";
import LocationAsyncSelect from "../util/LocationAsyncSelect";
import { deleteEmptyStrings } from "../../utils/helpers";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const InstructorSignUpForm: React.FC<ISignUpFormProps> = ({
    onSubmit,
    loading,
    success,
}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const classes = useStyles();

    function handleSubmitClicked(values) {
        deleteEmptyStrings(values);
        onSubmit(values);
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitClicked)}>
            <TextField
                inputRef={register({
                    required: "Required",
                    minLength: { value: 2, message: "Too short!" },
                })}
                inputProps={{ maxLength: 20 }}
                required
                name="firstName"
                label="First Name"
                error={errors.firstName}
                helperText={errors.firstName?.message}
                margin="normal"
                fullWidth
                autoFocus
            />
            <TextField
                inputRef={register({
                    required: "Required",
                    minLength: { value: 2, message: "Too short!" },
                })}
                inputProps={{ maxLength: 20 }}
                required
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
                required
                label="Email"
                error={errors.email}
                helperText={errors.email?.message}
                fullWidth
                margin="normal"
            />
            <HidableTextField
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
                required
                error={errors.password}
                helperText={errors.email}
                fullWidth
                margin="normal"
            />
            <Controller
                name="zip"
                control={control}
                rules={{ required: "Required" }}
                defaultValue=""
                render={(params) => (
                    <LocationAsyncSelect
                        {...params}
                        onChange={(location) => params.onChange(location?.zip)}
                        TextFieldProps={{
                            error: errors.zip,
                            helperText: errors.zip?.message,
                            required: true,
                        }}
                    />
                )}
            />
            <TextField
                inputRef={register({
                    required: "Required",
                    minLength: { value: 4, message: "Too short!" },
                })}
                inputProps={{ maxLength: 60 }}
                required
                name="shortDescription"
                label="Short Description"
                placeholder="e.g 3'th year Computer Science Student at CSUN"
                error={errors.shortDescription}
                helperText={errors.shortDescription?.message}
                margin="normal"
                fullWidth
                multiline
            />
            <TextField
                inputRef={register({
                    minLength: { value: 4, message: "Too short!" },
                })}
                inputProps={{ maxLength: 2000 }}
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
                        values.length > 0 || "At least one specialty required",
                }}
                defaultValue={[]}
                render={(params) => (
                    <ChipInput
                        {...params}
                        TextFieldProps={{
                            fullWidth: true,
                            label: "Specialties",
                            placeholder: "What's are your areas of expertise?",
                            margin: "normal",
                            error: errors.specialties,
                            helperText: errors.specialties?.message,
                            required: true,
                            inputProps: { maxLength: 50 },
                        }}
                        max={10}
                        validate={(str) =>
                            str.length <= 3 ? "Too short!" : true
                        }
                    />
                )}
            />
            <TextField
                name="remoteResumeUrl"
                inputRef={register({
                    pattern: {
                        value: urlRegex,
                        message: "Invalid Url",
                    },
                })}
                label="Resume Url (Optional)"
                error={errors.remoteResumeUrl}
                helperText={
                    errors.remoteResumeUrl?.message ||
                    "You may alternatively upload a resume once you've signed up"
                }
                fullWidth
                margin="normal"
                placeholder="A Link to where your resume can be accessed"
            />

            <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading || success}
                fullWidth
            >
                SUBMIT
            </Button>
        </form>
    );
};

export default InstructorSignUpForm;
