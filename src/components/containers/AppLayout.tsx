import DesktopAppLayout from "./DesktopAppLayout";
import { IBreadCrumb, ETheme } from "../../utils/types";
import MobileAppLayout from "./MobileAppLayout";

export interface IAppLayoutProps {
    header?: string;
    breadCrumbs?: IBreadCrumb[];
    footerEl?: any;
    theme?: ETheme;
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children, ...props }) => {
    return (
        <DesktopAppLayout {...props}>
            <MobileAppLayout {...props}>{children}</MobileAppLayout>
        </DesktopAppLayout>
    );
};

export default AppLayout;
