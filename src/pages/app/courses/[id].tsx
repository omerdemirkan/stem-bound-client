import AppLayout from "../../../components/containers/AppLayout";
import { useRouter } from "next/router";
import withAuth from "../../../components/hoc/withAuth";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState, IWithAuthProps } from "../../../utils/types";
import { useEffect } from "react";
import { inspectCourse, fetchCourseAsync } from "../../../store/course";

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
            dispatch(inspectCourse(queryCourseId as string));
            dispatch(fetchCourseAsync(queryCourseId as string));
        },
        [queryCourseId]
    );
    return (
        <AppLayout>
            <pre>{JSON.stringify(inspectedCourse, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);
