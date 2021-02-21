export type IValidatorFunction<T> = (value: T) => boolean | string;

export type IValidationAmount<T> = T | [T, string];
