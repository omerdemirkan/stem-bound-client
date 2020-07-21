import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";

const DashboardAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    return (
        <AppLayout>
            <h4>dashboard</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(DashboardAppPage);
