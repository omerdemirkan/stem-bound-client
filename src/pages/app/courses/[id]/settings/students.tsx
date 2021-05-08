import withAuth from "../../../../../components/hoc/withAuth";
import AppLayout from "../../../../../components/layouts/AppLayout";
import { EUserRoles } from "../../../../../utils/types";

const CourseStudentsAppPage: React.FC = () => {
    return <AppLayout></AppLayout>;
};

export default withAuth(CourseStudentsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
