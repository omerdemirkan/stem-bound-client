export const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api/v1"
        : "https://stem-bound-api-4ea6ol7fuq-uc.a.run.app/api/v1";
