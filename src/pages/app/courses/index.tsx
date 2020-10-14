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
    const { data: courses } = useSWR(`/courses`, userCoursesFetcher(user._id));

    return (
        <AppLayout header="Courses">
            <Head>
                <title>STEM-bound - My Courses</title>
            </Head>

            <ActionBar
                startEl={<Typography variant="h5">My Courses</Typography>}
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

            {courses && (
                <Section>
                    <Grid container spacing={3}>
                        {courses.map((course) => (
                            <Grid item xs={12} lg={6} xl={4}>
                                <CourseCard
                                    course={course}
                                    key={course._id}
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
