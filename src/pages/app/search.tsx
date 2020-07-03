import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import classes from "../../styles/modules/app/search.module.css";

const Search: React.FC = () => {
    return (
        <AppLayout>
            <h4>search</h4>
        </AppLayout>
    );
};

export default withAuth(Search);
