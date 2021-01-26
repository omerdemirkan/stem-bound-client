import { ETheme } from "../types";

export function getSavedPassword() {
    return localStorage.getItem("saved-password");
}

export function setSavedPassword(password: string) {
    localStorage.setItem("saved-password", password);
}

export function deleteSavedPassword() {
    localStorage.removeItem("saved-password");
}

export function getTheme(): ETheme {
    try {
        const theme = localStorage.getItem("theme") as ETheme;

        // Since localstorage is slow, to not needlessly delay first contentful paint.
        if (!theme) (async () => localStorage.setItem("theme", "LIGHT"))();
        return theme || ETheme.LIGHT;
    } catch {
        return ETheme.LIGHT;
    }
}

export function setTheme(theme: ETheme) {
    return localStorage.setItem("theme", theme);
}
