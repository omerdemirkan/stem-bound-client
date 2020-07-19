import {
    ICourse,
    IStoreArrayOptions,
    ICourseState,
    ICourseOriginal,
    IGetState,
} from "../utils/types";
import { fetchCoursesByUserId, createCourse } from "../utils/services";
import { mapCourseData, configureArrayState, clone } from "../utils/helpers";

enum actionTypes {
    FETCH_USER_COURSES_START = "stem-bound/course/FETCH_USER_COURSES_START",
    FETCH_USER_COURSES_SUCCESS = "stem-bound/course/FETCH_USER_COURSES_SUCCESS",
    FETCH_USER_COURSES_FAILURE = "stem-bound/course/FETCH_USER_COURSES_FAILURE",
    CREATE_COURSE_START = "stem-bound/course/CREATE_COURSE_START",
    CREATE_COURSE_SUCCESS = "stem-bound/course/CREATE_COURSE_SUCCESS",
    CREATE_COURSE_FAILURE = "stem-bound/course/CREATE_COURSE_FAILURE",
}

const initialState: ICourseState = {
    status: {
        fetchCourses: {
            loading: false,
            error: null,
        },
        createCourse: {
            loading: false,
            error: null,
        },
    },
    courses: [],
};

const reducerHandlers = {
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
        (newState.status.createCourse.loading = false),
            (newState.status.createCourse.error = action.error);
        return newState;
    },

    [actionTypes.CREATE_COURSE_SUCCESS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse.loading = false;
        newState.status.createCourse.error = null;
        newState.courses = action.courses;
        return newState;
    },
};

export default function (state = initialState, action): ICourseState {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
        return state;
    }
}

export const fetchUserCoursesStart = () => ({
    type: actionTypes.FETCH_USER_COURSES_START,
});
export const fetchUserCoursesFailure = () => ({
    type: actionTypes.FETCH_USER_COURSES_FAILURE,
});
export const fetchUserCoursesSuccess = (courses: ICourse[]) => ({
    type: actionTypes.FETCH_USER_COURSES_SUCCESS,
    courses,
});

export const createCoursesStart = () => ({
    type: actionTypes.CREATE_COURSE_START,
});
export const createCoursesSuccess = (courses) => ({
    type: actionTypes.CREATE_COURSE_SUCCESS,
    courses,
});
export const createCoursesFailure = () => ({
    type: actionTypes.CREATE_COURSE_FAILURE,
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
                    mapCourseData(res.data),
                    arrayOptions
                );
                dispatch(fetchUserCoursesSuccess(courses));
            })
            .catch(function (err) {
                dispatch(fetchUserCoursesFailure());
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
                    mapCourseData([res.data]),
                    {
                        concat: true,
                        ...arrayOptions,
                    }
                );
                dispatch(createCoursesSuccess(courses));
            })
            .catch(function (err) {
                dispatch(createCoursesFailure());
            });
    };
}
