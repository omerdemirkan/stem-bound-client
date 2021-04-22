import { apiClient } from "../helpers";
import { IContactData } from "../types";

export async function contactUs(
    contactData: IContactData
): Promise<{ message: string }> {
    return await apiClient.post("/contact", contactData);
}
