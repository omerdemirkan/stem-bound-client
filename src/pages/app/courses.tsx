import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Courses: React.FC = () => {
    return (
        <AppLayout>
            <h4>courses</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(Courses);
