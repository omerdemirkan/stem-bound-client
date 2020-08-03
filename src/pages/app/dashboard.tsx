import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";

const DashboardAppPage: React.FC<IWithAuthProps> = () => {
    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Dashboard</title>
            </Head>
            <h4>dashboard</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(DashboardAppPage);
