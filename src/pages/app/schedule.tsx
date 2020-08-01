import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const ScheduleAppPage: React.FC = () => {
    return (
        <AppLayout>
            <h4>schedule</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(ScheduleAppPage);
