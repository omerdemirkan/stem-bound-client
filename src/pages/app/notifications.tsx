import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const NotificationsAppPage: React.FC = () => {
    return (
        <AppLayout>
            <h4>notifications</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(NotificationsAppPage);
