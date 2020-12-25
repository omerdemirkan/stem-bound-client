import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import {
    userSchoolFetcher,
    schoolCoursesFetcher,
    schoolSchoolOfficialsFetcher,
    schoolStudentsFetcher,
    enrollByCourseId,
    dropByCourseId,
    udpateCourseVerification,
    createChat,
} from "../../utils/services";
import {
    EChatTypes,
    ENotificationTypes,
    EUserRoles,
    ICourse,
    IStudent,
    IUser,
} from "../../utils/types";
import { useContext } from "react";
import Section from "../../components/ui/Section";
import SplitScreen from "../../components/ui/SplitScreen";
import CourseCard from "../../components/ui/CourseCard";
import UserCard from "../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationContext from "../../components/contexts/NotificationContext";
import MessagingContext from "../../components/contexts/MessagingContext";
import { useRouter } from "next/router";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { contactUser } = useContext(MessagingContext);
    const router = useRouter();
    const { data: school } = useSWR(
        "/user/school",
        userSchoolFetcher(user._id)
    );

    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const { data: courses, revalidate: revalidateCourses } = useSWR(
        "/user/school/courses",
        schoolCoursesFetcher((user as IStudent).meta.school)
    );
    const {
        data: unverifiedCourses,
        revalidate: revalidateUnverifiedCourses,
    } = useSWR(
        user.role === EUserRoles.INSTRUCTOR ||
            user.role === EUserRoles.SCHOOL_OFFICIAL
            ? "/user/school/courses?unverified=1"
            : null,
        schoolCoursesFetcher((user as IStudent).meta.school, {
            unverified: true,
        })
    );
    const {
        data: schoolOfficials,
        isValidating: schoolOfficialsLoading,
        error: schoolOfficialsError,
    } = useSWR(
        "/user/school/school-officials",
        schoolSchoolOfficialsFetcher((user as IStudent).meta.school)
    );
    const {
        data: students,
        isValidating: studentsLoading,
        error: studentsError,
    } = useSWR(
        "/user/school/students",
        schoolStudentsFetcher((user as IStudent).meta.school)
    );

    async function handleEnrollInCourse(courseId: string) {
        try {
            await enrollByCourseId(courseId);
            createSnackbar({
                text: "Successfully enrolled in course",
                type: "success",
            });
            await revalidateCourses();
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
                    await revalidateCourses();
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
        verified: boolean
    ) {
        await udpateCourseVerification(courseId, true);
        revalidateCourses();
        revalidateUnverifiedCourses();
    }

    const paginateCourses = (courses: ICourse[]) => (
        <Grid container spacing={2} style={{ maxWidth: "100%" }}>
            {courses?.map((course) => (
                <Grid item xs={12} xl={6}>
                    <CourseCard
                        course={course}
                        key={course._id}
                        fullWidth
                        footerEl={
                            <>
                                {user?.role === EUserRoles.STUDENT &&
                                    (course?.meta.students.includes(
                                        user?._id
                                    ) ? (
                                        <Button
                                            color="secondary"
                                            onClick={() =>
                                                handleDropCourse(course._id)
                                            }
                                        >
                                            Drop Course
                                        </Button>
                                    ) : (
                                        <Button
                                            color="primary"
                                            onClick={() =>
                                                handleEnrollInCourse(course._id)
                                            }
                                        >
                                            Enroll
                                        </Button>
                                    ))}
                                {user?.role === EUserRoles.SCHOOL_OFFICIAL && (
                                    <>
                                        <Button
                                            color="primary"
                                            onClick={() =>
                                                contactUser(
                                                    course.meta.instructors[0]
                                                )
                                            }
                                        >
                                            Contact Instructor
                                        </Button>
                                        <Button
                                            color={
                                                course.verified
                                                    ? "secondary"
                                                    : "primary"
                                            }
                                            onClick={() =>
                                                handleUpdateCourseVerification(
                                                    course?._id,
                                                    !course.verified
                                                )
                                            }
                                        >
                                            {course.verified
                                                ? "Revoke Course Verification"
                                                : "Verify Course"}
                                        </Button>
                                    </>
                                )}
                            </>
                        }
                    />
                </Grid>
            ))}
        </Grid>
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
                        <Section title="Courses" spacing={10}>
                            {paginateCourses(courses)}
                        </Section>
                        {unverifiedCourses && (
                            <Section title="Unverified Courses" spacing={10}>
                                {paginateCourses(unverifiedCourses)}
                            </Section>
                        )}
                    </>
                }
                secondaryEl={
                    <>
                        <Section
                            title="School Officials"
                            loading={schoolOfficialsLoading}
                            infoMessage={
                                schoolOfficials?.length === 0 &&
                                `No ${school.name} school officials have an account`
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
                                `No ${school.name} students have an account`
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
