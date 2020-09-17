import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import { EUserRoles, EStateStatus, ECourseTypes } from "../../../utils/types";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../../../utils/services";
import AuthContext from "../../../components/contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Divider,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import FormCard from "../../../components/ui/FormCard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import {
    deleteEmptyStrings,
    fetchSchoolInputOptions,
} from "../../../utils/helpers";
import AsyncSelect from "../../../components/ui/AsyncSelect";

const CreateCourseAppPage: React.FC = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState<EStateStatus>(EStateStatus.idle);
    const { register, handleSubmit, errors, control } = useForm();

    function onSubmit(values) {
        values.meta = {
            instructors: [user._id],
            school: values.schoolId,
        };

        delete values.schoolId;

        deleteEmptyStrings(values);

        createCourse(values)
            .then(function (res) {
                setStatus(EStateStatus.successful);
                router.push("/app/courses");
            })
            .catch(function (err) {
                setStatus(EStateStatus.failed);
            });
    }

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                { label: "New Course" },
            ]}
        >
            <Head>
                <title>STEM-bound - Create Course</title>
            </Head>
            {status === EStateStatus.loading ? <h3>Loading...</h3> : null}
            <FormCard>
                <Typography variant="h5" align="center" gutterBottom>
                    <LibraryBooksIcon
                        color="primary"
                        style={{
                            marginRight: "20px",
                            position: "relative",
                            top: "4px",
                        }}
                    />
                    Create A New Course
                </Typography>

                <Divider />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={register({
                            required: "Required",
                        })}
                        required
                        name="title"
                        label="Course Title"
                        placeholder="e.g Introduction to Programming"
                        margin="normal"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        inputRef={register({
                            required: "Required",
                        })}
                        required
                        name="shortDescription"
                        label="Short Description"
                        placeholder="Short but sweet description"
                        margin="normal"
                        fullWidth
                        error={!!errors.shortDescription}
                        helperText={errors.shortDescription?.message}
                    />
                    <TextField
                        inputRef={register}
                        name="longDescription"
                        label="Long Description"
                        placeholder="In depth description (you can add this later)"
                        margin="normal"
                        fullWidth
                        error={!!errors.longDescription}
                        helperText={errors.longDescription?.message}
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
                                inputProps={{ "aria-label": "Without label" }}
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
            </FormCard>
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
