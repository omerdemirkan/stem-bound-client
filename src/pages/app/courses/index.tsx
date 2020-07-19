import AppLayout from "../../../components/ui/AppLayout";
import withAuth from "../../../components/hoc/withAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCoursesAsync } from "../../../store/course";
import { IStoreState } from "../../../utils/types";
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
            {user?.role ? (
                <Link href="/app/courses/create">
                    <a>
                        <button>CREATE COURSE</button>
                    </a>
                </Link>
            ) : null}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
