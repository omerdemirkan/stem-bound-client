import yup from "yup";
import { EInputTypes, IFormData, EForms } from "../types";
import { fetchSchoolInputOptions } from "../helpers";
import { passwordRegex, objectIdRegex } from "./regex.constants";

export const instructorSignUpFormData: IFormData = Object.freeze({
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shortDescription: "",
        longDescription: "",
        specialties: [""],
    },

    validationSchema: {
        firstName: yup.string().trim().min(2).max(30).required(),
        lastName: yup.string().trim().min(2).max(30).required(),
        email: yup.string().email().required(),
        password: yup.string().matches(passwordRegex).required(),
        shortDescription: yup.string().trim().min(4).max(60).required(),
        longDescription: yup.string().trim().min(4).max(2000),

        schoolId: yup.string().matches(objectIdRegex),
        specialties: yup
            .array()
            .min(1)
            .max(10)
            .of(yup.string().trim().min(2).max(40))
            .required(),
    },

    mapFormToRequestBody: function (values: any) {
        return {
            ...values,
        };
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
            id: "email",
            label: "Email",
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
        {
            type: EInputTypes.textArray,
            id: "specialties",
            label: "Specialties",
        },
    ],
});

export const schoolOfficialSignUpFormData: IFormData = Object.freeze({
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

    mapFormToRequestBody: function (values: any) {
        // Note: fields that aren't in the db schema are weeted out automatically.
        return {
            ...values,
            meta: {
                school: values.school,
            },
        };
    },

    validationSchema: {
        firstName: yup.string().trim().min(2).max(30).required(),
        lastName: yup.string().trim().min(2).max(30).required(),
        email: yup.string().email().required(),
        password: yup.string().matches(passwordRegex).required(),
        shortDescription: yup.string().trim().min(4).max(60).required(),
        longDescription: yup.string().trim().min(4).max(2000),

        position: yup.string().trim().min(2).max(200).required(),
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
            id: "email",
            label: "Email",
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
        {
            type: EInputTypes.searchSelect,
            id: "schoolId",
            label: "School",
            delay: 1000,
            fetchOptions: fetchSchoolInputOptions,
        },
        {
            type: EInputTypes.text,
            id: "position",
            label: "Position",
        },
    ],
});

export const studentSignUpFormData: IFormData = Object.freeze({
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

    mapFormToRequestBody: function (values: any) {
        return {
            ...values,
            meta: {
                school: values.school,
            },
        };
    },

    validationSchema: {
        firstName: yup.string().trim().min(2).max(30).required(),
        lastName: yup.string().trim().min(2).max(30).required(),
        email: yup.string().email().required(),
        password: yup.string().matches(passwordRegex).required(),
        shortDescription: yup.string().trim().min(4).max(60).required(),
        longDescription: yup.string().trim().min(4).max(2000),

        schoolId: yup.string().matches(objectIdRegex).required(),
        interests: yup
            .array()
            .min(1)
            .max(10)
            .of(yup.string().trim().min(2).max(40))
            .required(),
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
            id: "email",
            label: "Email",
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
        {
            type: EInputTypes.textArray,
            id: "interests",
            label: "Interests",
        },
        {
            type: EInputTypes.searchSelect,
            id: "schoolId",
            label: "School",
            delay: 1000,
            fetchOptions: fetchSchoolInputOptions,
        },
    ],
});

export const logInFormData: IFormData = {
    initialValues: {
        email: "",
        password: "",
    },

    mapFormToRequestBody: function (values: any) {
        return {};
    },

    validationSchema: {
        email: yup.string().email().required(),
        password: yup.string().matches(passwordRegex).required(),
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

const forms = Object.freeze({
    [EForms.INSTRUCTOR_SIGN_UP]: instructorSignUpFormData,
    [EForms.SCHOOL_OFFICIAL_SIGN_UP]: schoolOfficialSignUpFormData,
    [EForms.STUDENT_SIGN_UP]: studentSignUpFormData,
    [EForms.USER_LOG_IN]: logInFormData,
});

// Naming before exporting as default to allow for autoimports.
export default forms;
