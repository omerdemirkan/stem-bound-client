import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";

const ScheduleAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    return (
        <AppLayout>
            <h4>schedule</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(ScheduleAppPage);
