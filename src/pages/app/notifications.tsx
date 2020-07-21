import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";

const NotificationsAppPage: React.FC<IWithAuthProps> = () => {
    return (
        <AppLayout>
            <h4>notifications</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(NotificationsAppPage);
