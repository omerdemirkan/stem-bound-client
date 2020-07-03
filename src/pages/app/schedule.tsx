import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import classes from "../../styles/modules/app/schedule.module.css";

const Schedule: React.FC = () => {
    return (
        <AppLayout>
            <h4>schedule</h4>
        </AppLayout>
    );
};

export default withAuth(Schedule);
