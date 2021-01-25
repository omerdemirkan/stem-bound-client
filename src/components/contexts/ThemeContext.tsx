import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { createContext, useState } from "react";
import { getTheme } from "../../utils/services";
import { IThemeContextState, ETheme } from "../../utils/types";

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#826EFD",
            dark: "#5241BF",
            light: "#9D8DFE",
        },
        secondary: {
            main: "#E05050",
            light: "#E98585",
            dark: "#A92A2A",
        },
        info: {
            main: "#826EFD",
            dark: "#5241BF",
            light: "#A698FF",
        },
        error: {
            main: "#E05050",
            light: "#E98585",
            dark: "#A92A2A",
        },
        warning: {
            main: "#D3D724",
            light: "#E9EB78",
            dark: "#B0B200",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
});
const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#826EFD",
            dark: "#5241BF",
            light: "#9D8DFE",
        },
        secondary: {
            main: "#E05050",
            light: "#E98585",
            dark: "#A92A2A",
        },
        info: {
            main: "#826EFD",
            dark: "#5241BF",
            light: "#A698FF",
        },
        warning: {
            main: "#D3D724",
            light: "#E9EB78",
            dark: "#B0B200",
        },
        error: {
            main: "#E05050",
            light: "#E98585",
            dark: "#A92A2A",
        },
        text: {
            primary: "#F8F8F8",
            secondary: "#CACACA",
        },
        background: {
            default: "#333333",
            paper: "#424242",
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
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
