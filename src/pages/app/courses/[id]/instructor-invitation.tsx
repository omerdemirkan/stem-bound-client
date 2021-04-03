import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import NotificationContext from "../../../../components/contexts/NotificationContext";
import withAuth from "../../../../components/hoc/withAuth";
import Center from "../../../../components/ui/Center";
import Section from "../../../../components/ui/Section";
import ContactUserButton from "../../../../components/util/ContactUserButton";
import LinkNewTab from "../../../../components/util/LinkNewTab";
import useSchool from "../../../../hooks/useSchool";
import {
    acceptCourseInstructorInvitation,
    courseFetcher,
    userFetcher,
} from "../../../../utils/services";
import { ENotificationTypes, EUserRoles } from "../../../../utils/types";

const InstructorInvitationAppPage: React.FC = () => {
    const router = useRouter();
    const { createAlert, createSnackbar } = useContext(NotificationContext);
    const invitationToken = router?.query.invitation_token as string,
        inviterUserId = router?.query.inviter_id as string,
        courseId = router?.query.id as string;

    const { data: course } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );
    const { data: inviter } = useSWR(
        inviterUserId ? `/users/${inviterUserId}` : null,
        userFetcher(inviterUserId)
    );
    const { school } = useSchool(course.meta.school);
    const isLoading = !school || !inviter;

    function handleAcceptInvitation() {
        createAlert({
            headerText: "Are you sure you want to accept this invitation?",
            bodyText: `This cannot be undone`,
            type: ENotificationTypes.INFO,
            async onOk() {
                try {
                    await acceptCourseInstructorInvitation({
                        courseId,
                        invitationToken,
                    });
                    createSnackbar({
                        text: "Successfully accepted invitation!",
                        type: "success",
                    });
                    router.push(`/app/courses/${course?._id}`);
                } catch (e) {
                    createSnackbar({
                        text: "An error occured, couldn't accept invitation",
                        type: "error",
                    });
                }
            },
            onCancel() {},
        });
    }

    return (
        <AppLayout header="Course Invitation">
            <Head>
                <title>Course Invitation - STEM-bound</title>
            </Head>
            <Section loading={isLoading} noDivider>
                {!isLoading ? (
                    <Center>
                        <Typography variant="h5" gutterBottom>
                            You've been invited to instruct a course!
                        </Typography>
                        <Typography paragraph gutterBottom>
                            {inviter.fullName} invites you to join them in
                            instructing <strong>{course.title}</strong> at{" "}
                            {school.name}.
                        </Typography>
                        <span>
                            <ContactUserButton
                                userId={inviter._id}
                                color="primary"
                                className="spaced-horizontal"
                            >
                                Contact {inviter.firstName}
                            </ContactUserButton>
                            <LinkNewTab
                                href="/app/courses/[id]"
                                as={`/app/courses/${course?._id}`}
                            >
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    className="spaced-horizontal"
                                >
                                    View Course
                                </Button>
                            </LinkNewTab>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleAcceptInvitation}
                                className="spaced-horizontal"
                            >
                                Accept invitation
                            </Button>
                        </span>
                    </Center>
                ) : null}
            </Section>
        </AppLayout>
    );
};

export default withAuth(InstructorInvitationAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
