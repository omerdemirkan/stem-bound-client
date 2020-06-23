import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Messaging: React.FC = () => {
    return (
        <AppLayout>
            <h4>messaging</h4>
        </AppLayout>
    );
};

export default withAuth(Messaging);
