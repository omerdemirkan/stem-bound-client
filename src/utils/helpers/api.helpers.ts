import { IApiResponse } from "../types";

export function mapResponseData<T>(
    fetchPromise: Promise<IApiResponse<any>>,
    mapFunction: (any) => any
): Promise<IApiResponse<T>> {
    return new Promise(function (resolve, reject) {
        fetchPromise
            .then(function (res) {
                if (Array.isArray(res.data))
                    res.data = (res.data as any).map(mapFunction);
                else res.data = mapFunction(res.data);

                resolve(res);
            })
            .catch(reject);
    });
}
