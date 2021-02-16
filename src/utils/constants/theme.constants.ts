import { createMuiTheme } from "@material-ui/core";
import { ETheme } from "../types";

export const themes = [ETheme.DARK, ETheme.LIGHT];

export const lightTheme = createMuiTheme({
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
            primary: "#212121",
            secondary: "#282828",
        },
    },
});
export const darkTheme = createMuiTheme({
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
            default: "#212121",
            paper: "#282828",
        },
    },
});
