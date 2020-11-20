import DesktopAppLayout from "./DesktopAppLayout";
import { IBreadCrumb, ETheme } from "../../utils/types";
import MobileAppLayout from "./MobileAppLayout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IAppLayoutProps {
    header?: string;
    breadCrumbs?: IBreadCrumb[];
    footerEl?: any;
    theme?: ETheme;
    mainContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children, ...props }) => {
    const smallScreen = useMediaQuery("(max-width: 900px)");
    if (props.header && !props.breadCrumbs) {
        props.breadCrumbs = [
            {
                label: props.header,
            },
        ];
    }

    return smallScreen ? (
        <MobileAppLayout {...props}>{children}</MobileAppLayout>
    ) : (
        <DesktopAppLayout {...props}>{children}</DesktopAppLayout>
    );
};

export default AppLayout;
