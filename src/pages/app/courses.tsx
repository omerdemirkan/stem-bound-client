import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import classes from "../../styles/modules/app/courses.module.css";

const Courses: React.FC = () => {
    return (
        <AppLayout>
            <h4>courses</h4>
        </AppLayout>
    );
};

export default withAuth(Courses);
