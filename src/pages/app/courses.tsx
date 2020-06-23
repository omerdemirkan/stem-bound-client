import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Courses: React.FC = () => {
    return (
        <AppLayout>
            <h4>courses</h4>
        </AppLayout>
    );
};

export default withAuth(Courses);
