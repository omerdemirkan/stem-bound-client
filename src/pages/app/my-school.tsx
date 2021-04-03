import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import Section from "../../components/ui/Section";
import SplitScreen from "../../components/ui/SplitScreen";
import UserCard from "../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NotificationContext from "../../components/contexts/NotificationContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import {
    schoolCoursesFetcher,
    schoolSchoolOfficialsFetcher,
    schoolStudentsFetcher,
    enrollByCourseId,
    dropByCourseId,
    updateCourseVerification,
} from "../../utils/services";
import {
    ECourseVerificationStatus,
    ENotificationTypes,
    EUserRoles,
    ICourse,
    IStudent,
} from "../../utils/types";
import HidableSection from "../../components/util/HidableSection";
import {
    configureCourseVerificationUpdateAlertDTO,
    configureCourseEnrollmentUpdateAlertDTO,
} from "../../utils/helpers";
import CourseCard from "../../components/ui/CourseCard";
import RelativeGrid from "../../components/ui/RelativeGrid";
import useSchool from "../../hooks/useSchool";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const schoolId = (user as IStudent).meta.school;

    const { school } = useSchool(schoolId);

    const {
        data: courses,
        revalidate: refetchCourses,
        isValidating: coursesLoading,
        error: coursesError,
    } = useSWR("/user/school/courses", schoolCoursesFetcher(schoolId));

    const {
        data: coursesPendingVerification,
        revalidate: refetchCoursesPendingVerification,
    } = useSWR(
        user.role === EUserRoles.SCHOOL_OFFICIAL
            ? `/user/school/courses?verification_status=${ECourseVerificationStatus.PENDING_VERIFICATION}`
            : null,
        schoolCoursesFetcher(schoolId, {
            verificationStatus: ECourseVerificationStatus.PENDING_VERIFICATION,
        })
    );

    const {
        data: dismissedCourses,
        revalidate: refetchDismissedCourses,
    } = useSWR(
        user.role === EUserRoles.SCHOOL_OFFICIAL
            ? `/user/school/courses?verification_status=${ECourseVerificationStatus.DISMISSED}`
            : null,
        schoolCoursesFetcher(schoolId, {
            verificationStatus: ECourseVerificationStatus.DISMISSED,
        })
    );

    const {
        data: schoolOfficials,
        isValidating: schoolOfficialsLoading,
        error: schoolOfficialsError,
    } = useSWR(
        "/user/school/school-officials",
        schoolSchoolOfficialsFetcher(schoolId)
    );

    const {
        data: students,
        isValidating: studentsLoading,
        error: studentsError,
    } = useSWR("/user/school/students", schoolStudentsFetcher(schoolId));

    useEffect(
        function () {
            if (
                coursesPendingVerification?.length &&
                user.role === EUserRoles.SCHOOL_OFFICIAL
            ) {
                const course = coursesPendingVerification[0];
                createAlert({
                    headerText: `A new course, "${course.title}" , is pending verification`,
                    bodyText:
                        "You may choose to either verify or dismiss this course. Before deciding, you are encouraged to inspect the course and message the instructor directly.",
                    type: ENotificationTypes.INFO,
                    renderFooter: ({ closeAlert }) => (
                        <Link
                            href="/app/courses/[id]"
                            as={`/app/courses/${course._id}`}
                        >
                            <a>
                                <Button color="primary" onClick={closeAlert}>
                                    Inspect Course
                                </Button>
                            </a>
                        </Link>
                    ),
                });
            }
        },
        [coursesPendingVerification]
    );

    async function handleEnrollmentUpdate(
        status: "enroll" | "drop",
        course: ICourse
    ) {
        createAlert({
            ...configureCourseEnrollmentUpdateAlertDTO(status, course),
            async onOk() {
                try {
                    await (status === "enroll"
                        ? enrollByCourseId(course._id)
                        : dropByCourseId(course._id));
                    refetchCourses();
                    createSnackbar({
                        text: `Successfully ${
                            status === "enroll" ? "enrolled in" : "dropped"
                        } "${course.title}"`,
                        type: "info",
                    });
                } catch (e) {
                    createSnackbar({
                        text: `Couldn't ${
                            status === "enroll" ? "enroll" : "drop"
                        } course, try again later.`,
                        type: "error",
                    });
                }
            },
            onCancel: () => {},
        });
    }

    async function handleUpdateCourseVerification(
        courseId: string,
        verificationStatus: ECourseVerificationStatus
    ) {
        await updateCourseVerification(courseId, verificationStatus);
        refetchCourses();
        refetchCoursesPendingVerification();
        refetchDismissedCourses();
    }

    async function handleUpdateCourseVerificationClicked(
        course: ICourse,
        verificationStatus: ECourseVerificationStatus
    ) {
        createAlert({
            ...configureCourseVerificationUpdateAlertDTO(verificationStatus, {
                course,
                schoolName: school.name,
            }),
            type: ENotificationTypes.INFO,
            onOk: () =>
                handleUpdateCourseVerification(course._id, verificationStatus),
            onCancel: () => {},
        });
    }

    let courseMessage: string;
    if (courses && courses.length === 0) {
        switch (user.role) {
            case EUserRoles.STUDENT:
                courseMessage =
                    "Looks like there aren't any courses ready for enrollment.";
                break;
            case EUserRoles.SCHOOL_OFFICIAL:
                courseMessage = coursesPendingVerification?.length
                    ? `Looks like you haven't verified any courses. You may either verify an existing course or contact an instructor through the search page to set one up.`
                    : "Looks like an instructor hasn't submitted a course for verification. You may contact instructors through the search page to set up a course.";
        }
    }

    const paginateCourses = (courses: ICourse[]) => (
        <RelativeGrid minWidthInPixels={450}>
            {courses.map((course) => (
                <CourseCard
                    course={course}
                    key={course._id}
                    onVerifyCourseClicked={() =>
                        handleUpdateCourseVerificationClicked(
                            course,
                            ECourseVerificationStatus.VERIFIED
                        )
                    }
                    onDismissCourseClicked={() =>
                        handleUpdateCourseVerificationClicked(
                            course,
                            ECourseVerificationStatus.DISMISSED
                        )
                    }
                    onDropClicked={() => handleEnrollmentUpdate("drop", course)}
                    onEnrollClicked={() =>
                        handleEnrollmentUpdate("enroll", course)
                    }
                    fullWidth
                    noMargin
                />
            ))}
        </RelativeGrid>
    );

    return (
        <AppLayout header="My School">
            <Head>
                <title>My School - STEM-bound</title>
            </Head>
            <SplitScreen
                mainEl={
                    <>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                            gutterBottom
                        >
                            {school?.name}
                        </Typography>
                        <Typography paragraph color="textPrimary">
                            {school?.location.shortDisplay}
                        </Typography>
                        <Section
                            title="Courses"
                            noDivider
                            infoMessage={
                                !coursesLoading &&
                                !courses?.length &&
                                !coursesError &&
                                "No courses found"
                            }
                            errorMessage={
                                coursesError &&
                                "Couldn't load courses, an error occured"
                            }
                        >
                            {courses?.length ? paginateCourses(courses) : null}
                        </Section>
                        {coursesPendingVerification?.length ? (
                            <Section title="Unverified Courses">
                                {paginateCourses(coursesPendingVerification)}
                            </Section>
                        ) : null}
                        {dismissedCourses?.length ? (
                            <HidableSection
                                initial="hidden"
                                title="Dismissed Courses"
                            >
                                {paginateCourses(dismissedCourses)}
                            </HidableSection>
                        ) : null}
                    </>
                }
                secondaryEl={
                    <>
                        <Section
                            title="School Officials"
                            noDivider
                            loading={schoolOfficialsLoading}
                            infoMessage={
                                schoolOfficials?.length === 0 &&
                                !schoolOfficialsError &&
                                `No${
                                    school ? " " + school.name : null
                                } school officials have an account`
                            }
                            errorMessage={
                                schoolOfficialsError &&
                                "Couldn't load school officials, an error occured"
                            }
                        >
                            <RelativeGrid minWidthInPixels={400}>
                                {schoolOfficials?.map((schoolOfficial) => (
                                    <UserCard
                                        user={schoolOfficial}
                                        key={schoolOfficial._id}
                                        noMargin
                                        fullWidth
                                    />
                                ))}
                            </RelativeGrid>
                        </Section>
                        <Section
                            title="Students"
                            loading={studentsLoading}
                            infoMessage={
                                students?.length === 0 &&
                                !studentsError &&
                                `No${
                                    school ? " " + school.name : null
                                } students have an account`
                            }
                            errorMessage={
                                studentsError &&
                                "Couldn't load students, an error occured"
                            }
                        >
                            <RelativeGrid minWidthInPixels={400}>
                                {students?.map((student) => (
                                    <UserCard
                                        user={student}
                                        key={student._id}
                                        noMargin
                                        fullWidth
                                    />
                                ))}
                            </RelativeGrid>
                        </Section>
                    </>
                }
            />
        </AppLayout>
    );
};

export default withAuth(MySchoolAppPage, {
    allowedUserRoles: [EUserRoles.STUDENT, EUserRoles.SCHOOL_OFFICIAL],
});
