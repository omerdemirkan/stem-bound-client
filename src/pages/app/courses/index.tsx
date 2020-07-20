import AppLayout from "../../../components/ui/AppLayout";
import withAuth from "../../../components/hoc/withAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserCoursesAsync,
    resetFetchCourseStatus,
} from "../../../store/course";
import { IStoreState, EUserRoles, ICourse } from "../../../utils/types";
import Link from "next/link";

const CoursesAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        auth: { user, loading: authLoading },
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

            {courses.map((course: ICourse) => (
                <h6>{course.title}</h6>
            ))}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
