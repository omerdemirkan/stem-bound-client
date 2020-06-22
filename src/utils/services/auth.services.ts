import { BASE_URL } from "../constants";

export async function logIn(options: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/log-in`, {
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
    return res.data;
}

export async function signUp(userData: any) {
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: userData,
    }).then((res) => res.json());
    return res.data;
}

export async function me(accessToken: string) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    }).then((res) => res.json());
    return res.data;
}
