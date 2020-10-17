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
} from "../../utils/services";
import { ENotificationTypes, EUserRoles, IStudent } from "../../utils/types";
import { useContext } from "react";
import Section from "../../components/ui/Section";
import SplitScreen from "../../components/ui/SplitScreen";
import CourseCard from "../../components/ui/CourseCard";
import UserCard from "../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationContext from "../../components/contexts/NotificationContext";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { data: school } = useSWR(
        "/user/school",
        userSchoolFetcher(user._id)
    );

    const { createAlert, createSnackbar } = useContext(NotificationContext);

    const { data: courses, revalidate: revalidateCourses } = useSWR(
        "/user/school/courses",
        schoolCoursesFetcher((user as IStudent).meta.school)
    );
    const { data: schoolOfficials } = useSWR(
        "/user/school/school-officials",
        schoolSchoolOfficialsFetcher((user as IStudent).meta.school)
    );
    const { data: schoolStudents } = useSWR(
        "/user/school/students",
        schoolStudentsFetcher((user as IStudent).meta.school)
    );

    async function handleEnrollInCourse(courseId: string) {
        try {
            await enrollByCourseId(courseId);
            createSnackbar({
                text: "Successfully enrolled in course",
                type: ENotificationTypes.SUCCESS,
            });
            await revalidateCourses();
        } catch (e) {
            createSnackbar({
                text: "An error occured: Cannot enroll",
                type: ENotificationTypes.INFO,
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
                        type: ENotificationTypes.SUCCESS,
                    });
                    await revalidateCourses();
                } catch (e) {
                    createSnackbar({
                        text: "An error occured: Cannot drop course",
                        type: ENotificationTypes.INFO,
                    });
                }
            },
        });
    }

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
                        <Section spacing={15}>
                            <Typography variant="h5" gutterBottom>
                                Courses
                            </Typography>
                            <Grid container spacing={3}>
                                {courses?.map((course) => (
                                    <Grid item xs={12} xl={6}>
                                        <CourseCard
                                            course={course}
                                            key={course._id}
                                            fullWidth
                                            footerEl={
                                                user?.role ===
                                                    EUserRoles.STUDENT &&
                                                (course?.meta.students.includes(
                                                    user?._id
                                                ) ? (
                                                    <Button
                                                        color="secondary"
                                                        onClick={() =>
                                                            handleDropCourse(
                                                                course._id
                                                            )
                                                        }
                                                    >
                                                        Drop Course
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        color="primary"
                                                        onClick={() =>
                                                            handleEnrollInCourse(
                                                                course._id
                                                            )
                                                        }
                                                    >
                                                        Enroll
                                                    </Button>
                                                ))
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Section>
                    </>
                }
                secondaryEl={
                    <>
                        <Section>
                            <Typography variant="h6" align="center">
                                School Officials
                            </Typography>
                            {schoolOfficials?.map((schoolOfficial) => (
                                <UserCard
                                    user={schoolOfficial}
                                    key={schoolOfficial._id}
                                />
                            ))}
                        </Section>
                        <Section>
                            <Typography variant="h6" align="center">
                                Students
                            </Typography>
                            {schoolStudents?.map((student) => (
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
