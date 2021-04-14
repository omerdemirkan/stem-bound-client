import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { passwordRegex, emailRegex } from "../../utils/constants";
import { deleteEmptyStrings, getCurrentSchoolYear } from "../../utils/helpers";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";
import ChipInput from "../util/ChipInput";
import { ISignUpFormProps } from "./SignUpForm";
import { makeStyles } from "@material-ui/core";
import GradeLevelInput from "../util/GradeLevelInput";
import HidableTextField from "../util/HidableTextField";
import SchoolInput from "../util/SchoolInput";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const StudentSignUpForm: React.FC<ISignUpFormProps> = ({
    onSubmit,
    loading,
    success,
}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const classes = useStyles();

    const currentSchoolYear = getCurrentSchoolYear();

    const handleSubmitButtonClicked = handleSubmit(function (values) {
        values.meta = {
            school: values.schoolId,
        };
        values.initialSchoolYear = currentSchoolYear;
        delete values.schoolId;
        deleteEmptyStrings(values);
        onSubmit(values);
    });

    return (
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
            <Controller
                name="initialGradeLevel"
                control={control}
                rules={{ required: "Required" }}
                required
                render={(props) => <GradeLevelInput {...props} />}
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
                placeholder="e.g A sophomore at Reseda High School"
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
            <Controller
                name="interests"
                control={control}
                defaultValue={[]}
                render={(params) => (
                    <ChipInput
                        {...params}
                        TextFieldProps={{
                            fullWidth: true,
                            label: "Interests (Optional)",
                            placeholder: "e.g Chemistry, Programming, etc.",
                            margin: "normal",
                            error: errors.interests,
                            helperText: errors.interests?.message,
                            inputProps: { maxLength: 50 },
                        }}
                        max={50}
                        validate={(str) =>
                            str.length <= 3 ? "Too short!" : true
                        }
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
    );
};

export default StudentSignUpForm;
