import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../components/hoc/withAuth";
import Link from "next/link";
import CourseCard from "../../../components/ui/CourseCard";
import useSWR from "swr";
import { userCoursesFetcher } from "../../../utils/services";
import { EUserRoles } from "../../../utils/types";
import { useContext } from "react";
import AuthContext from "../../../components/contexts/AuthContext";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ActionBar from "../../../components/ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import Section from "../../../components/ui/Section";

const CoursesAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const {
        data: courses,
        isValidating: coursesLoading,
        error: coursesError,
    } = useSWR(`/courses`, userCoursesFetcher(user._id, user.role));
    const {
        data: unverifiedCourses,
        isValidating: unverifiedCoursesLoading,
    } = useSWR(
        user.role === EUserRoles.INSTRUCTOR ||
            user.role === EUserRoles.SCHOOL_OFFICIAL
            ? `/courses?unverified=true`
            : null,
        userCoursesFetcher(user._id, user.role, { unverified: true })
    );

    return (
        <AppLayout header="Courses">
            <Head>
                <title>STEM-bound - My Courses</title>
            </Head>

            <ActionBar
                startEl={
                    <Typography variant="h6" color="textSecondary">
                        My Courses
                    </Typography>
                }
            >
                {user.role === EUserRoles.INSTRUCTOR ? (
                    <Link href="/app/courses/create">
                        <a>
                            <Button variant="contained" color="primary">
                                CREATE COURSE
                            </Button>
                        </a>
                    </Link>
                ) : null}
            </ActionBar>

            <Section
                loading={coursesLoading}
                infoMessage={courses?.length === 0 && "No courses found"}
                errorMessage={
                    coursesError && "Couldn't load courses, an error occured"
                }
            >
                <Grid container spacing={2}>
                    {courses?.map((course) => (
                        <Grid item sm={12} md={6} lg={4} key={course._id}>
                            <CourseCard course={course} fullWidth noMargin />
                        </Grid>
                    ))}
                </Grid>
            </Section>

            {unverifiedCourses?.length !== 0 && (
                <Section
                    loading={unverifiedCoursesLoading}
                    title="Unverified Courses"
                >
                    <Grid container spacing={2}>
                        {unverifiedCourses?.map((course) => (
                            <Grid item sm={12} md={6} lg={4} key={course._id}>
                                <CourseCard
                                    course={course}
                                    fullWidth
                                    noMargin
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Section>
            )}

            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
