import { IUser, ICourse, ESearchFields } from ".";
import { ISearchData } from "./search.types";

export interface IStoreArrayOptions {
    concat?: boolean;
    sort?: (...args) => any;
    filter?: (...args) => any;
}

export interface IAuthState {
    loading: boolean;
    accessToken: null | string;
    user: IUser | null;
    authAttempted: boolean;
}

export interface ICourseState {
    loading: boolean;
    fetchAttempted: boolean;
    courses: ICourse[];
}

export interface ISearchState {
    loading: boolean;
    fields: {
        [key: string]: ISearchData[];
    };
}

export interface IStoreState {
    auth: IAuthState;
    course: ICourseState;
    search: ISearchState;
}
