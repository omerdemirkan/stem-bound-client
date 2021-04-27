import AppLayout from "../../../../components/layouts/AppLayout";
import Head from "next/head";
import withAuth from "../../../../components/hoc/withAuth";
import AuthContext from "../../../../components/contexts/AuthContext";
import useSWR from "swr";
import CourseAnnouncement from "../../../../components/ui/CourseAnnouncement";
import { useRouter } from "next/router";
import {
    courseFetcher,
    announcementsFetcher,
    deleteAnnouncementById,
    updateAnnouncementById,
    createAnnouncement,
} from "../../../../utils/services";
import { useContext } from "react";
import {
    EUserRoles,
    ENotificationTypes,
    ECourseVerificationStatus,
} from "../../../../utils/types";
import { clone } from "../../../../utils/helpers";
import NotificationContext from "../../../../components/contexts/NotificationContext";
import InputButton from "../../../../components/util/InputButton";
import TextField from "@material-ui/core/TextField";
import PictureMessage from "../../../../components/ui/PictureMessage";
import NoResultsSVG from "../../../../components/svg/illustrations/no-results";
import Section from "../../../../components/ui/Section";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const {
        data: course,
        error: fetchCourseError,
        isValidating: courseLoading,
    } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const {
        data: announcements,
        error: announcementsError,
        mutate: mutateCourseAnnouncements,
        isValidating: announcementsLoading,
    } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as any),
        { initialData: course?.announcements }
    );

    const { user } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);

    function handleDeleteAnnouncement(announcementId: string) {
        deleteAnnouncementById({ announcementId, courseId: course._id }).then(
            function (res) {
                mutateCourseAnnouncements(
                    announcements.filter(
                        (announcement) => announcement._id !== announcementId
                    )
                );
            }
        );
    }

    function handleEditAnnouncement(
        announcementId: string,
        newAnnouncementText: string
    ) {
        updateAnnouncementById(
            { text: newAnnouncementText },
            { announcementId, courseId: course._id }
        ).then(function (res) {
            const newAnnouncements = clone(announcements);
            const announcementIndex = announcements.findIndex(
                (announcement) => announcement._id === announcementId
            );
            newAnnouncements[announcementIndex] = res.data;
            mutateCourseAnnouncements(newAnnouncements);
        });
    }

    async function handleCreateAnnouncement(text: string) {
        const { data: newAnnouncement } = await createAnnouncement(
            {
                text,
                // @ts-ignore
                meta: {
                    from: user._id,
                },
            },
            { courseId: queryCourseId as any }
        );
        mutateCourseAnnouncements(function (prevAnnouncements) {
            const newAnnouncements = clone(prevAnnouncements) || [];
            newAnnouncements.unshift(newAnnouncement);
            return newAnnouncements;
        });
    }

    const courseIsVerified =
        course?.verificationStatus === ECourseVerificationStatus.VERIFIED;

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Announcements" },
            ]}
            actionEl={
                user.role === EUserRoles.INSTRUCTOR && courseIsVerified ? (
                    <InputButton
                        renderInput={(value, setValue) => (
                            <TextField
                                id="create-announcement"
                                label="New Announcement"
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                                variant="outlined"
                                margin="normal"
                                multiline
                                fullWidth
                            />
                        )}
                        onSubmit={handleCreateAnnouncement}
                        initialValue={""}
                        ButtonProps={{
                            color: "primary",
                        }}
                    >
                        CREATE
                    </InputButton>
                ) : null
            }
        >
            <Head>
                <title>Announcements - STEM-bound</title>
            </Head>
            {course && !courseIsVerified && (
                <Alert severity="info">
                    <AlertTitle>{course.title} is not verified</AlertTitle>
                    Courses must be verified by a school official in order to be
                    able to post announcements
                </Alert>
            )}
            {!announcementsLoading && !announcements?.length ? (
                <PictureMessage
                    Svg={NoResultsSVG}
                    size="sm"
                    message="No announcements found"
                />
            ) : (
                <Section
                    title="Published announcements"
                    loading={announcementsLoading}
                    infoMessage={
                        announcements?.length === 0 &&
                        !announcementsError &&
                        "No announcements published"
                    }
                    errorMessage={
                        !!announcementsError &&
                        "Couldn't fetch published announcements, an error occured"
                    }
                    noDivider
                >
                    {announcements?.map((announcement) => (
                        <CourseAnnouncement
                            key={announcement._id}
                            announcement={announcement}
                            onDeleteAnnouncement={() =>
                                createAlert({
                                    headerText:
                                        "Are you sure you want to delete this announcement?",
                                    bodyText: "You cannot undo a deletion.",
                                    type: ENotificationTypes.DANGER,
                                    onOk: () =>
                                        handleDeleteAnnouncement(
                                            announcement._id
                                        ),
                                    onCancel: () => {},
                                })
                            }
                            onEditAnnouncement={handleEditAnnouncement}
                        />
                    ))}
                </Section>
            )}
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);
