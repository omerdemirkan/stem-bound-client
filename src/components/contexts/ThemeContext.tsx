import { MuiThemeProvider } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "../../utils/constants";
import { getTheme } from "../../utils/services";
import { IThemeContextState, ETheme } from "../../utils/types";

const initialThemeContextState: IThemeContextState = {
    theme: ETheme.LIGHT,
    setTheme: () => {},
};

const ThemeContext = createContext(initialThemeContextState);

export default ThemeContext;

export const ThemeProvider: React.FC = ({ children }) => {
    const router = useRouter();
    const [theme, setTheme] = useState<ETheme>(getTheme());

    function handleChangeTheme(theme: ETheme) {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    }

    const displayTheme = router?.pathname?.includes("/app")
        ? theme
        : ETheme.LIGHT;

    return (
        <ThemeContext.Provider
            value={{
                theme: displayTheme,
                setTheme: handleChangeTheme,
            }}
        >
            <MuiThemeProvider
                theme={displayTheme === ETheme.LIGHT ? lightTheme : darkTheme}
            >
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
