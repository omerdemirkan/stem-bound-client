import { fetchSchools } from "../utils/services";
import { fetchSchoolsOptions } from "../utils/types";

enum actionTypes {
    FETCH_SCHOOLS_START = "stem-bound/search/FETCH_SCHOOLS_START",
    FETCH_SCHOOLS_SUCCESS = "stem-bound/search/FETCH_SCHOOLS_SUCCESS",
    FETCH_SCHOOLS_FAILURE = "stem-bound/search/FETCH_SCHOOLS_FAILURE",
}

const initialState = {
    loading: false,
    schools: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SCHOOLS_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_SCHOOLS_SUCCESS:
            return {
                ...state,
                loading: false,
                schools: action.schools,
            };
        case actionTypes.FETCH_SCHOOLS_FAILURE:
            return {
                ...state,
                loading: false,
            };
    }
}

function fetchSchoolsStart() {
    return { type: actionTypes.FETCH_SCHOOLS_START };
}

function fetchSchoolsSuccess(schools: any[]) {
    return { type: actionTypes.FETCH_SCHOOLS_SUCCESS, schools };
}

function fetchSchoolsFailure() {
    return { type: actionTypes.FETCH_SCHOOLS_FAILURE };
}

export function fetchSchoolsAsync(options: fetchSchoolsOptions) {
    return async function (dispatch) {
        dispatch(fetchSchoolsStart);
        const schools = await fetchSchools(options);
        if (schools) {
            dispatch(fetchSchoolsSuccess(schools));
        } else {
            dispatch(fetchSchoolsFailure());
        }
    };
}
