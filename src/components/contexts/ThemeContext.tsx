import { MuiThemeProvider } from "@material-ui/core/styles";
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
    const [theme, setTheme] = useState<ETheme>(getTheme());
    function handleChangeTheme(theme: ETheme) {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    }
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: handleChangeTheme,
            }}
        >
            <MuiThemeProvider
                theme={theme === ETheme.LIGHT ? lightTheme : darkTheme}
            >
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
