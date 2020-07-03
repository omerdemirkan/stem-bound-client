import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import classes from "../../styles/modules/app/notifications.module.css";

const Notifications: React.FC = () => {
    return (
        <AppLayout>
            <h4>notifications</h4>
        </AppLayout>
    );
};

export default withAuth(Notifications);
