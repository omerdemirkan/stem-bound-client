import { apiClient } from "../helpers";
import { IContactData } from "../types";

export async function contactUs(contactData: IContactData) {
    return await apiClient.post("/contact", contactData);
}
