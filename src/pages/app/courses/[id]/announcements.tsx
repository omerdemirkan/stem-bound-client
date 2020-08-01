import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import { useRouter } from "next/router";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();

    return (
        <AppLayout>
            <h4>announcements</h4>
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);
