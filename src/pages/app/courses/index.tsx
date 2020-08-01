import AppLayout from "../../../components/containers/AppLayout";
import withAuth from "../../../components/hoc/withAuth";
import Link from "next/link";
import CourseCard from "../../../components/ui/CourseCard";
import useSWR from "swr";
import { userCoursesFetcher } from "../../../utils/services";
import { EUserRoles, IWithAuthProps } from "../../../utils/types";

const CoursesAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const { data: courses } = useSWR(
        `/api/v1/user/${user._id}/courses`,
        userCoursesFetcher(user._id)
    );

    return (
        <AppLayout>
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
