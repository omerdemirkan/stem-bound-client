import { IApiResponse } from "./api.types";
import { IUserOriginal, IUser } from "./user.types";

export type IApiAuthResponse = IApiResponse<{
    user: IUserOriginal;
    accessToken: string;
}>;

export type IAuthHelperResponse = {
    ok: boolean;
    message?: string;
};

export interface IAuthContextState {
    user: null | IUser;
    accessToken: null | string;
    authLoading: boolean;
    authAttempted: boolean;
    logIn(options: {
        email: string;
        password: string;
    }): Promise<IAuthHelperResponse>;
    logout: () => any;
    authenticateToken(token: string): Promise<IAuthHelperResponse>;
    sendVerificationEmail(
        userData: Partial<IUser>
    ): Promise<IAuthHelperResponse>;
    signUp(signUpToken: string): Promise<IAuthHelperResponse>;
    mutateUser: (user: IUser) => any;
}

export interface ISignUpOptions {
    signUpToken?: string;
}
