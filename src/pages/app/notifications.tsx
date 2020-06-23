import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Notifications: React.FC = () => {
    return (
        <AppLayout>
            <h4>notifications</h4>
        </AppLayout>
    );
};

export default withAuth(Notifications);
