export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

export function isValidUrl(s: string): boolean {
    return urlRegex.test(s);
}

export const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export function isValidEmail(s: string): boolean {
    return emailRegex.test(s);
}

export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export function isValidPassword(s: string): boolean {
    return passwordRegex.test(s);
}

export const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/;

export function isValidObjectId(s: string): boolean {
    return objectIdRegex.test(s);
}
