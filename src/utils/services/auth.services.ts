import { apiClient } from "./client.services";

export async function logIn(options: {
    email: string;
    password: string;
}): Promise<{ user: any; accessToken: string }> {
    const res = await apiClient.post("/auth/log-in", {
        email: options.email,
        password: options.password,
    });
    return res.data;
}

export async function signUp(
    userData: any
): Promise<{ user: any; accessToken: string }> {
    const res = await apiClient.post("/auth/sign-up", userData);
    return res.data;
}

export async function me(
    accessToken: string
): Promise<{ user: any; accessToken: string }> {
    const res = await apiClient.get("/auth/me");
    return res.data;
}
