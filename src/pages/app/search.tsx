import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";

const Search: React.FC = () => {
    return (
        <AppLayout>
            <h4>search</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(Search);