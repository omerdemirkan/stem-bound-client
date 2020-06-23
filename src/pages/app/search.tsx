import AppLayout from "../../components/AppLayout";
import withAuth from "../../hoc/withAuth";

const Search: React.FC = () => {
    return (
        <AppLayout>
            <h4>search</h4>
        </AppLayout>
    );
};

export default withAuth(Search);
