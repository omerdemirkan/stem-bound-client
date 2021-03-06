import { apiClient, appendQueriesToUrl } from "../helpers";
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

export function sendVerificationEmail(
    userData: Partial<IUserOriginal>
): Promise<{ message: string }> {
    return apiClient.post("/auth/send-verification-email", userData);
}

export function signUp(signUpToken: string): Promise<IApiAuthResponse> {
    return apiClient.post(
        appendQueriesToUrl("/auth/sign-up", {
            sign_up_token: signUpToken,
        }),
        {}
    );
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

export function setSignUpEmailRecipient(email: string): void {
    localStorage.setItem("sign-up-email-recipient", email);
}

export function getSignUpEmailRecipient(): string | null {
    try {
        return localStorage.getItem("sign-up-email-recipient");
    } catch (e) {
        return null;
    }
}
