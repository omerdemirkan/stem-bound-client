import AppLayout from "../../components/containers/AppLayout";
import Section from "../../components/ui/Section";
import Switch from "@material-ui/core/Switch";
import { useContext } from "react";
import { ETheme } from "../../utils/types";
import ThemeContext from "../../components/contexts/ThemeContext";
import withAuth from "../../components/hoc/withAuth";

const SettingsAppPage: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <AppLayout header="Settings">
            <Section title="Dark theme (experimental)" noDivider>
                <Switch
                    checked={theme === ETheme.DARK}
                    onChange={(e, value) =>
                        setTheme(value ? ETheme.DARK : ETheme.LIGHT)
                    }
                    name="Dark Theme"
                    color="default"
                />
            </Section>
        </AppLayout>
    );
};

export default withAuth(SettingsAppPage);
