import { fetchSearchData } from "../utils/services";
import {
    IStoreArrayOptions,
    ESearchFields,
    IFetchSearchDataOptions,
    ISearchData,
} from "../utils/types";
import { updateState, configureArrayState } from "../utils/helpers";

enum actionTypes {
    FETCH_SEARCH_DATA_START = "stem-bound/search/FETCH_SEARCH_DATA_START",
    FETCH_SEARCH_DATA_SUCCESS = "stem-bound/search/FETCH_SEARCH_DATA_SUCCESS",
    FETCH_SEARCH_DATA_FAILURE = "stem-bound/search/FETCH_SEARCH_DATA_FAILURE",
}

function initializeFields() {
    let fields = {};
    Object.values(ESearchFields).forEach(function (searchField) {
        fields[searchField] = [];
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
                    [action.searchField]: action.data,
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

function fetchSearchDataStart(searchField: ESearchFields) {
    return { type: actionTypes.FETCH_SEARCH_DATA_START, searchField };
}

function fetchSearchDataSuccess({
    data,
    searchField,
}: {
    data: ISearchData[];
    searchField: ESearchFields;
}) {
    return {
        type: actionTypes.FETCH_SEARCH_DATA_SUCCESS,
        data,
        searchField,
    };
}

function fetchSearchDataFailure(searchField: ESearchFields, message: string) {
    return {
        type: actionTypes.FETCH_SEARCH_DATA_FAILURE,
        searchField,
        message,
    };
}

export function fetchSearchDataAsync(
    searchField: ESearchFields,
    searchOptions: IFetchSearchDataOptions,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState) {
        dispatch(fetchSearchDataStart(searchField));

        const prevData: ISearchData[] = getState().search.fields[searchField];

        fetchSearchData(searchField, searchOptions)
            .then(function (newData) {
                dispatch(
                    fetchSearchDataSuccess({
                        data: configureArrayState(
                            prevData,
                            newData,
                            arrayOptions
                        ),
                        searchField,
                    })
                );
            })
            .catch(function (error) {
                dispatch(fetchSearchDataFailure(searchField, error.message));
                console.error(error.message);
            });
    };
}
