import { IApiResponse } from "../types";

export function mapResponseData<T>(
    fetcher: Promise<IApiResponse<any>>,
    mapFunction: (any) => any
): Promise<IApiResponse<T>> {
    return new Promise(function (resolve, reject) {
        fetcher
            .then(function (res) {
                try {
                    res.data = (res.data as any).map(mapFunction);
                } catch (e) {
                    res.data = mapFunction(res.data);
                }
                resolve(res);
            })
            .catch(reject);
    });
}
