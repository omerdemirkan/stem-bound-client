import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Head from "next/head";
import UnderConstruction from "../../components/ui/UnderConstruction";

const NotificationsAppPage: React.FC = () => {
    return (
        <AppLayout header="Notifications">
            <Head>
                <title>Notifications - STEM-bound</title>
            </Head>
            <UnderConstruction />
        </AppLayout>
    );
};

export default withAuth(NotificationsAppPage);
