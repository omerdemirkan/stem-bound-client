import { API_BASE_URL } from "../constants";

export class Client {
    private baseUrl: string;
    private defaultConfig: any;
    private handleResponse: (...args: any) => any;

    constructor({
        baseUrl,
        defaultConfig,
        handleResponse,
    }: {
        baseUrl?: string;
        defaultConfig?: any;
        handleResponse?: (...args: any) => any;
    } = {}) {
        this.baseUrl = baseUrl || "";
        this.defaultConfig = defaultConfig || {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        this.handleResponse =
            handleResponse ||
            async function (response) {
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    return Promise.reject(data);
                }
            };
    }

    get(path: string, configOptions: any = {}) {
        return fetch(`${this.baseUrl}${path}`, {
            ...this.defaultConfig,
            method: "GET",
            ...configOptions,
        }).then(this.handleResponse);
    }

    post(path: string, body: object, configOptions: any = {}) {
        return fetch(`${this.baseUrl}${path}`, {
            ...this.defaultConfig,
            method: "POST",
            body: JSON.stringify(body),
            ...configOptions,
        }).then(this.handleResponse);
    }

    put(path: string, body: object, configOptions: any = {}) {
        return fetch(`${this.baseUrl}${path}`, {
            ...this.defaultConfig,
            method: "PUT",
            body: JSON.stringify(body),
            ...configOptions,
        }).then(this.handleResponse);
    }

    patch(path: string, body: object, configOptions: any = {}) {
        return fetch(`${this.baseUrl}${path}`, {
            ...this.defaultConfig,
            method: "PATCH",
            body: JSON.stringify(body),
            ...configOptions,
        }).then(this.handleResponse);
    }

    delete(path: string, configOptions: any = {}) {
        return fetch(`${this.baseUrl}${path}`, {
            ...this.defaultConfig,
            method: "DELETE",
            ...configOptions,
        }).then(this.handleResponse);
    }

    addRequestHeader({
        headerName,
        headerValue,
    }: {
        headerName: string;
        headerValue: string;
    }) {
        this.defaultConfig.headers[headerName] = headerValue;
    }

    setAuthHeader(accessToken: string) {
        this.addRequestHeader({
            headerName: "authorization",
            headerValue: `Bearer ${accessToken}`,
        });
    }

    getAuthHeader() {
        try {
            return this.defaultConfig.headers["authorization"];
        } catch (e) {
            return null;
        }
    }
}

// The idea behind exporting one instance rather than having the file using it to instantiate it is to
// maintain headers headers.
export const apiClient = new Client({ baseUrl: API_BASE_URL });
