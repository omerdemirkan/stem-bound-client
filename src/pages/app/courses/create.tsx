import withAuth from "../../../components/hoc/withAuth";
import { EUserRoles } from "../../../utils/types";

const CreateCourseAppPage: React.FC = () => {
    return <div></div>;
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});
