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
    if (props.header && !props.breadCrumbs) {
        props.breadCrumbs = [
            {
                label: props.header,
            },
        ];
    }
    return (
        <MobileAppLayout {...props}>
            <DesktopAppLayout {...props}>{children}</DesktopAppLayout>
        </MobileAppLayout>
    );
};

export default AppLayout;
