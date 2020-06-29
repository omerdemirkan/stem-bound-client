import { API_BASE_URL } from "./constants";

export class HttpClient {
    private baseUrl: string;
    private defaultConfig: any;
    private handleResponse: (...args: any) => any;

    constructor(options?: {
        baseUrl?: string;
        defaultConfig?: any;
        handleResponse?: (...args: any) => any;
    }) {
        this.baseUrl = options.baseUrl || "";
        this.defaultConfig = options.defaultConfig || {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        this.handleResponse =
            options.handleResponse ||
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

    getDefaultConfig() {
        // returning frozen copy
        return Object.freeze({ ...this.defaultConfig });
    }
}

// The idea behind exporting one instance rather than having the file using it to instantiate it is to
// maintain global headers.
export const apiClient = new HttpClient({ baseUrl: API_BASE_URL });
