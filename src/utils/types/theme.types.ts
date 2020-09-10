export enum ETheme {
    DARK = "DARK",
    LIGHT = "LIGHT",
}

export interface IThemeContextState {
    theme: ETheme;
    toggleTheme: () => void;
}
