export const BASE_URL = "http://localhost:8080/api";

export let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export function updateHeaderField(options: { field: string; value: string }) {
    headers[options.field] = options.value;
}
