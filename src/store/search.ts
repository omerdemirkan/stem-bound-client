import { fetchSearchData } from "../utils/services";
import {
    IStoreArrayOptions,
    ESearchQueries,
    IFetchSearchDataOptions,
    ISearchData,
} from "../utils/types";
import { updateState, configureArrayState } from "../utils/helpers";
import { array } from "yup";

enum actionTypes {
    FETCH_SEARCH_DATA_START = "stem-bound/search/FETCH_SEARCH_DATA_START",
    FETCH_SEARCH_DATA_SUCCESS = "stem-bound/search/FETCH_SEARCH_DATA_SUCCESS",
    FETCH_SEARCH_DATA_FAILURE = "stem-bound/search/FETCH_SEARCH_DATA_FAILURE",
}

function initializeFields() {
    let fields = {};
    Object.values(ESearchQueries).forEach(function (query) {
        fields[query] = [];
    });
    return fields;
}

const initialState = {
    loading: false,
    fields: initializeFields(),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SEARCH_DATA_START:
            return updateState(state, {
                loading: true,
            });
        case actionTypes.FETCH_SEARCH_DATA_SUCCESS:
            return updateState(state, {
                loading: false,
                fields: {
                    ...state.fields,
                    [action.query]: action.data,
                },
            });
        case actionTypes.FETCH_SEARCH_DATA_FAILURE:
            return updateState(state, {
                loading: false,
            });
        default:
            return state;
    }
}

function fetchSearchDataStart(query: ESearchQueries) {
    return { type: actionTypes.FETCH_SEARCH_DATA_START, query };
}

function fetchSearchDataSuccess({
    data,
    query,
}: {
    data: ISearchData[];
    query: ESearchQueries;
}) {
    return {
        type: actionTypes.FETCH_SEARCH_DATA_SUCCESS,
        data,
        query,
    };
}

function fetchSearchDataFailure(query: ESearchQueries, message: string) {
    return { type: actionTypes.FETCH_SEARCH_DATA_FAILURE, query, message };
}

export function fetchSearchDataAsync(
    query: ESearchQueries,
    searchOptions: IFetchSearchDataOptions,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState) {
        dispatch(fetchSearchDataStart(query));

        const prevData: ISearchData[] = getState().search.fields[query];

        fetchSearchData(query, searchOptions)
            .then(function (newData) {
                dispatch(
                    fetchSearchDataSuccess({
                        data: configureArrayState(
                            prevData,
                            newData,
                            arrayOptions
                        ),
                        query,
                    })
                );
            })
            .catch(function (error) {
                dispatch(fetchSearchDataFailure(query, error.message));
                console.error(error.message);
            });
    };
}
