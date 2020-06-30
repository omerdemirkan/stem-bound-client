import { isValidEmail } from "./regex.constants";
import { EUserRoles, IInputData, ITextInput, EInputTypes } from "../types";

const instructorSignUpFormData = {
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shortDescription: "",
        longDescription: "",
        specialties: [""],
    },

    inputs: [
        {
            type: EInputTypes.text,
            id: "firstName",
            label: "First Name",
        },
        {
            type: EInputTypes.text,
            id: "lastName",
            label: "Last Name",
        },
        {
            type: EInputTypes.text,
            id: "password",
            label: "Password",
            hidden: true,
        },
        {
            type: EInputTypes.text,
            id: "shortDescription",
            label: "Short Description",
        },
        {
            type: EInputTypes.textarea,
            id: "longDescription",
            label: "Long Description (Optional)",
        },
    ] as IInputData[],
};

const schoolOfficialSignUpFormData = {
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shortDescription: "",
        longDescription: "",
        schoolId: null,
        position: "",
    },

    inputs: [
        {
            type: EInputTypes.text,
            id: "firstName",
            label: "First Name",
        },
        {
            type: EInputTypes.text,
            id: "lastName",
            label: "Last Name",
        },
        {
            type: EInputTypes.text,
            id: "password",
            label: "Password",
            hidden: true,
            toggleHidden: true,
        },
        {
            type: EInputTypes.text,
            id: "shortDescription",
            label: "Short Description",
        },
        {
            type: EInputTypes.textarea,
            id: "longDescription",
            label: "Long Description (Optional)",
        },
    ] as IInputData[],
};

const studentSignUpFormData = {
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shortDescription: "",
        longDescription: "",
        schoolId: null,
        interests: [""],
    },

    inputs: [
        {
            type: EInputTypes.text,
            id: "firstName",
            label: "First Name",
        },
        {
            type: EInputTypes.text,
            id: "lastName",
            label: "Last Name",
        },
        {
            type: EInputTypes.text,
            id: "password",
            label: "Password",
            hidden: true,
        },
        {
            type: EInputTypes.text,
            id: "shortDescription",
            label: "Short Description",
        },
        {
            type: EInputTypes.textarea,
            id: "longDescription",
            label: "Long Description (Optional)",
        },
    ] as IInputData[],
};

export const signUpFormData = {
    [EUserRoles.INSTRUCTOR]: instructorSignUpFormData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialSignUpFormData,
    [EUserRoles.STUDENT]: studentSignUpFormData,
};

export function getSignUpFormDataByRole(
    role: EUserRoles
): { initialValues: any; inputs: IInputData[] } {
    return signUpFormData[role];
}
