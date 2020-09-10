import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { createContext, useState } from "react";
import { IThemeContextState, ETheme } from "../../utils/types";
import { getTheme } from "../../utils/services";

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#826efd",
        },
    },
});
const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#826efd",
        },
    },
});

const initialThemeContextState: IThemeContextState = {
    theme: ETheme.LIGHT,
    toggleTheme: () => {},
};

const ThemeContext = createContext(initialThemeContextState);

export default ThemeContext;

export const ThemeProvider: React.FC = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(
        getTheme() === ETheme.DARK
    );

    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider
            value={{
                theme: darkMode ? ETheme.DARK : ETheme.LIGHT,
                toggleTheme: () => setDarkMode((prev) => !prev),
            }}
        >
            <MuiThemeProvider theme={theme}> {children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
