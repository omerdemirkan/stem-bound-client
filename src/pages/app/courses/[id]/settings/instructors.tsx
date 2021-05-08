import { useRouter } from "next/router";
import useSWR from "swr";
import withAuth from "../../../../../components/hoc/withAuth";
import AppLayout from "../../../../../components/layouts/AppLayout";
import RelativeGrid from "../../../../../components/ui/RelativeGrid";
import UserCard from "../../../../../components/ui/UserCard";
import {
    courseFetcher,
    createCourseInstructorInvitation,
    usersFetcher,
} from "../../../../../utils/services";
import {
    ENotificationTypes,
    EUserRoles,
    IUser,
} from "../../../../../utils/types";
import Section from "../../../../../components/ui/Section";
import { useContext } from "react";
import AuthContext from "../../../../../components/contexts/AuthContext";
import InputButton from "../../../../../components/util/InputButton";
import NotificationContext from "../../../../../components/contexts/NotificationContext";
import ContactUserButton from "../../../../../components/util/ContactUserButton";
import UserAsyncSelect from "../../../../../components/util/UserAsyncSelect";
import SplitScreen from "../../../../../components/ui/SplitScreen";
import NavigationButton from "../../../../../components/ui/NavigationButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import Link from "next/link";

const courseSettingsNavigation = [
    {
        href: "/app/courses/[id]/settings",
        label: "Details",
    },
    {
        href: "/app/courses/[id]/settings/instructors",
        label: "Instructors",
    },
    {
        href: "/app/courses/[id]/settings/resources",
        label: "Resources",
    },
];

const CourseInstructorsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;

    const { user } = useContext(AuthContext);
    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const {
        data: course,
        isValidating: courseLoading,
        revalidate: refetchCourse,
    } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    const {
        data: instructors,
        error: instructorsError,
        isValidating: instructorsLoading,
    } = useSWR(
        courseId ? `/courses/${courseId}/instructors` : null,
        usersFetcher(EUserRoles.INSTRUCTOR, { courseId })
    );

    async function handleInviteInstructor(user: IUser) {
        createAlert({
            headerText: `Are you sure you want to invite ${user.fullName} as an instructor?`,
            bodyText: `Remember, this will give complete instructor privileges and cannot be undone.`,
            type: ENotificationTypes.INFO,
            async onOk() {
                try {
                    await createCourseInstructorInvitation({
                        courseId: course._id,
                        invitedUserId: user._id,
                    });
                    createSnackbar({
                        text: `${user.firstName} successfully invited!`,
                        type: "success",
                    });
                } catch (e) {
                    createSnackbar({
                        text: "An error occured",
                        type: "error",
                    });
                }
            },
            onCancel() {},
            renderFooter: () => (
                <ContactUserButton userId={user._id} color="primary" newTab>
                    Contact {user.firstName}
                </ContactUserButton>
            ),
        });
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
            actionEl={
                <InputButton
                    onSubmit={handleInviteInstructor}
                    validate={(user) =>
                        user ? true : "You haven't selected an instructor"
                    }
                    renderInput={(value, setValue, { errorMessage }) => (
                        <UserAsyncSelect
                            onChange={setValue}
                            userRole={EUserRoles.INSTRUCTOR}
                            TextFieldProps={{
                                error: !!errorMessage,
                                helperText: errorMessage,
                            }}
                            options={{
                                exclude: course?.meta.instructors || [user._id],
                            }}
                        />
                    )}
                    ButtonProps={{
                        size: "small",
                        color: "primary",
                    }}
                >
                    Invite Instructor
                </InputButton>
            }
        >
            {(instructorsLoading || courseLoading) && <LinearProgress />}
            <SplitScreen
                mainEl={
                    <Section title="Instructors" noDivider>
                        <RelativeGrid minWidth="400px">
                            {instructors?.map((instructor) => (
                                <UserCard
                                    key={instructor._id}
                                    user={instructor}
                                    noMargin
                                    fullWidth
                                />
                            ))}
                        </RelativeGrid>
                    </Section>
                }
                secondaryEl={
                    <Section noDivider>
                        <List>
                            {courseSettingsNavigation.map(({ href, label }) => (
                                <Link
                                    href={href}
                                    as={href.replace("[id]", course?._id)}
                                    key={href + label}
                                >
                                    <a>
                                        <NavigationButton>
                                            {label}
                                        </NavigationButton>
                                    </a>
                                </Link>
                            ))}
                        </List>
                    </Section>
                }
                secondaryWidth="280px"
                order="secondary-first"
            />
        </AppLayout>
    );
};

export default withAuth(CourseInstructorsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
