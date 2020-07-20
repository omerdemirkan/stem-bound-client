import AppLayout from "../../../components/ui/AppLayout";
import withAuth from "../../../components/hoc/withAuth";
import Link from "next/link";
import {
    fetchUserCoursesAsync,
    resetFetchCourseStatus,
} from "../../../store/course";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState, EUserRoles, ICourse } from "../../../utils/types";

const CoursesAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        auth: { user },
        course: {
            courses,
            status: {
                fetchCourses: { loading, error },
            },
        },
    }: IStoreState = useSelector((state: IStoreState) => state);

    useEffect(() => () => dispatch(resetFetchCourseStatus()), []);

    useEffect(
        function () {
            if (user?._id) {
                dispatch(fetchUserCoursesAsync(user._id));
            }
        },
        [user?._id]
    );

    return (
        <AppLayout>
            <h4>courses</h4>

            {user?.role === EUserRoles.INSTRUCTOR ? (
                <Link href="/app/courses/create">
                    <a>
                        <button>CREATE COURSE</button>
                    </a>
                </Link>
            ) : null}

            {loading ? <h6>Loading...</h6> : null}

            {courses.map((course) => (
                <div key={course._id}>
                    <Link
                        href="/app/courses/[id]"
                        as={`/app/courses/${course._id}`}
                    >
                        <a>{course.title}</a>
                    </Link>
                    <pre>{JSON.stringify(course, null, 2)}</pre>
                </div>
            ))}

            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
