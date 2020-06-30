import { isValidEmail } from "./regex.constants";
import { EUserRoles } from "../types";

const userSignUpFormData = {
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shortDescription: "",
        longDescription: "",
    },
};

const instructorSignUpFormData = Object.freeze({
    initialValues: {
        ...userSignUpFormData.initialValues,
        specialties: [""],
    },
});

const schoolOfficialSignUpFormData = Object.freeze({
    initialValues: {
        ...userSignUpFormData.initialValues,
        schoolId: null,
        position: "",
    },
});

const studentSignUpFormData = Object.freeze({
    initialValues: {
        ...userSignUpFormData.initialValues,
        schoolId: null,
        interests: [""],
    },
});

export const signUpFormData = {
    [EUserRoles.INSTRUCTOR]: instructorSignUpFormData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialSignUpFormData,
    [EUserRoles.STUDENT]: studentSignUpFormData,
};

export function getSignUpFormDataByRole(
    role: EUserRoles
): { initialValues: any } {
    return signUpFormData[role];
}
