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
    status: {
        fetchCourses: {
            loading: boolean;
            error: null | string;
            attempted: boolean;
        };
        createCourse: {
            loading: boolean;
            error: null | string;
            attempted: boolean;
        };
    };
    courses: ICourse[];
}

export interface ISearchState {
    status: {
        fetchSearchData: {
            loading: boolean;
            error: null | string;
        };
    };
    fields: {
        [key: string]: ISearchData[];
    };
}

export interface IStoreState {
    auth: IAuthState;
    course: ICourseState;
    search: ISearchState;
}

export type IGetState = () => IStoreState;
