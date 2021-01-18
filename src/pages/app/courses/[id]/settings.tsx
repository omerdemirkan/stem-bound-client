import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import Typography from "@material-ui/core/Typography";
import { courseFetcher, updateCourseById } from "../../../../utils/services";
import { EUserRoles, ICourseOriginal } from "../../../../utils/types";
import { useRouter } from "next/router";
import Section from "../../../../components/ui/Section";
import InputButton from "../../../../components/ui/InputButton";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SplitScreen from "../../../../components/ui/SplitScreen";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";

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
    const { user } = useContext(AuthContext);

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
            <SplitScreen
                mainEl={
                    <>
                        <Section
                            title="Title"
                            noDivider
                            spacing="sm"
                            paddingTop="0"
                            action={
                                <InputButton
                                    initialValue={course?.title}
                                    renderInput={(value, setValue) => (
                                        <TextField
                                            value={value}
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    )}
                                    onSubmit={(title) =>
                                        handleCourseUpdate({ title })
                                    }
                                    ButtonProps={{
                                        color: "primary",
                                        size: "small",
                                        className: classes.editButton,
                                    }}
                                >
                                    Edit Title
                                </InputButton>
                            }
                        >
                            <Typography variant="h5">
                                {course?.title}
                            </Typography>
                        </Section>
                        <Section
                            title="Short description"
                            spacing="sm"
                            action={
                                <InputButton
                                    initialValue={course?.shortDescription}
                                    renderInput={(value, setValue) => (
                                        <TextField
                                            value={value}
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                            fullWidth
                                            multiline
                                        />
                                    )}
                                    onSubmit={(shortDescription) =>
                                        handleCourseUpdate({ shortDescription })
                                    }
                                    ButtonProps={{
                                        color: "primary",
                                        size: "small",
                                        className: classes.editButton,
                                    }}
                                >
                                    Edit Short Description
                                </InputButton>
                            }
                        >
                            <Typography paragraph>
                                {course?.shortDescription}
                            </Typography>
                        </Section>
                    </>
                }
                secondaryEl={<></>}
            />
        </AppLayout>
    );
};

export default withAuth(CourseSettingsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
