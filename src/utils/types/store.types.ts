import { IUser, ICourse, ESearchFields } from ".";
import { ISearchData } from "./search.types";
import { IChat } from "./chat.types";

export interface IStoreArrayOptions {
    concat?: boolean;
    sort?: (...args) => any;
    filter?: (...args) => any;
    uniqueKey?: string;
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

export interface IChatState {
    status: {
        fetchChats: {
            loading: boolean;
            error: null | string;
            attempted: boolean;
        };
    };
    chats: IChat[];
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
    chat: IChatState;
}

export type IGetState = () => IStoreState;
