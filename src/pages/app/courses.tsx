import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Courses: React.FC = () => {
    return (
        <AppLayout>
            <h4>courses</h4>
        </AppLayout>
    );
};

export default withAuth(Courses);
