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
};

const ThemeContext = createContext(initialThemeContextState);

const ThemeProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<IThemeContextState>({
        theme: getTheme() as ETheme,
    });
    const updateState = (updates) =>
        setState((prev) => ({ ...prev, ...updates }));

    const theme = state.theme === ETheme.LIGHT ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider
            value={{
                ...state,
            }}
        >
            <MuiThemeProvider theme={theme}> {children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
