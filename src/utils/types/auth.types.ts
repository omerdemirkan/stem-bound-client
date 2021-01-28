import { IApiResponse } from "./api.types";
import { IUserOriginal, IUser } from "./user.types";

export type IApiAuthResponse = IApiResponse<{
    user: IUserOriginal;
    accessToken: string;
}>;

export type IAuthHelperResponse = {
    ok: boolean;
    error?: Error;
    message?: string;
};

export interface IAuthContextState {
    user: null | IUser;
    accessToken: null | string;
    authLoading: boolean;
    authAttempted: boolean;
    login(options: {
        email: string;
        password: string;
    }): Promise<IAuthHelperResponse>;
    logout: () => any;
    signup(userData: Partial<IUser>): Promise<IAuthHelperResponse>;
    authenticateToken(token: string): Promise<IAuthHelperResponse>;
    verifyemail(signUpToken: string): Promise<IAuthHelperResponse>;
    mutateUser: (user: IUser) => any;
}

export interface ISignUpOptions {
    signUpToken?: string;
}
