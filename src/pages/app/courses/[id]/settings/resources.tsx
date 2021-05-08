import withAuth from "../../../../../components/hoc/withAuth";
import AppLayout from "../../../../../components/layouts/AppLayout";
import { EUserRoles } from "../../../../../utils/types";

const CourseResourcesAppPage: React.FC = () => {
    return <AppLayout></AppLayout>;
};

export default withAuth(CourseResourcesAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
