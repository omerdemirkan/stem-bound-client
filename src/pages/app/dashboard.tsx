import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Dashboard: React.FC = () => {
    return (
        <AppLayout>
            <h4>dashboard</h4>
        </AppLayout>
    );
};

export default withAuth(Dashboard);
