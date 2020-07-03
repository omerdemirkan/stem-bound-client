import * as yup from "yup";
import { EInputTypes, IFormData, EForms } from "../types";
import { fetchSchoolInputOptions } from "../helpers";
import { passwordRegex, objectIdRegex } from "./regex.constants";

// This is quite the file. I understand there is a lot of duplication, especially between sign up forms.
// I decided to keep everything explicit as mapping default/common values proved to be more disorienting than useful.

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

    validationSchema: yup.object().shape({
        firstName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        lastName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        email: yup.string().email("Invalid Email.").required("Required."),
        password: yup.string().matches(passwordRegex).required("Required."),
        shortDescription: yup
            .string()
            .min(4, "Too short!")
            .max(60, "Too long!")
            .required("Required."),
        longDescription: yup
            .string()
            .min(4, "Too short!")
            .max(2000, "Too long!"),

        schoolId: yup.string().matches(objectIdRegex).required("Required."),
        specialties: yup
            .array()
            .min(1)
            .max(10)
            .of(yup.string().min(2, "Too short!").max(40, "Too long!"))
            .required("Required."),
    }),

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
        schoolId: "",
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

    validationSchema: yup.object().shape({
        firstName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        lastName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        email: yup.string().email("Invalid Email.").required("Required."),
        password: yup.string().matches(passwordRegex).required("Required."),
        shortDescription: yup
            .string()
            .min(4, "Too short!")
            .max(60, "Too long!")
            .required("Required."),
        longDescription: yup
            .string()
            .min(4, "Too short!")
            .max(2000, "Too long!"),

        position: yup
            .string()
            .min(2, "Too short!")
            .max(200, "Too long!")
            .required("Required."),
    }),

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
        schoolId: "",
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

    validationSchema: yup.object().shape({
        firstName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        lastName: yup
            .string()
            .min(2, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        email: yup.string().email("Invalid Email.").required("Required."),
        password: yup.string().matches(passwordRegex).required("Required."),
        shortDescription: yup
            .string()
            .min(4, "Too short!")
            .max(60, "Too long!")
            .required("Required."),
        longDescription: yup
            .string()
            .min(4, "Too short!")
            .max(2000, "Too long!"),

        schoolId: yup.string().matches(objectIdRegex).required("Required."),
        interests: yup
            .array()
            .min(1)
            .max(10)
            .of(yup.string().min(2, "Too short!").max(40, "Too long!"))
            .required("Required."),
    }),

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

    validationSchema: yup.object().shape({
        email: yup.string().email("Invalid Email.").required("Required."),
        password: yup.string().matches(passwordRegex).required("Required."),
    }),

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
