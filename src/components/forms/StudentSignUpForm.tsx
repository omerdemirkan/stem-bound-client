import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import {
    passwordRegex,
    emailRegex,
    validStudentGradeLevels,
} from "../../utils/constants";
import AsyncSelect from "../util/AsyncSelect";
import {
    fetchSchoolInputOptions,
    getCurrentSchoolYear,
    reverseMap,
} from "../../utils/helpers";
import InfoIcon from "@material-ui/icons/Info";
import FormCard from "../../components/ui/FormCard";
import ChipInput from "../util/ChipInput";
import { ISignUpFormProps } from "./SignUpForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles({
    submitButton: {
        marginTop: "30px",
    },
});

const StudentSignUpForm: React.FC<ISignUpFormProps> = ({
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

    const currentSchoolYear = getCurrentSchoolYear();

    const handleSubmitButtonClicked = handleSubmit(function (values) {
        values.meta = {
            school: values.schoolId,
        };
        values.initialSchoolYear = currentSchoolYear;
        delete values.schoolId;
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
                <Controller
                    name="initialGradeLevel"
                    control={control}
                    rules={{ required: "Required" }}
                    render={(props) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="grade-level-label">
                                Grade Level{" "}
                                <em>({currentSchoolYear} School Year)</em>
                            </InputLabel>
                            <Select
                                labelId="grade-level-label"
                                id="grade-level"
                                label="Grade Level"
                                fullWidth
                                {...props}
                            >
                                {reverseMap(
                                    validStudentGradeLevels,
                                    (gradeLevel) => (
                                        <MenuItem value={gradeLevel}>
                                            {gradeLevel}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    )}
                />
                <TextField
                    inputRef={register({
                        required: "Required",
                    })}
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
                    inputRef={register}
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
                        <AsyncSelect
                            {...params}
                            fetchOptions={fetchSchoolInputOptions}
                            TextFieldProps={{
                                fullWidth: true,
                                label: "School",
                                placeholder: "e.g Reseda High School",
                                margin: "normal",
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
                    rules={{
                        validate: (values) =>
                            values.length > 0 ||
                            "At least one interest required",
                        required: false,
                    }}
                    defaultValue={[]}
                    render={(params) => (
                        <ChipInput
                            {...params}
                            TextFieldProps={{
                                fullWidth: true,
                                label: "Interests",
                                placeholder: "e.g Chemistry, Programming, etc.",
                                margin: "normal",
                                error: errors.interests,
                                helperText: errors.interests?.message,
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

export default StudentSignUpForm;
