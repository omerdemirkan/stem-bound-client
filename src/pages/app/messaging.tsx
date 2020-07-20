import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const MessagingAppPage: React.FC = () => {
    return (
        <AppLayout>
            <h4>messaging</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);
