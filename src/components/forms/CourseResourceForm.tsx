import { useForm } from "react-hook-form";
import { ICourseResource } from "../../utils/types";
import TextField from "@material-ui/core/TextField";
import { urlRegex } from "../../utils/constants";
import { Button } from "@material-ui/core";

export interface ICourseResourceFormProps {
    onSubmit(resources: ICourseResource): any;
    initialValues?: Partial<ICourseResource>;
}

const CourseResourceForm: React.FC<ICourseResourceFormProps> = ({
    onSubmit,
    initialValues,
}) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: initialValues,
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                required
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
            <Button fullWidth color="primary" variant="contained">
                Submit
            </Button>
        </form>
    );
};

export default CourseResourceForm;
