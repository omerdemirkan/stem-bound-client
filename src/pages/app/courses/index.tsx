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

const CoursesAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { data: courses } = useSWR(`/courses`, userCoursesFetcher(user._id));

    return (
        <AppLayout header="Courses">
            <Head>
                <title>STEM-bound - My Courses</title>
            </Head>
            <h4>courses</h4>

            {user.role === EUserRoles.INSTRUCTOR ? (
                <Link href="/app/courses/create">
                    <a>
                        <button>CREATE COURSE</button>
                    </a>
                </Link>
            ) : null}

            {courses &&
                courses.map((course) => (
                    <CourseCard course={course} key={course._id} />
                ))}

            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
