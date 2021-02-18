import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import ChipInput from "../util/ChipInput";
import AsyncSelect from "../util/AsyncSelect";
import { fetchLocationInputOptions } from "../../utils/helpers";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";
import { ISignUpFormProps } from "./SignUpForm";
import HidableTextField from "../util/HidableTextField";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const InstructorSignUpForm: React.FC<ISignUpFormProps> = ({
    onSubmit,
    loading,
    success,
    errorMessage,
    withoutCard,
}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const classes = useStyles();

    const ModifiedFormCard = withoutCard
        ? ({ children }) => <div>{children}</div>
        : FormCard;

    return (
        <ModifiedFormCard
            header="Personal Details"
            Icon={InfoIcon}
            subheader="Just a few basic details to set up and you'll be on your way!"
            headerEl={
                errorMessage ? (
                    <Typography
                        paragraph
                        gutterBottom
                        align="center"
                        color="error"
                    >
                        {errorMessage}
                    </Typography>
                ) : undefined
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputRef={register({
                        required: "Required",
                    })}
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
                    })}
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
                                required: true,
                            }}
                        />
                    )}
                />
                <TextField
                    inputRef={register({
                        required: "Required",
                    })}
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
                                required: true,
                            }}
                        />
                    )}
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
        </ModifiedFormCard>
    );
};

export default InstructorSignUpForm;
