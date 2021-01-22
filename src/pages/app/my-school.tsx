import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import Section from "../../components/ui/Section";
import SplitScreen from "../../components/ui/SplitScreen";
import CourseCard, { ICourseCardProps } from "../../components/ui/CourseCard";
import UserCard from "../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NotificationContext from "../../components/contexts/NotificationContext";
import FlexBox from "../../components/ui/FlexBox";
import LinkNewTab from "../../components/util/LinkNewTab";
import { useContext, useEffect } from "react";
import {
    schoolCoursesFetcher,
    schoolSchoolOfficialsFetcher,
    schoolStudentsFetcher,
    enrollByCourseId,
    dropByCourseId,
    updateCourseVerification,
    schoolFetcher,
} from "../../utils/services";
import {
    ECourseVerificationStatus,
    ENotificationTypes,
    EUserRoles,
    ICourse,
    IStudent,
    IUser,
} from "../../utils/types";
import ContactUserButton from "../../components/util/ContactUserButton";
import { IMenuItemDTO } from "../../components/util/MenuWrapper";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const schoolId = (user as IStudent).meta.school;

    const { data: school } = useSWR(
        schoolId && "/user/school",
        schoolFetcher(schoolId)
    );

    const {
        data: courses,
        revalidate: refetchCourses,
        isValidating: coursesLoading,
        error: coursesError,
    } = useSWR("/user/school/courses", schoolCoursesFetcher(schoolId));

    const {
        data: coursesPendingVerification,
        isValidating: coursesPendingVerificationLoading,
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
        isValidating: dismissedCoursesLoading,
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
                    renderContent: () => (
                        <>
                            <LinkNewTab
                                href="/app/courses/[id]"
                                as={`/app/courses/${course._id}`}
                            >
                                <Button color="primary" size="small">
                                    Inspect Course
                                </Button>
                            </LinkNewTab>
                            <LinkNewTab
                                href={`/app/messaging?contact=${course.meta.instructors[0]}`}
                            >
                                <Button color="primary" size="small">
                                    Contact Instructor
                                </Button>
                            </LinkNewTab>
                        </>
                    ),
                    renderFooter: ({ closeAlert }) => (
                        <>
                            <Button
                                onClick={() => {
                                    handleUpdateCourseVerificationClicked(
                                        course._id,
                                        ECourseVerificationStatus.DISMISSED
                                    );
                                    closeAlert();
                                }}
                                color="secondary"
                                variant="contained"
                            >
                                Dismiss
                            </Button>
                            <Button
                                onClick={() => {
                                    handleUpdateCourseVerificationClicked(
                                        course._id,
                                        ECourseVerificationStatus.VERIFIED
                                    );
                                    closeAlert();
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Verify
                            </Button>
                        </>
                    ),
                });
            }
        },
        [coursesPendingVerification]
    );

    async function handleEnrollInCourse(courseId: string) {
        try {
            await enrollByCourseId(courseId);
            createSnackbar({
                text: "Successfully enrolled in course",
                type: "success",
            });
            await refetchCourses();
        } catch (e) {
            createSnackbar({
                text: "An error occured: Cannot enroll",
                type: "info",
            });
        }
    }

    function handleDropCourse(courseId: string) {
        createAlert({
            headerText: "Are you sure you want to drop this course?",
            bodyText:
                "If you choose to re-enroll some information may be lost.",
            type: ENotificationTypes.DANGER,
            onCancel: () => {},
            onOk: async () => {
                try {
                    await dropByCourseId(courseId);
                    createSnackbar({
                        text: "Course successfully dropped",
                        type: "success",
                    });
                    await refetchCourses();
                } catch (e) {
                    createSnackbar({
                        text: "An error occured: Cannot drop course",
                        type: "info",
                    });
                }
            },
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
        courseId: string,
        verificationStatus: ECourseVerificationStatus
    ) {
        createAlert({
            headerText: `Are you sure you want to ${
                verificationStatus === ECourseVerificationStatus.DISMISSED
                    ? "dismiss"
                    : "verify"
            } this course?`,
            bodyText:
                verificationStatus === ECourseVerificationStatus.DISMISSED
                    ? "Students will not be able to access this course"
                    : "Students will be able to enroll in this course",
            type: ENotificationTypes.INFO,
            onOk: () =>
                handleUpdateCourseVerification(courseId, verificationStatus),
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
        <FlexBox>
            {courses?.map((course) =>
                paginateCourse(course, {
                    user,
                    onVerifyCourseClicked: () =>
                        handleUpdateCourseVerificationClicked(
                            course._id,
                            ECourseVerificationStatus.VERIFIED
                        ),
                    onDismissCourseClicked: () =>
                        handleUpdateCourseVerificationClicked(
                            course._id,
                            ECourseVerificationStatus.DISMISSED
                        ),
                    onDropClicked: () => handleDropCourse(course._id),
                    onEnrollClicked: () => handleEnrollInCourse(course._id),
                })
            )}
        </FlexBox>
    );

    return (
        <AppLayout header="My School">
            <Head>
                <title>STEM-bound - My School</title>
            </Head>
            <SplitScreen
                mainEl={
                    <>
                        <Typography variant="h5" gutterBottom>
                            {school?.name}
                        </Typography>
                        <Typography>{school?.location.shortDisplay}</Typography>
                        <Section
                            title="Courses"
                            noDivider
                            infoMessage={
                                !coursesLoading &&
                                !courses?.length &&
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
                            <Section title="Dismissed Courses">
                                {paginateCourses(dismissedCourses)}
                            </Section>
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
                                `No${
                                    school ? " " + school.name : null
                                } school officials have an account`
                            }
                            errorMessage={
                                schoolOfficialsError &&
                                "Couldn't load school officials, an error occured"
                            }
                        >
                            {schoolOfficials?.map((schoolOfficial) => (
                                <UserCard
                                    user={schoolOfficial}
                                    key={schoolOfficial._id}
                                />
                            ))}
                        </Section>
                        <Section
                            title="Students"
                            loading={studentsLoading}
                            infoMessage={
                                students?.length === 0 &&
                                `No${
                                    school ? " " + school.name : null
                                } students have an account`
                            }
                            errorMessage={
                                studentsError &&
                                "Couldn't load students, an error occured"
                            }
                        >
                            {students?.map((student) => (
                                <UserCard user={student} key={student._id} />
                            ))}
                        </Section>
                    </>
                }
            />
        </AppLayout>
    );
};

export default withAuth(MySchoolAppPage);

function paginateCourse(
    course: ICourse,
    {
        user,
        onDropClicked,
        onEnrollClicked,
        onDismissCourseClicked,
        onVerifyCourseClicked,
    }: {
        user: IUser;
        onDropClicked(): any;
        onEnrollClicked(): any;
        onDismissCourseClicked(): any;
        onVerifyCourseClicked(): any;
    },
    CourseProps?: ICourseCardProps
) {
    let menuItems: IMenuItemDTO[] = [];
    if (
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.VERIFIED
    )
        menuItems.push({
            display: "Revoke Verification",
            onClick: onDismissCourseClicked,
        });
    if (
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.DISMISSED
    )
        menuItems.push({
            display: "Reinstate Verification",
            onClick: onVerifyCourseClicked,
        });

    return (
        <CourseCard
            course={course}
            key={course._id}
            fullWidth
            menuItems={menuItems}
            footerEl={
                <>
                    {user?.role === EUserRoles.SCHOOL_OFFICIAL &&
                        course.verificationStatus ===
                            ECourseVerificationStatus.PENDING_VERIFICATION && (
                            <>
                                <Button
                                    color="secondary"
                                    onClick={onDismissCourseClicked}
                                >
                                    Dismiss Course
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={onVerifyCourseClicked}
                                >
                                    Verify Course
                                </Button>
                            </>
                        )}
                    {user?.role === EUserRoles.STUDENT &&
                        (course?.meta.students.includes(user?._id) ? (
                            <Button color="secondary" onClick={onDropClicked}>
                                Drop Course
                            </Button>
                        ) : (
                            <Button color="primary" onClick={onEnrollClicked}>
                                Enroll
                            </Button>
                        ))}
                    {user?.role !== EUserRoles.INSTRUCTOR && (
                        <ContactUserButton
                            userId={course.meta.instructors[0]}
                            color="primary"
                        >
                            Contact Instructor
                        </ContactUserButton>
                    )}
                </>
            }
            {...CourseProps}
        />
    );
}
