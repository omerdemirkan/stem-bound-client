import {
    ICourse,
    IStoreArrayOptions,
    ICourseState,
    ICourseOriginal,
    IGetState,
} from "../utils/types";
import { fetchCoursesByUserId, createCourse } from "../utils/services";
import { configureArrayState, clone } from "../utils/helpers";

enum actionTypes {
    RESET_CREATE_COURSE_STATUS = "stem-bound/course/RESET_CREATE_COURSE_STATUS",
    RESET_FETCH_COURSE_STATUS = "stem-bound/course/RESET_FETCH_COURSE_STATUS",

    FETCH_USER_COURSES_START = "stem-bound/course/FETCH_USER_COURSES_START",
    FETCH_USER_COURSES_SUCCESS = "stem-bound/course/FETCH_USER_COURSES_SUCCESS",
    FETCH_USER_COURSES_FAILURE = "stem-bound/course/FETCH_USER_COURSES_FAILURE",
    CREATE_COURSE_START = "stem-bound/course/CREATE_COURSE_START",
    CREATE_COURSE_SUCCESS = "stem-bound/course/CREATE_COURSE_SUCCESS",
    CREATE_COURSE_FAILURE = "stem-bound/course/CREATE_COURSE_FAILURE",
}

const initialState: ICourseState = {
    courses: [],
    status: {
        fetchCourses: {
            loading: false,
            error: null,
            attempted: false,
        },
        createCourse: {
            loading: false,
            error: null,
            attempted: false,
        },
    },
};

const reducerHandlers = {
    [actionTypes.RESET_CREATE_COURSE_STATUS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse = initialState.status.createCourse;
        return newState;
    },

    [actionTypes.RESET_FETCH_COURSE_STATUS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchCourses = initialState.status.fetchCourses;
        return newState;
    },

    [actionTypes.FETCH_USER_COURSES_START]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchCourses.loading = true;
        return newState;
    },

    [actionTypes.FETCH_USER_COURSES_FAILURE]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchCourses.loading = false;
        newState.status.fetchCourses.attempted = true;
        newState.status.fetchCourses.error = action.error;
        return newState;
    },

    [actionTypes.FETCH_USER_COURSES_SUCCESS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.courses = action.courses;
        newState.status.fetchCourses.loading = false;
        newState.status.fetchCourses.attempted = true;
        newState.status.fetchCourses.error = null;
        return newState;
    },

    [actionTypes.CREATE_COURSE_START]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.status.createCourse.loading = true;
        return newState;
    },

    [actionTypes.CREATE_COURSE_FAILURE]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse.loading = false;
        newState.status.createCourse.attempted = true;
        newState.status.createCourse.error = action.error;
        return newState;
    },

    [actionTypes.CREATE_COURSE_SUCCESS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse.loading = false;
        newState.status.createCourse.attempted = true;
        newState.status.createCourse.error = null;
        newState.courses = action.courses;
        return newState;
    },
};

export default function courseReducer(
    state = initialState,
    action
): ICourseState {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
        return state;
    }
}

// STATUS RESET ACTIONS
export const resetCreateCourseStatus = () => ({
    type: actionTypes.RESET_CREATE_COURSE_STATUS,
});

export const resetFetchCourseStatus = () => ({
    type: actionTypes.RESET_FETCH_COURSE_STATUS,
});

// FETCH COURSES ACTIONS
export const fetchUserCoursesStart = () => ({
    type: actionTypes.FETCH_USER_COURSES_START,
});
export const fetchUserCoursesFailure = (error: string) => ({
    type: actionTypes.FETCH_USER_COURSES_FAILURE,
    error,
});
export const fetchUserCoursesSuccess = (courses: ICourse[]) => ({
    type: actionTypes.FETCH_USER_COURSES_SUCCESS,
    courses,
});

// CREATE COURSE ACTIONS
export const createCoursesStart = () => ({
    type: actionTypes.CREATE_COURSE_START,
});
export const createCoursesSuccess = (courses) => ({
    type: actionTypes.CREATE_COURSE_SUCCESS,
    courses,
});
export const createCoursesFailure = (error: string) => ({
    type: actionTypes.CREATE_COURSE_FAILURE,
    error,
});

export function fetchUserCoursesAsync(
    userId: string,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState) {
        dispatch(fetchUserCoursesStart());

        const prevCourses: ICourse[] = getState().course.courses;

        fetchCoursesByUserId(userId)
            .then(function (res) {
                const courses = configureArrayState(
                    prevCourses,
                    res.data,
                    arrayOptions
                );
                dispatch(fetchUserCoursesSuccess(courses));
            })
            .catch(function (err) {
                dispatch(
                    fetchUserCoursesFailure(
                        err.message || "An error occured in fetching courses."
                    )
                );
            });
    };
}

export function createCourseAsync(
    courseData: Partial<ICourseOriginal>,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState: IGetState) {
        dispatch(createCoursesStart());

        const prevCourses: ICourse[] = getState().course.courses;

        createCourse(courseData)
            .then(function (res) {
                const courses = configureArrayState(
                    prevCourses,
                    [res.data],
                    arrayOptions
                );
                dispatch(createCoursesSuccess(courses));
            })
            .catch(function (err) {
                dispatch(
                    createCoursesFailure(
                        err.message || "An error occured in creating courses."
                    )
                );
            });
    };
}
