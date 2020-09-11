import { IApiResponse } from "./api.types";
import { IUserOriginal, IUser } from "./user.types";

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
    signup: (userData: Partial<IUser>) => any;
    authenticateToken: (token: string) => any;
    mutateUser: (user: IUser) => any;
}
