import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import { IStoreState } from "../../../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MeetingsAppPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryCourseId = router.query.id;
    const { inspectedCourse } = useSelector(
        (state: IStoreState) => state.course
    );

    useEffect(function () {
        if (inspectedCourse) {
        }
    }, []);
    return (
        <AppLayout>
            <h4>{inspectedCourse?.title} meetings</h4>
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);
