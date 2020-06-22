import { BASE_URL } from "../constants";
import { IUser } from "../types/user.types";

export async function logIn(options: { email: string; password: string }) {
    return await fetch(`${BASE_URL}/auth/log-in`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: options.email,
            password: options.password,
        }),
    }).then((res) => res.json());
}

export async function signUp(userData: IUser) {
    return await fetch(`${BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function me(accessToken: string) {
    return await fetch(`${BASE_URL}/auth/me`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    });
}
