import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import Section from "../../components/ui/Section";
import SplitScreen from "../../components/ui/SplitScreen";
import CourseCard from "../../components/ui/CourseCard";
import UserCard from "../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationContext from "../../components/contexts/NotificationContext";
import MessagingContext from "../../components/contexts/MessagingContext";
import { useContext } from "react";
import {
    userSchoolFetcher,
    schoolCoursesFetcher,
    schoolSchoolOfficialsFetcher,
    schoolStudentsFetcher,
    enrollByCourseId,
    dropByCourseId,
    udpateCourseVerification,
    schoolFetcher,
} from "../../utils/services";
import {
    ENotificationTypes,
    EUserRoles,
    ICourse,
    IStudent,
} from "../../utils/types";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { contactUser } = useContext(MessagingContext);

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
        data: unverifiedCourses,
        revalidate: refetchUnverifiedCourses,
    } = useSWR(
        user.role === EUserRoles.INSTRUCTOR ||
            user.role === EUserRoles.SCHOOL_OFFICIAL
            ? "/user/school/courses?unverified=1"
            : null,
        schoolCoursesFetcher(schoolId, {
            unverified: true,
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
        verified: boolean
    ) {
        await udpateCourseVerification(courseId, verified);
        refetchCourses();
        refetchUnverifiedCourses();
    }

    const paginateCourses = (courses: ICourse[]) => (
        <Grid container spacing={2} style={{ maxWidth: "100%" }}>
            {courses?.map((course) => (
                <Grid item sm={12} md={6} lg={4} key={course._id}>
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
                        <Section
                            title="Courses"
                            spacing={10}
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
