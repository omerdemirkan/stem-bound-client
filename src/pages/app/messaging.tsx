import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import classes from "../../styles/modules/app/messaging.module.css";

const Messaging: React.FC = () => {
    return (
        <AppLayout>
            <h4>messaging</h4>
        </AppLayout>
    );
};

export default withAuth(Messaging);
