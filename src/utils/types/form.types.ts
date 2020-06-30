export interface IFormData {
    inputs: IInputData[];
    initialValues: any;
}

export enum EInputTypes {
    "select",
    "text",
    "number",
    "textarea",
    "textArray",
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

export type IInputData =
    | ITextInput
    | ISelectInput
    | ITextAreaInput
    | ITextArrayInput;
