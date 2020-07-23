import { fetchSearchData } from "../utils/services";
import {
    IStoreArrayOptions,
    ESearchFields,
    IFetchSearchDataOptions,
    ISearchData,
    ISearchState,
    IAsyncActionOptions,
} from "../utils/types";
import {
    configureArrayState,
    clone,
    configureAsyncActionOptions,
} from "../utils/helpers";

enum actionTypes {
    FETCH_SEARCH_DATA_START = "stem-bound/search/FETCH_SEARCH_DATA_START",
    FETCH_SEARCH_DATA_SUCCESS = "stem-bound/search/FETCH_SEARCH_DATA_SUCCESS",
    FETCH_SEARCH_DATA_FAILURE = "stem-bound/search/FETCH_SEARCH_DATA_FAILURE",
}

const initialState: ISearchState = {
    status: {
        fetchSearchData: {
            error: null,
            loading: false,
        },
    },
    fields: (function () {
        let fields = {};
        Object.values(ESearchFields).forEach(function (field) {
            fields[field] = [];
        });
        return fields;
    })(),
};

const reducerHandlers = {
    [actionTypes.FETCH_SEARCH_DATA_START]: function (
        state: ISearchState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchSearchData.loading = true;
        return newState;
    },

    [actionTypes.FETCH_SEARCH_DATA_FAILURE]: function (
        state: ISearchState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchSearchData.loading = false;
        newState.status.fetchSearchData.error = action.error;
        return newState;
    },

    [actionTypes.FETCH_SEARCH_DATA_SUCCESS]: function (
        state: ISearchState,
        action
    ) {
        const newState = clone(state);
        newState.status.fetchSearchData.loading = false;
        newState.status.fetchSearchData.error = null;
        newState.fields[action.field] = action.data;
        return newState;
    },
};

export default function searchReducer(
    state = initialState,
    action
): ISearchState {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
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
    arrayOptions: IStoreArrayOptions = {},
    asyncActionOptions?: IAsyncActionOptions<ISearchData[]>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch, getState) {
        dispatch(fetchSearchDataStart(searchOptions.field));

        const prevData: ISearchData[] = getState().search.fields[
            searchOptions.field
        ];

        fetchSearchData(searchOptions)
            .then(function (res) {
                dispatch(
                    fetchSearchDataSuccess({
                        data: configureArrayState(
                            prevData,
                            res.data,
                            arrayOptions
                        ),
                        field: searchOptions.field,
                    })
                );
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(
                    fetchSearchDataFailure(searchOptions.field, err.message)
                );
                onFailure(err);
            });
    };
}
