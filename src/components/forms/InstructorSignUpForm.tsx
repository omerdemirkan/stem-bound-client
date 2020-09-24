import {
    Typography,
    TextField,
    makeStyles,
    Button,
    Divider,
    CardProps,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import ChipInput from "../../components/ui/ChipInput";
import AsyncSelect from "../../components/ui/AsyncSelect";
import { fetchLocationInputOptions } from "../../utils/helpers";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";

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

const InstructorSignUpForm: React.FC<Props> = ({
    onSubmit,
    loading,
    success,
    errorMessage,
}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const classes = useStyles();

    return (
        <FormCard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" align="center" gutterBottom>
                    <InfoIcon style={{ marginRight: "20px" }} color="primary" />
                    Personal Details
                </Typography>
                <Typography paragraph color="textSecondary" gutterBottom>
                    Just a few basic details to set up and you'll be on your
                    way!
                </Typography>
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
                    required
                    error={errors.password}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
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
        </FormCard>
    );
};

export default InstructorSignUpForm;
