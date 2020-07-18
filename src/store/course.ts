import { ICourse, IStoreArrayOptions, ICourseState } from "../utils/types";
import { fetchCoursesByUserId } from "../utils/services";
import {
    mapCourseData,
    updateState,
    configureArrayState,
} from "../utils/helpers";

enum actionTypes {
    FETCH_USER_COURSES_START = "stem-bound/course/FETCH_COURSES_START",
    FETCH_USER_COURSES_SUCCESS = "stem-bound/course/FETCH_COURSES_SUCCESS",
    FETCH_USER_COURSES_FAILURE = "stem-bound/course/FETCH_USER_COURSES_FAILURE",
}

const initialState: ICourseState = {
    loading: false,
    fetchAttempted: false,
    courses: [],
};

export default function (state = initialState, action): ICourseState {
    switch (action.type) {
        case actionTypes.FETCH_USER_COURSES_START:
            return updateState(state, {
                loading: true,
            });
        case actionTypes.FETCH_USER_COURSES_FAILURE:
            return updateState(state, {
                loading: false,
                fetchAttempted: true,
            });
        case actionTypes.FETCH_USER_COURSES_SUCCESS:
            return updateState(state, {
                fetchAttempted: true,
                courses: action.courses,
            });
        default:
            return state;
    }
}

export function fetchUserCoursesStart() {
    return { type: actionTypes.FETCH_USER_COURSES_START };
}

export function fetchUserCoursesFailure() {
    return { type: actionTypes.FETCH_USER_COURSES_FAILURE };
}

export function fetchUserCoursesSuccess(courses: ICourse[]) {
    return { type: actionTypes.FETCH_USER_COURSES_SUCCESS, courses };
}

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
