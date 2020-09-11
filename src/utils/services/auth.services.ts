import { apiClient } from "../helpers";
import { IApiResponse } from "../types/api.types";
import { IApiAuthResponse } from "../types/auth.types";
import { IUserOriginal } from "../types";

export function logIn({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<IApiAuthResponse> {
    return apiClient.post("/auth/log-in", {
        email,
        password,
    });
}

export function signUp(
    userData: Partial<IUserOriginal>
): Promise<IApiAuthResponse> {
    return apiClient.post("/auth/sign-up", userData);
}

export function me(accessToken: string): Promise<IApiAuthResponse> {
    // Note: I'm not setting the global apiClient auth header before it has been verified.
    // If this looks cumbersome, thats why.
    return apiClient.get("/auth/me", {
        headers: {
            ...apiClient.getDefaultConfig().headers,
            authorization: `Bearer ${accessToken}`,
        },
    });
}
