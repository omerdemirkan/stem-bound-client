import DesktopAppLayout from "./DesktopAppLayout";
import { IBreadCrumb } from "../../utils/types";

interface Props {
    header?: string;
    breadCrumbs?: IBreadCrumb[];
    footerEl?: any;
}

const AppLayout: React.FC<Props> = ({ children, ...props }) => {
    return <DesktopAppLayout {...props}>{children}</DesktopAppLayout>;
};

export default AppLayout;
