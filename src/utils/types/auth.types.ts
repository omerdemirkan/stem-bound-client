import { IApiResponse } from "./api.types";
import { EUserRoles, IUserOriginal } from "./user.types";

export type IApiAuthResponse = IApiResponse<{
    user: IUserOriginal;
    accessToken: string;
}>;

export interface IWithAuthOptions {
    allowedUserRoles?: EUserRoles[];
}
