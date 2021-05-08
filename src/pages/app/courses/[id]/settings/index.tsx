import useSWR from "swr";
import AppLayout, {
    IAppLayoutProps,
} from "../../../../../components/layouts/AppLayout";
import withAuth from "../../../../../components/hoc/withAuth";
import {
    courseFetcher,
    updateCourseById,
    updateCourseVerification,
} from "../../../../../utils/services";
import {
    ECourseVerificationStatus,
    ENotificationTypes,
    EUserRoles,
    ICourseOriginal,
} from "../../../../../utils/types";
import { useRouter } from "next/router";
import SplitScreen from "../../../../../components/ui/SplitScreen";
import EditableSection from "../../../../../components/ui/EditableSection";
import Section from "../../../../../components/ui/Section";
import Button from "@material-ui/core/Button";
import {
    configureCourseVerificationUpdateAlertDTO,
    getDisplayCourseVerificationStatus,
    getLongDate,
} from "../../../../../utils/helpers";
import Chip from "@material-ui/core/Chip";
import { useContext } from "react";
import AuthContext from "../../../../../components/contexts/AuthContext";
import NotificationContext from "../../../../../components/contexts/NotificationContext";
import Head from "next/head";
import useSchool from "../../../../../hooks/useSchool";
import Typography from "@material-ui/core/Typography";
import { DatePicker } from "@material-ui/pickers";
import addDays from "date-fns/addDays";
import CopyToClipboard from "../../../../../components/util/CopyToClipboard";
import { List } from "@material-ui/core";
import Link from "next/link";
import NavigationButton from "../../../../../components/ui/NavigationButton";

const CourseSettingsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;

    const { user } = useContext(AuthContext);
    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const { data: course, revalidate: refetchCourse } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    const { school } = useSchool(course?.meta.school);

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
        createSnackbar({ text: "Account updated", type: "success" });
    }

    const handleUpdateCourseField = (key: keyof ICourseOriginal) => (value) =>
        handleCourseUpdate({ [key]: value });

    async function handleUpdateCourseVerification(
        verificationStatus: ECourseVerificationStatus
    ) {
        await updateCourseVerification(courseId, verificationStatus);
        refetchCourse();
    }

    async function handleUpdateCourseVerificationClicked(
        verificationStatus: ECourseVerificationStatus
    ) {
        createAlert({
            ...configureCourseVerificationUpdateAlertDTO(verificationStatus, {
                course,
                schoolName: school.name,
            }),
            type: ENotificationTypes.INFO,
            onOk: () => handleUpdateCourseVerification(verificationStatus),
            onCancel: () => {},
        });
    }

    return (
        <CourseSettingsLayout
            activeLabel="Details"
            courseId={course?._id}
            courseTitle={course?.title}
        >
            <Head>
                <title>STEM-bound - Settings</title>
            </Head>
            <EditableSection
                title="Title"
                noDivider
                spacing="sm"
                paddingTop="0"
                onEdit={handleUpdateCourseField("title")}
                value={course?.title}
                TypographyProps={{ variant: "h5" }}
                InputButtonProps={{
                    minLength: [4, "Too short!"],
                }}
                TextFieldProps={{
                    inputProps: { maxLength: 50 },
                }}
            />

            <Section title="School" spacing="sm">
                <Typography paragraph color="textPrimary">
                    {school ? school.name : "..."}
                </Typography>
            </Section>

            <EditableSection
                title="Duration"
                spacing="sm"
                value={[course?.start, course?.end && addDays(course?.end, -1)]}
                onEdit={([start, end]) =>
                    handleCourseUpdate({
                        start: start.toString(),
                        end: addDays(end, 1).toString(),
                    })
                }
                renderInput={(value, setValue) => (
                    <div>
                        <DatePicker
                            label="Start"
                            value={value[0]}
                            onChange={(date) => setValue([date, value[1]])}
                            style={{ width: "50%" }}
                        />
                        <DatePicker
                            label="End (Last Day)"
                            value={value[1]}
                            onChange={(date) => setValue([value[0], date])}
                            style={{ width: "50%" }}
                        />
                    </div>
                )}
            >
                <Typography paragraph color="textPrimary">
                    {course
                        ? `From ${getLongDate(course?.start)} to ${getLongDate(
                              addDays(course?.end, -1)
                          )}`
                        : "..."}
                </Typography>
            </EditableSection>

            <EditableSection
                title="Short Description"
                spacing="sm"
                onEdit={handleUpdateCourseField("shortDescription")}
                value={course?.shortDescription}
                InputButtonProps={{
                    minLength: [4, "Too short!"],
                }}
                TextFieldProps={{
                    multiline: true,
                    variant: "outlined",
                    margin: "none",
                    inputProps: { maxLength: 100 },
                }}
            />
            <EditableSection
                title="Long Description"
                spacing="sm"
                onEdit={handleUpdateCourseField("longDescription")}
                value={course?.longDescription}
                InputButtonProps={{
                    minLength: [4, "Too short!"],
                }}
                TextFieldProps={{
                    multiline: true,
                    variant: "outlined",
                    margin: "none",
                    inputProps: { maxLength: 2000 },
                }}
            />
            <EditableSection
                title="Course Syllabus"
                onEdit={handleUpdateCourseField("remoteSyllabusUrl")}
                value={course?.remoteSyllabusUrl}
                TextFieldProps={{
                    placeholder: "Link to this course's syllabus",
                }}
            >
                {course?.remoteSyllabusUrl && (
                    <CopyToClipboard
                        text={course?.remoteSyllabusUrl}
                        description="Link to the course syllabus"
                        prepend="Syllabus"
                    />
                )}
            </EditableSection>
            <Section
                title="Verification Status"
                spacing="sm"
                actionEl={
                    <>
                        {user.role === EUserRoles.INSTRUCTOR &&
                            course?.verificationStatus ===
                                ECourseVerificationStatus.UNPUBLISHED && (
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="contained"
                                    onClick={() =>
                                        handleUpdateCourseVerificationClicked(
                                            ECourseVerificationStatus.PENDING_VERIFICATION
                                        )
                                    }
                                >
                                    Publish Course
                                </Button>
                            )}
                    </>
                }
            >
                <Chip
                    label={getDisplayCourseVerificationStatus(
                        course?.verificationStatus
                    )}
                    color={
                        course?.verificationStatus ===
                        ECourseVerificationStatus.DISMISSED
                            ? "secondary"
                            : "primary"
                    }
                />
            </Section>
        </CourseSettingsLayout>
    );
};

export default withAuth(CourseSettingsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

const courseSettingsNavigation = [
    {
        href: "/app/courses/[id]/settings",
        label: "Details",
    },
    {
        href: "/app/courses/[id]/settings/resources",
        label: "Resources",
    },
    {
        href: "/app/courses/[id]/settings/instructors",
        label: "Instructors",
    },
    {
        href: "/app/courses/[id]/settings/students",
        label: "Students",
    },
];

export interface ICourseSettingsNavigationProps {
    courseId: string;
    activeLabel: string;
}

export const CourseSettingsNavigation: React.FC<ICourseSettingsNavigationProps> = ({
    courseId,
    activeLabel,
}) => {
    return (
        <List>
            {courseSettingsNavigation.map(({ href, label }) => (
                <Link
                    href={href}
                    as={href.replace("[id]", courseId)}
                    key={href + label}
                >
                    <a>
                        <NavigationButton
                            active={
                                activeLabel.toLowerCase() ===
                                label.toLowerCase()
                            }
                        >
                            {label}
                        </NavigationButton>
                    </a>
                </Link>
            ))}
        </List>
    );
};

export interface ICourseSettingsLayoutProps extends IAppLayoutProps {
    courseTitle: string;
    courseId: string;
    activeLabel: string;
}

export const CourseSettingsLayout: React.FC<ICourseSettingsLayoutProps> = ({
    children,
    courseTitle,
    courseId,
    activeLabel,
    ...appLayoutProps
}) => {
    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: courseTitle,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${courseId}`,
                },
                { label: "Settings" },
            ]}
            {...appLayoutProps}
        >
            <SplitScreen
                mainEl={children}
                secondaryEl={
                    <CourseSettingsNavigation
                        courseId={courseId}
                        activeLabel={activeLabel}
                    />
                }
                secondaryWidth="280px"
                order="secondary-first"
            />
        </AppLayout>
    );
};
