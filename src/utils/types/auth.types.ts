import { IApiResponse } from "./api.types";
import { EUserRoles, IUserOriginal, IUser } from "./user.types";

export type IApiAuthResponse = IApiResponse<{
    user: IUserOriginal;
    accessToken: string;
}>;

export interface IWithAuthOptions {
    allowedUserRoles?: EUserRoles[];
}

export interface IAuthContextState {
    user: null | IUser;
    accessToken: null | string;
    authLoading: boolean;
    authAttempted: boolean;
}
