import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import { deleteEmptyStrings } from "../../utils/helpers";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";
import { ISignUpFormProps } from "./SignUpForm";
import HidableTextField from "../util/HidableTextField";
import SchoolInput from "../util/SchoolInput";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const SchoolOfficialSignUpForm: React.FC<ISignUpFormProps> = ({
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

    const handleSubmitButtonClicked = handleSubmit(function (values) {
        values.meta = {
            school: values.schoolId,
        };
        delete values.schoolId;
        deleteEmptyStrings(values);
        onSubmit(values);
    });

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
            <form onSubmit={handleSubmitButtonClicked}>
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
                <TextField
                    inputRef={register({
                        required: "Required",
                        minLength: { value: 4, message: "Too short!" },
                    })}
                    inputProps={{ maxLength: 60 }}
                    required
                    name="shortDescription"
                    label="Short Description"
                    placeholder="e.g Vice Principal at Magnolia Science Academy"
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
                    placeholder="Tell us about yourself, your school, or what you hope to find here!"
                    margin="normal"
                    fullWidth
                    multiline
                />
                <TextField
                    inputRef={register({
                        required: "Required",
                        minLength: { value: 2, message: "Too short!" },
                    })}
                    inputProps={{ maxLength: 100 }}
                    required
                    name="position"
                    label="Position/Job Description"
                    placeholder="e.g Guidance Counselor"
                    error={errors.position}
                    helperText={errors.position?.message}
                    margin="normal"
                    fullWidth
                    multiline
                />
                <Controller
                    name="schoolId"
                    control={control}
                    rules={{ required: "Required" }}
                    defaultValue=""
                    render={(params) => (
                        <SchoolInput
                            {...params}
                            TextFieldProps={{
                                error: errors.schoolId,
                                helperText: errors.schoolId?.message,
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

export default SchoolOfficialSignUpForm;
