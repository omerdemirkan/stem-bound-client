import { defaultInputErrorMessage } from "../constants";
import {
    IValidationAmount,
    IValidatorFunction,
} from "../types/validation.types";

export function configureValidationAmountDTO<T>(
    validationAmount: IValidationAmount<T>
): { amount: T; message: string } {
    return Array.isArray(validationAmount)
        ? {
              amount: validationAmount[0],
              message: validationAmount[1],
          }
        : {
              amount: validationAmount,
              message: defaultInputErrorMessage,
          };
}

export function configureMinValidator<T>(
    validationAmount: IValidationAmount<T>
): IValidatorFunction<T> {
    const { amount, message } = configureValidationAmountDTO(validationAmount);
    return (data: T) => (data < amount ? message : true);
}

export function configureMinLengthValidator<T>(
    validationAmount: IValidationAmount<T>
): IValidatorFunction<T> {
    return (data: any) => configureMinValidator(validationAmount)(data.length);
}

export function configureMaxValidator<T>(
    validationAmount: IValidationAmount<T>
): IValidatorFunction<T> {
    const { amount, message } = configureValidationAmountDTO(validationAmount);
    return (data: T) => (data > amount ? message : true);
}

export function configureMaxLengthValidator<T>(
    validationAmount: IValidationAmount<T>
): IValidatorFunction<T> {
    return (data: any) => configureMaxValidator(validationAmount)(data.length);
}

export function configureErrorMessageFromValidators<T>(
    value: T,
    validators: IValidatorFunction<T>[]
) {
    let validationResult;
    for (let validator of validators) {
        validationResult = validator(value);
        if (typeof validationResult === "string") return validationResult;
        if (validationResult === false) return defaultInputErrorMessage;
    }
    return null;
}
