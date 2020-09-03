import { IApiResponse } from "./api.types";
import { EUserRoles, IUserOriginal, IUser } from "./user.types";

export type IApiAuthResponse = IApiResponse<{
    user: IUserOriginal;
    accessToken: string;
}>;

export interface IAuthContextState {
    user: null | IUser;
    accessToken: null | string;
    authLoading: boolean;
    authAttempted: boolean;
    login: (options: { email: string; password: string }) => any;
    logout: () => any;
    signup: (options: { email: string; password: string }) => any;
    authenticateToken: (token: string) => any;
    mutateUser: (user: IUser) => any;
}
