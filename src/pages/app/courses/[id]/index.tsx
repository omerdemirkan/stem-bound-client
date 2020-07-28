import AppLayout from "../../../../components/containers/AppLayout";
import { useRouter } from "next/router";
import withAuth from "../../../../components/hoc/withAuth";
import { inspectCourse, fetchCourseAsync } from "../../../../store/course";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState, IWithAuthProps } from "../../../../utils/types";
import { useEffect } from "react";
import Link from "next/link";

const CourseAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const dispatch = useDispatch();
    const { inspectedCourse } = useSelector(
        (state: IStoreState) => state.course
    );

    useEffect(
        function () {
            if (!inspectedCourse) {
                dispatch(inspectCourse(queryCourseId as string));
            }
            dispatch(fetchCourseAsync(queryCourseId as string));
        },
        [queryCourseId]
    );
    return (
        <AppLayout>
            <h4>{inspectedCourse?.title}</h4>
            <pre>{JSON.stringify(inspectedCourse, null, 2)}</pre>
            <Link
                href="/app/courses/[id]/meetings"
                as={`/app/courses/${inspectedCourse?._id}/meetings`}
            >
                <a>
                    <button>MEETINGS</button>
                </a>
            </Link>
            <Link
                href="/app/courses/[id]/announcements"
                as={`/app/courses/${inspectedCourse?._id}/announcements`}
            >
                <a>
                    <button>ANNOUNCEMENTS</button>
                </a>
            </Link>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);
