import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps } from "../../utils/types";

const MessagingAppPage: React.FC<IWithAuthProps> = () => {
    return (
        <AppLayout>
            <h4>messaging</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);
