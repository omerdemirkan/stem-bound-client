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
    Object.values(ESearchFields).forEach(function (field) {
        fields[field] = [];
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
                    [action.field]: action.data,
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

function fetchSearchDataStart(field: ESearchFields) {
    return { type: actionTypes.FETCH_SEARCH_DATA_START, field };
}

function fetchSearchDataSuccess({
    data,
    field,
}: {
    data: ISearchData[];
    field: ESearchFields;
}) {
    return {
        type: actionTypes.FETCH_SEARCH_DATA_SUCCESS,
        data,
        field,
    };
}

function fetchSearchDataFailure(field: ESearchFields, message: string) {
    return {
        type: actionTypes.FETCH_SEARCH_DATA_FAILURE,
        field,
        message,
    };
}

export function fetchSearchDataAsync(
    searchOptions: IFetchSearchDataOptions,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState) {
        dispatch(fetchSearchDataStart(searchOptions.field));

        const prevData: ISearchData[] = getState().search.fields[
            searchOptions.field
        ];

        fetchSearchData(searchOptions)
            .then(function (newData) {
                dispatch(
                    fetchSearchDataSuccess({
                        data: configureArrayState(
                            prevData,
                            newData,
                            arrayOptions
                        ),
                        field: searchOptions.field,
                    })
                );
            })
            .catch(function (error) {
                dispatch(
                    fetchSearchDataFailure(searchOptions.field, error.message)
                );
                console.error(error.message);
            });
    };
}
