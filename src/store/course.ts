import { ICourse } from "../utils/types";
import { fetchUserCoursesById } from "../utils/services";
import { mapCourseData } from "../utils/helpers";

enum actionTypes {
    FETCH_USER_COURSES_START = "stem-bound/course/FETCH_COURSES_START",
    FETCH_USER_COURSES_SUCCESS = "stem-bound/course/FETCH_COURSES_SUCCESS",
    FETCH_USER_COURSES_FAILURE = "stem-bound/course/FETCH_USER_COURSES_FAILURE",
}

const initialState = {
    loading: false,
    fetchAttempted: false,
    courses: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER_COURSES_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_USER_COURSES_FAILURE:
            return {
                ...state,
                loading: false,
                fetchAttempted: true,
            };
        case actionTypes.FETCH_USER_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.concat
                    ? state.courses.concat(action.courses)
                    : action.courses,
            };
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

export function fetchUserCoursesAsync(userId: string) {
    return function (dispatch) {
        dispatch(fetchUserCoursesStart());

        fetchUserCoursesById(userId)
            .then(function (res) {
                const courses = mapCourseData(res.data);
                dispatch(fetchUserCoursesSuccess(courses));
            })
            .catch(function (err) {
                dispatch(fetchUserCoursesFailure());
            });
    };
}
