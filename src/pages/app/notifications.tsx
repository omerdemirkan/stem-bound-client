import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Head from "next/head";

const NotificationsAppPage: React.FC = () => {
    return (
        <AppLayout header="Notifications">
            <Head>
                <title>STEM-bound - Notifications</title>
            </Head>
            <h4>notifications</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(NotificationsAppPage);
