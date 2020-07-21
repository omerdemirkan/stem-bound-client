import AppLayout from "../../../components/containers/AppLayout";
import { useRouter } from "next/router";
import withAuth from "../../../components/hoc/withAuth";
import { useSelector } from "react-redux";
import { IStoreState, IWithAuthProps } from "../../../utils/types";

const CourseAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const router = useRouter();
    const { courses } = useSelector((state: IStoreState) => state.course);
    const course = courses.find((course) => course._id === router.query.id);
    return (
        <AppLayout>
            <pre>{JSON.stringify(course, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);
