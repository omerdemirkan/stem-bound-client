import forms from "../constants/form.constants";
import { EForms, EUserRoles } from "../types";

export function getFormDataByKey(formKey: EForms) {
    return forms[formKey];
}

const userRolesByFormKey = {
    [EForms.INSTRUCTOR_SIGN_UP]: EUserRoles.INSTRUCTOR,
    [EForms.SCHOOL_OFFICIAL_SIGN_UP]: EUserRoles.SCHOOL_OFFICIAL,
    [EForms.STUDENT_SIGN_UP]: EUserRoles.STUDENT,
};

export function getUserRoleBySignUpFormKey(formKey: EForms): EUserRoles {
    return userRolesByFormKey[formKey];
}
