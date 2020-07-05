import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Schedule: React.FC = () => {
    return (
        <AppLayout>
            <h4>schedule</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(Schedule);
