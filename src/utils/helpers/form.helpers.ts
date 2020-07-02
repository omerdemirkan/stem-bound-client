import forms from "../constants/form.constants";
import { EForms } from "../types";

export function getFormDataByKey(formKey: EForms) {
    return forms[formKey];
}
