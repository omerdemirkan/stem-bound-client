import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Dashboard: React.FC = () => {
    return (
        <AppLayout>
            <h4>dashboard</h4>
        </AppLayout>
    );
};

export default withAuth(Dashboard);
