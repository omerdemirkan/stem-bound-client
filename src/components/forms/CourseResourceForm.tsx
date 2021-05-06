import { useForm } from "react-hook-form";
import { ICourseResourceOriginal } from "../../utils/types";
import TextField from "@material-ui/core/TextField";
import { urlRegex } from "../../utils/constants";
import Center from "../ui/Center";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export interface ICourseResourceFormProps {
    onSubmit(resources: ICourseResourceOriginal): any;
    initialValues?: Partial<ICourseResourceOriginal>;
}

const CourseResourceForm: React.FC<ICourseResourceFormProps> = ({
    onSubmit,
    initialValues,
}) => {
    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: initialValues,
    });

    return (
        <form
            onSubmit={handleSubmit(function (values: ICourseResourceOriginal) {
                onSubmit(values);
                reset();
            })}
        >
            <TextField
                inputRef={register({
                    required: "Resource name is required",
                    minLength: 2,
                })}
                required
                name="label"
                label="Resource Name"
                margin="normal"
                fullWidth
                error={!!errors.label}
                helperText={errors.label?.message}
                inputProps={{
                    maxLength: 100,
                }}
                autoFocus
            />
            <TextField
                inputRef={register({
                    required: "URL is required",
                    pattern: { value: urlRegex, message: "Invalid URL" },
                })}
                required
                name="url"
                label="URL"
                margin="normal"
                fullWidth
                error={!!errors.url}
                helperText={errors.url?.message}
                inputProps={{
                    maxLength: 1000,
                }}
            />
            <TextField
                inputRef={register({
                    minLength: 2,
                })}
                name="description"
                label="Description"
                margin="normal"
                multiline
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
                inputProps={{
                    maxLength: 1000,
                }}
            />
            <Center>
                <IconButton type="submit">
                    <AddIcon />
                </IconButton>
            </Center>
        </form>
    );
};

export default CourseResourceForm;
