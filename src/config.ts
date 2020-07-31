export const SERVER_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8080"
        : "https://stem-bound-api-4ea6ol7fuq-uc.a.run.app";

export const API_BASE_URL = SERVER_BASE_URL + "/api/v1";

// export const SOCKET_BASE_URL =
//     process.env.NODE_ENV === "development"
//         ? "http://127.0.0.1:443"
//         : "https://stem-bound-api-4ea6ol7fuq-uc.a.run.app";
