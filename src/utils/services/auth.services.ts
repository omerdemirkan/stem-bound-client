import { apiClient } from "../helpers";

export function logIn(options: {
    email: string;
    password: string;
}): Promise<{ message: string; data: { user: any; accessToken: string } }> {
    return apiClient.post("/auth/log-in", {
        email: options.email,
        password: options.password,
    });
}

export function signUp(
    userData: any
): Promise<{ message: string; data: { user: any; accessToken: string } }> {
    return apiClient.post("/auth/sign-up", userData);
}

export function me(
    accessToken: string
): Promise<{ message: string; data: { user: any; accessToken: string } }> {
    // Note: I'm not setting the global apiClient auth header before it has been verified.
    // If this looks cumbersome, thats why.
    return apiClient.get("/auth/me", {
        headers: {
            ...apiClient.getDefaultConfig().headers,
            authorization: `Bearer ${accessToken}`,
        },
    });
}