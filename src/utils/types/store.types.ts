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
        fetchCourses: EStateStatus;
        createCourse: EStateStatus;
    };
    courses: ICourse[];
}

export interface IChatState {
    status: {
        fetchChats: EStateStatus;
        fetchChat: EStateStatus;
        createChat: EStateStatus;
        sendMessage: EStateStatus;
    };
    chats: IChat[];
    inspectedChat: IChat;
    textField: string;
}

export interface ISearchState {
    status: {
        fetchSearchData: EStateStatus;
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

export interface IAsyncActionOptions<T> {
    onSuccess?: (T) => any;
    onFailure?: (Error) => any;
}

export enum EStateStatus {
    "idle",
    "loading",
    "successful",
    "failed",
}
