import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import { courseFetcher, updateCourseById } from "../../../../utils/services";
import {
    ECourseVerificationStatus,
    EUserRoles,
    ICourseOriginal,
} from "../../../../utils/types";
import { useRouter } from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SplitScreen from "../../../../components/ui/SplitScreen";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";
import EditableSection from "../../../../components/ui/EditableSection";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import AlertTitle from "@material-ui/lab/AlertTitle";

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
                        <EditableSection
                            title="Title"
                            noDivider
                            spacing="sm"
                            paddingTop="0"
                            onEdit={(title) => handleCourseUpdate({ title })}
                            value={course?.title}
                            TypographyProps={{ variant: "h5" }}
                        />
                        <EditableSection
                            title="Short Description"
                            spacing="sm"
                            onEdit={(shortDescription) =>
                                handleCourseUpdate({ shortDescription })
                            }
                            value={course?.shortDescription}
                            TextFieldProps={{ multiline: true }}
                        />
                        <EditableSection
                            title="Long Description"
                            spacing="sm"
                            onEdit={(longDescription) =>
                                handleCourseUpdate({ longDescription })
                            }
                            value={course?.longDescription}
                            TextFieldProps={{ multiline: true }}
                            buttonText="Edit long description"
                        />
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
