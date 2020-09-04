import forms from "../constants/form.constants";
import { EForms, EUserRoles } from "../types";
import { clone } from "./state.helpers";

export function getFormDataByKey(formKey: EForms) {
    return forms[formKey];
}

const userRolesBySignUpFormKey = {
    [EForms.INSTRUCTOR_SIGN_UP]: EUserRoles.INSTRUCTOR,
    [EForms.SCHOOL_OFFICIAL_SIGN_UP]: EUserRoles.SCHOOL_OFFICIAL,
    [EForms.STUDENT_SIGN_UP]: EUserRoles.STUDENT,
};

export function getUserRoleBySignUpFormKey(formKey: EForms): EUserRoles {
    return userRolesBySignUpFormKey[formKey];
}

const signUpFormKeysByUserRole = {
    [EUserRoles.INSTRUCTOR]: EForms.INSTRUCTOR_SIGN_UP,
    [EUserRoles.SCHOOL_OFFICIAL]: EForms.SCHOOL_OFFICIAL_SIGN_UP,
    [EUserRoles.STUDENT]: EForms.STUDENT_SIGN_UP,
};

export function getSignUpFormKeysByUserRole(userRole: EUserRoles): EForms {
    return signUpFormKeysByUserRole[userRole];
}

export function removeEmptyStrings<T>(
    obj: any,
    options?: { clone?: boolean }
): Partial<T> {
    obj = options?.clone ? clone(obj) : obj;

    if (Array.isArray(obj)) {
        obj = obj.filter((value) => value !== "");
        obj.forEach(function (value) {
            if (typeof value === "object") removeEmptyStrings(value);
        });
    } else if (typeof obj === "object") {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "object") {
                removeEmptyStrings(obj[key]);
            } else if (obj[key] === "") {
                delete obj[key];
            }
        });
    }

    return obj;
}
