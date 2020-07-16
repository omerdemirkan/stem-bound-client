import { IUserOriginal, IUser } from "../types";

export function mapUserData(users: IUserOriginal[]): IUser[] {
    return users.map((user) => user);
}
