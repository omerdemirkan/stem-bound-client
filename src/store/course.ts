import {
    ICourse,
    IStoreArrayOptions,
    ICourseState,
    ICourseOriginal,
    IGetState,
    IAsyncActionOptions,
    EStateStatus,
} from "../utils/types";
import {
    fetchCoursesByUserId,
    createCourse,
    fetchCourseById,
} from "../utils/services";
import {
    configureArrayState,
    clone,
    configureAsyncActionOptions,
    updateState,
} from "../utils/helpers";

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

enum actionTypes {
    FETCH_USER_COURSES_START = "stem-bound/course/FETCH_USER_COURSES_START",
    FETCH_USER_COURSES_SUCCESS = "stem-bound/course/FETCH_USER_COURSES_SUCCESS",
    FETCH_USER_COURSES_FAILURE = "stem-bound/course/FETCH_USER_COURSES_FAILURE",

    FETCH_COURSE_START = "stem-bound/course/FETCH_COURSE_START",
    FETCH_COURSE_SUCCESS = "stem-bound/course/FETCH_COURSE_SUCCESS",
    FETCH_COURSE_FAILURE = "stem-bound/course/FETCH_COURSE_FAILURE",

    CREATE_COURSE_START = "stem-bound/course/CREATE_COURSE_START",
    CREATE_COURSE_SUCCESS = "stem-bound/course/CREATE_COURSE_SUCCESS",
    CREATE_COURSE_FAILURE = "stem-bound/course/CREATE_COURSE_FAILURE",

    INSPECT_COURSE = "stem-bound/course/INSPECT_COURSE",
}

const initialState: ICourseState = {
    courses: [],
    inspectedCourse: null,
    status: {
        fetchCourses: EStateStatus.idle,
        fetchCourse: EStateStatus.idle,
        createCourse: EStateStatus.idle,
    },
};

const reducerHandlers = {
    [actionTypes.FETCH_USER_COURSES_START]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchCourses = EStateStatus.loading;
        return newState;
    },
    [actionTypes.FETCH_USER_COURSES_FAILURE]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchCourses = EStateStatus.failed;
        return newState;
    },
    [actionTypes.FETCH_USER_COURSES_SUCCESS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.courses = action.courses;
        newState.status.fetchCourses = EStateStatus.successful;
        return newState;
    },

    [actionTypes.CREATE_COURSE_START]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.status.createCourse = EStateStatus.loading;
        return newState;
    },
    [actionTypes.CREATE_COURSE_FAILURE]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse = EStateStatus.failed;
        return newState;
    },
    [actionTypes.CREATE_COURSE_SUCCESS]: function (
        state: ICourseState,
        action
    ) {
        const newState = clone(state);
        newState.status.createCourse = EStateStatus.successful;
        newState.courses = action.courses;
        return newState;
    },

    [actionTypes.FETCH_COURSE_START]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.status.fetchCourse = EStateStatus.loading;
        return newState;
    },
    [actionTypes.FETCH_COURSE_FAILURE]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.status.fetchCourse = EStateStatus.failed;
        return newState;
    },
    [actionTypes.FETCH_COURSE_SUCCESS]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.status.fetchCourse = EStateStatus.successful;
        newState.inspectedCourse = action.course;
        return newState;
    },

    [actionTypes.INSPECT_COURSE]: function (state: ICourseState, action) {
        const newState = clone(state);
        newState.inspectedCourse = clone(
            state.courses.find((course) => course._id === action.courseId)
        );
        return newState;
    },
};

export const inspectCourse = (courseId: string) => ({
    type: actionTypes.INSPECT_COURSE,
    courseId,
});

// FETCH COURSES ACTIONS
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

export const fetchCourseStart = () => ({
    type: actionTypes.FETCH_COURSE_START,
});
export const fetchCourseFailure = () => ({
    type: actionTypes.FETCH_COURSE_FAILURE,
});
export const fetchCourseSuccess = (course: ICourse) => ({
    type: actionTypes.FETCH_COURSE_SUCCESS,
    course,
});

// CREATE COURSE ACTIONS
export const createCoursesStart = () => ({
    type: actionTypes.CREATE_COURSE_START,
});
export const createCoursesFailure = () => ({
    type: actionTypes.CREATE_COURSE_FAILURE,
});
export const createCoursesSuccess = (courses) => ({
    type: actionTypes.CREATE_COURSE_SUCCESS,
    courses,
});

export function fetchUserCoursesAsync(
    userId: string,
    arrayOptions: IStoreArrayOptions = {},
    asyncActionOptions?: IAsyncActionOptions<ICourse[]>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch, getState) {
        dispatch(fetchUserCoursesStart());

        const prevCourses: ICourse[] = getState().course.courses;

        fetchCoursesByUserId(userId)
            .then(function (res) {
                dispatch(
                    fetchUserCoursesSuccess(
                        configureArrayState(prevCourses, res.data, arrayOptions)
                    )
                );
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(fetchUserCoursesFailure());
                onFailure(err);
            });
    };
}

export function fetchCourseAsync(
    courseId: string,
    asyncActionOptions?: IAsyncActionOptions<ICourse>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch) {
        dispatch(fetchCourseStart());

        fetchCourseById(courseId)
            .then(function (res) {
                dispatch(fetchCourseSuccess(res.data));
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(fetchCourseFailure());
                onFailure(err);
            });
    };
}

export function createCourseAsync(
    courseData: Partial<ICourseOriginal>,
    arrayOptions: IStoreArrayOptions = {},
    asyncActionOptions?: IAsyncActionOptions<ICourse>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch, getState: IGetState) {
        dispatch(createCoursesStart());

        const prevCourses: ICourse[] = getState().course.courses;

        createCourse(courseData)
            .then(function (res) {
                dispatch(
                    createCoursesSuccess(
                        configureArrayState(
                            prevCourses,
                            [res.data],
                            arrayOptions
                        )
                    )
                );
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(createCoursesFailure());
                onFailure(err);
            });
    };
}
