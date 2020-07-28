import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../../../utils/types";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const queryCourseId = router.query.id;
    const { inspectedCourse } = useSelector(
        (state: IStoreState) => state.course
    );

    return (
        <AppLayout>
            <h4>{inspectedCourse?.title} announcements</h4>
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);
