import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Schedule: React.FC = () => {
    return (
        <AppLayout>
            <h4>schedule</h4>
        </AppLayout>
    );
};

export default withAuth(Schedule);
