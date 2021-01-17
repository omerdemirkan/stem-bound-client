import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import AuthContext from "../../../../components/contexts/AuthContext";
import withAuth from "../../../../components/hoc/withAuth";
import ActionBar from "../../../../components/ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { courseFetcher, updateCourseById } from "../../../../utils/services";
import { EUserRoles, ICourseOriginal } from "../../../../utils/types";
import { useRouter } from "next/router";
import { useContext } from "react";
import Section from "../../../../components/ui/Section";
import InputButton from "../../../../components/ui/InputButton";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    avatar: {
        width: "100px",
        height: "100px",
    },
    editButton: {
        float: "right",
        margin: "0 10px",
    },
});

const CourseSettingsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;
    const { data: course, revalidate: refetchCourse } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    const classes = useStyles();

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
    }

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Settings" },
            ]}
        >
            <Section
                title="Course Title"
                noDivider
                action={
                    <InputButton
                        initialValue={course?.title}
                        renderInput={(value, setValue) => (
                            <TextField
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                fullWidth
                            />
                        )}
                        onSubmit={(title) => handleCourseUpdate({ title })}
                        ButtonProps={{
                            color: "primary",
                            size: "small",
                            className: classes.editButton,
                        }}
                    >
                        Edit Course Title
                    </InputButton>
                }
            >
                <Typography variant="h5">{course?.title}</Typography>
            </Section>
        </AppLayout>
    );
};

export default withAuth(CourseSettingsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
