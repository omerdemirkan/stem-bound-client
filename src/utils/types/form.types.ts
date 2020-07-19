export interface IFormData {
    inputs: IInputData[];
    initialValues: any;
    mapFormToRequestBody: (values: any) => any;
    validationSchema: object;
}

export enum EInputTypes {
    "select",
    "text",
    "number",
    "textarea",
    "textArray",
    "searchSelect",
}

export interface ITextInput {
    id: string;
    type: EInputTypes.text;
    hidden?: boolean;
    toggleHidden?: boolean;
    icon?: React.FC;
    label?: string;
}

export interface ISelectInputOption {
    value: any;
    display: string;
}

export interface ISelectInput {
    id: string;
    type: EInputTypes.select;
    options: ISelectInputOption[];
    label?: string;
}

export interface INumberInput {
    id: string;
    type: EInputTypes.number;
    label?: string;
}

export interface ITextAreaInput {
    id: string;
    type: EInputTypes.textarea;
    label?: string;
    rows?: number;
    cols?: number;
}

export interface ITextArrayInput {
    id: string;
    type: EInputTypes.textArray;
    label: string;
}

export interface ISearchSelectInput {
    type: EInputTypes.searchSelect;
    delay: number;
    id: string;
    fetchOptions: (s: string) => Promise<ISelectInputOption[]>;
    label?: string;
    initialOptions?: ISelectInputOption[];
}

export type IInputData =
    | ITextInput
    | ISelectInput
    | ITextAreaInput
    | ITextArrayInput
    | ISearchSelectInput;

export enum EForms {
    "INSTRUCTOR_SIGN_UP",
    "SCHOOL_OFFICIAL_SIGN_UP",
    "STUDENT_SIGN_UP",
    "USER_LOG_IN",
    "CREATE_COURSE",
}
