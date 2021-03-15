import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";
import UnderConstruction from "../../components/ui/UnderConstruction";

const DashboardAppPage: React.FC<IWithAuthProps> = () => {
    return (
        <AppLayout header="Dashboard">
            <Head>
                <title>Dashboard - STEM-bound</title>
            </Head>
            <UnderConstruction />
        </AppLayout>
    );
};

export default withAuth(DashboardAppPage);
