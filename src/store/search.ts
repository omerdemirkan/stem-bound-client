import { fetchSchools } from "../utils/services";
import { fetchSchoolsOptions, IReducerArrayOptions } from "../utils/types";
import { mapSchoolData, updateState } from "../utils/helpers";

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
            return updateState(state, {
                loading: true,
            });
        case actionTypes.FETCH_SCHOOLS_SUCCESS:
            return updateState(state, {
                loading: false,
                schools: action.concat
                    ? state.schools.concat(action.schools)
                    : action.schools,
            });
        case actionTypes.FETCH_SCHOOLS_FAILURE:
            return updateState(state, {
                loading: false,
            });
        default:
            return state;
    }
}

function fetchSchoolsStart() {
    return { type: actionTypes.FETCH_SCHOOLS_START };
}

function fetchSchoolsSuccess(schools: any[], options?: IReducerArrayOptions) {
    return {
        type: actionTypes.FETCH_SCHOOLS_SUCCESS,
        schools,
        ...options,
    };
}

function fetchSchoolsFailure() {
    return { type: actionTypes.FETCH_SCHOOLS_FAILURE };
}

export function fetchSchoolsAsync(options: fetchSchoolsOptions) {
    return function (dispatch) {
        dispatch(fetchSchoolsStart());

        fetchSchools(options)
            .then(function (res) {
                const schools = mapSchoolData(res.data);
                dispatch(fetchSchoolsSuccess(schools));
            })
            .catch(function (error) {
                dispatch(fetchSchoolsFailure());
                console.error(error.message);
            });
    };
}
