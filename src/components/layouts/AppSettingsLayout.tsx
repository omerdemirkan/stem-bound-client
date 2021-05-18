import SplitScreen from "../ui/SplitScreen";
import AppLayout, { IAppLayoutProps } from "./AppLayout";

export interface IAppSettingsLayoutProps extends IAppLayoutProps {
    navigationEl: any;
}

const AppSettingsLayout: React.FC<IAppSettingsLayoutProps> = ({
    navigationEl,
    children,
    ...appLayoutProps
}) => {
    return (
        <AppLayout {...appLayoutProps}>
            <SplitScreen
                mainEl={children}
                secondaryEl={navigationEl}
                secondaryWidth="280px"
                order="secondary-first"
            />
        </AppLayout>
    );
};

export default AppSettingsLayout;
