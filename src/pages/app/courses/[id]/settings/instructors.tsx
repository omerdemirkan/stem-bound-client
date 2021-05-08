import withAuth from "../../../../../components/hoc/withAuth";
import AppLayout from "../../../../../components/layouts/AppLayout";
import { EUserRoles } from "../../../../../utils/types";

const CourseInstructorsAppPage: React.FC = () => {
    return <AppLayout></AppLayout>;
};

export default withAuth(CourseInstructorsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
