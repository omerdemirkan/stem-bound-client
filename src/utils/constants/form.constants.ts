import * as yup from "yup";
import { passwordRegex, objectIdRegex, courseTypesInputOptions } from ".";
import { EInputTypes, IFormData, EForms } from "../types";
import {
    fetchLocationInputOptions,
    fetchSchoolInputOptions,
    updateState,
} from "../helpers";

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
        zip: "",
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
        password: yup
            .string()
            .matches(
                passwordRegex,
                "Capital letter, lowercase letter, special character, and a minimum of 8 characters required."
            )
            .required("Required."),
        shortDescription: yup
            .string()
            .min(4, "Too short!")
            .max(60, "Too long!")
            .required("Required."),
        longDescription: yup
            .string()
            .min(4, "Too short!")
            .max(2000, "Too long!"),
        specialties: yup
            .array()
            .min(1)
            .max(10)
            .of(yup.string().min(2, "Too short!").max(40, "Too long!"))
            .required("Required."),
        zip: yup.string().required(),
    }),

    mapFormToRequestBody: function (values: any) {
        return updateState(values, {});
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
        {
            type: EInputTypes.searchSelect,
            id: "zip",
            label: "Zip Code",
            delay: 1000,
            fetchOptions: fetchLocationInputOptions,
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
        zip: "",
    },

    mapFormToRequestBody: function (values: any) {
        return updateState(values, {
            meta: {
                school: values.schoolId,
            },
        });
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
        password: yup
            .string()
            .matches(
                passwordRegex,
                "Capital letter, lowercase letter, special character, and a minimum of 8 characters required."
            )
            .required("Required."),
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

        position: yup
            .string()
            .min(2, "Too short!")
            .max(200, "Too long!")
            .required("Required."),
        zip: yup.string().required(),
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
        {
            type: EInputTypes.searchSelect,
            id: "zip",
            label: "Zip Code",
            delay: 1000,
            fetchOptions: fetchLocationInputOptions,
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
        zip: "",
    },

    mapFormToRequestBody: function (values: any) {
        return updateState(values, {
            meta: {
                school: values.schoolId,
            },
        });
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
        password: yup
            .string()
            .matches(
                passwordRegex,
                "Capital letter, lowercase letter, special character, and a minimum of 8 characters required."
            )
            .required("Required."),
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
        zip: yup.string().required(),
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
        {
            type: EInputTypes.searchSelect,
            id: "zip",
            label: "Zip Code",
            delay: 1000,
            fetchOptions: fetchLocationInputOptions,
        },
    ],
});

export const logInFormData: IFormData = {
    initialValues: {
        email: "",
        password: "",
    },

    mapFormToRequestBody: function (values: any) {
        return updateState(values, {});
    },

    validationSchema: yup.object().shape({
        email: yup.string().email("Invalid Email.").required("Required."),
        password: yup.string().required("Required."),
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

const createCourseForm: IFormData = {
    initialValues: {
        title: "",
        shortDescription: "",
        longDescription: "",
        type: "",
        schoolId: "",
    },
    inputs: [
        {
            type: EInputTypes.text,
            id: "title",
            label: "Course title",
        },
        {
            type: EInputTypes.text,
            id: "shortDescription",
            label: "Short Description",
        },
        {
            type: EInputTypes.textarea,
            id: "longDescription",
            label: "Long Description",
        },
        {
            type: EInputTypes.select,
            id: "type",
            label: "Course Type",
            options: courseTypesInputOptions,
        },
        {
            type: EInputTypes.searchSelect,
            id: "schoolId",
            label: "School",
            delay: 1000,
            fetchOptions: fetchSchoolInputOptions,
        },
    ],
    mapFormToRequestBody: function (formData) {
        return updateState(formData, {
            meta: {
                school: formData.schoolId,
            },
        });
    },
    validationSchema: yup.object().shape({
        title: yup
            .string()
            .min(4, "Too short!")
            .max(30, "Too long!")
            .required("Required."),
        shortDescription: yup
            .string()
            .min(4, "Too short!")
            .max(60, "Too long!")
            .required("Required."),
        longDescription: yup.string().min(4, "Too short!").max(60, "Too long!"),
        type: yup.string().required("Required."),
        schoolId: yup.string().matches(objectIdRegex).required("Required."),
    }),
};

const forms = Object.freeze({
    [EForms.INSTRUCTOR_SIGN_UP]: instructorSignUpFormData,
    [EForms.SCHOOL_OFFICIAL_SIGN_UP]: schoolOfficialSignUpFormData,
    [EForms.STUDENT_SIGN_UP]: studentSignUpFormData,
    [EForms.USER_LOG_IN]: logInFormData,
    [EForms.CREATE_COURSE]: createCourseForm,
});

// Naming before exporting as default to allow for autoimports.
export default forms;
