import { EUserRoles, IInputData, EInputTypes, IFormData } from "../types";

const instructorSignUpFormData: IFormData = {
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
    ],
};

const schoolOfficialSignUpFormData: IFormData = {
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
    ],
};

const studentSignUpFormData: IFormData = {
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
    ],
};

export function getSignUpFormDataByRole(
    role: EUserRoles
): { initialValues: any; inputs: IInputData[] } {
    return {
        [EUserRoles.INSTRUCTOR]: instructorSignUpFormData,
        [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialSignUpFormData,
        [EUserRoles.STUDENT]: studentSignUpFormData,
    }[role];
}

export const logInFormData: IFormData = {
    initialValues: {
        email: "",
        password: "",
    },
    inputs: [
        { id: "email", type: EInputTypes.text, label: "Email" },
        {
            id: "password",
            type: EInputTypes.text,
            label: "Password",
            hidden: true,
            toggleHidden: true,
        },
    ],
};
