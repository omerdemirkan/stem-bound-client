import { apiClient } from "../helpers";

export async function pingServer() {
    await apiClient.get("/");
}
