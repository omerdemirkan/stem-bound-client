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

export function getTheme() {
    try {
        return localStorage.getItem("theme");
    } catch {
        return ETheme.LIGHT;
    }
}

export function setTheme(theme: ETheme) {
    return localStorage.setItem("theme", theme);
}
