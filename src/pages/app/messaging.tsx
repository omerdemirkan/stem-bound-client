import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Messaging: React.FC = () => {
    return (
        <AppLayout>
            <h4>messaging</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(Messaging);