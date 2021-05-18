import Section from "../../../components/ui/Section";
import Switch from "@material-ui/core/Switch";
import { useContext } from "react";
import { ETheme } from "../../../utils/types";
import ThemeContext from "../../../components/contexts/ThemeContext";
import withAuth from "../../../components/hoc/withAuth";
import Head from "next/head";
import AppSettingsLayout from "../../../components/layouts/AppSettingsLayout";
import { SettingsNavigation } from ".";

const SettingsAppPage: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <AppSettingsLayout
            header="Preferences"
            navigationEl={<SettingsNavigation activeLabel="Preferences" />}
        >
            <Head>
                <title>Preferences - STEM-bound</title>
            </Head>
            <Section title="Dark theme (experimental)" noDivider spacing="sm">
                <Switch
                    checked={theme === ETheme.DARK}
                    onChange={(e, value) =>
                        setTheme(value ? ETheme.DARK : ETheme.LIGHT)
                    }
                    name="Dark Theme"
                    color="default"
                />
            </Section>
        </AppSettingsLayout>
    );
};

export default withAuth(SettingsAppPage);
