import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Notifications: React.FC = () => {
    return (
        <AppLayout>
            <h4>notifications</h4>
        </AppLayout>
    );
};

export default withAuth(Notifications);
