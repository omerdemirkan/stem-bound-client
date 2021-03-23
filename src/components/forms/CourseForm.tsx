import { ECourseTypes } from "../../utils/types";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { CardProps } from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormCard from "../ui/FormCard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import {
    deleteEmptyStrings,
    fetchSchoolInputOptions,
} from "../../utils/helpers";
import AsyncSelect from "../util/AsyncSelect";
import Alert from "@material-ui/lab/Alert";
import { DatePicker } from "@material-ui/pickers";

export interface ICourseFormProps {
    onSubmit(values: any): void;
    userId: string;
    CardProps?: CardProps;
    withoutCard?: boolean;
}

const CourseForm: React.FC<ICourseFormProps> = ({
    onSubmit,
    userId,
    withoutCard,
    CardProps,
}) => {
    const { register, handleSubmit, errors, control, getValues } = useForm();

    function onSubmitClicked(values) {
        values.meta = {
            instructors: [userId],
            school: values.schoolId,
        };
        delete values.schoolId;
        deleteEmptyStrings(values);
        onSubmit(values);
    }

    const ModifiedFormCard = withoutCard
        ? ({ children }) => <div>{children}</div>
        : FormCard;

    return (
        <ModifiedFormCard
            {...CardProps}
            header="Create A New Course"
            Icon={LibraryBooksIcon}
            headerEl={
                <Alert severity="info">
                    By clicking submit, you create a course private to you. You
                    may update details, schedule course meetings, and invite
                    other instructors before publishing it to school officials
                    for verification. We highly encourage getting in touch with
                    a school official at the school you intend on teaching a
                    course beforehand.
                </Alert>
            }
        >
            <form onSubmit={handleSubmit(onSubmitClicked)}>
                <TextField
                    inputRef={register({
                        required: "Required",
                        minLength: { value: 4, message: "Too short!" },
                    })}
                    required
                    name="title"
                    label="Course Title"
                    placeholder="e.g Introduction to Programming"
                    margin="normal"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                <TextField
                    inputRef={register({
                        required: "Required",
                        minLength: { value: 4, message: "Too short!" },
                    })}
                    required
                    name="shortDescription"
                    label="Short Description"
                    placeholder="Short but sweet description"
                    margin="normal"
                    fullWidth
                    error={!!errors.shortDescription}
                    helperText={errors.shortDescription?.message}
                    inputProps={{
                        maxLength: 100,
                    }}
                />
                <TextField
                    inputRef={register({
                        minLength: { value: 4, message: "Too short!" },
                    })}
                    name="longDescription"
                    label="Long Description"
                    placeholder="In depth description (you can add this later)"
                    margin="normal"
                    fullWidth
                    error={!!errors.longDescription}
                    helperText={errors.longDescription?.message}
                    inputProps={{
                        maxLength: 2000,
                    }}
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
                                placeholder: "e.g Magnolia Science Academy",
                                margin: "normal",
                                error: errors.schoolId,
                                helperText: errors.schoolId?.message,
                                required: true,
                            }}
                        />
                    )}
                />

                <Controller
                    name="start"
                    control={control}
                    rules={{
                        required: "Required",
                    }}
                    render={(params) => (
                        <DatePicker
                            {...params}
                            minDate={new Date()}
                            fullWidth
                            margin="normal"
                            label="Start Date"
                            style={{ width: "50%" }}
                        />
                    )}
                />

                <Controller
                    name="end"
                    control={control}
                    rules={{
                        required: "Required",
                        validate: (value) =>
                            new Date(value) > new Date(getValues().start)
                                ? true
                                : "Invalid time period",
                    }}
                    render={(params) => (
                        <DatePicker
                            {...params}
                            minDate={new Date()}
                            fullWidth
                            margin="normal"
                            label="End Date"
                            style={{ width: "50%" }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{
                        validate: (value) =>
                            value === "default" ? "Required" : true,
                    }}
                    name="type"
                    defaultValue="default"
                    render={(params) => (
                        <Select
                            style={{ margin: "25px 0" }}
                            displayEmpty
                            fullWidth
                            error={!!errors.type}
                            {...params}
                        >
                            <MenuItem value="default" disabled>
                                Select Course Type
                            </MenuItem>
                            <MenuItem value={ECourseTypes.IN_PERSON}>
                                In Person
                            </MenuItem>
                            <MenuItem value={ECourseTypes.REMOTE}>
                                Remote
                            </MenuItem>
                            <MenuItem value={ECourseTypes.HYBRID}>
                                Hybrid
                            </MenuItem>
                        </Select>
                    )}
                />

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={{ marginTop: "20px" }}
                >
                    Submit
                </Button>
            </form>
        </ModifiedFormCard>
    );
};

export default CourseForm;
