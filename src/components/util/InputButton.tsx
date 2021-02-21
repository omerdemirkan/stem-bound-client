import { useState, Dispatch, ChangeEvent } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    IValidationAmount,
    IValidatorFunction,
} from "../../utils/types/validation.types";
import { defaultInputErrorMessage } from "../../utils/constants";
import {
    configureErrorMessageFromValidators,
    configureMaxLengthValidator,
    configureMinLengthValidator,
} from "../../utils/helpers";

export type IInputRenderFunction = (
    value: any,
    setValue: Dispatch<any>,
    options?: {
        updateFields(value: any): void;
        handleChange(event: ChangeEvent<any>): void;
        errorMessage: string;
    }
) => any;

export type IButtonRenderFunction = (props: {
    onClick(): any;
    disabled: boolean;
}) => any;

export interface IInputButtonProps {
    renderInput?: IInputRenderFunction;
    renderButton?: IButtonRenderFunction;
    renderActions?(actionHelpers: { close: (values: any) => void }): any;
    onSubmit: (value: any) => any;
    initialValue?: any;
    disabled?: boolean;
    ButtonProps?: ButtonProps;
    DialogProps?: DialogProps;
    validators?: IValidatorFunction<any>[];
    minLength?: IValidationAmount<number>;
    maxLength?: IValidationAmount<number>;
}

const InputButton: React.FC<IInputButtonProps> = ({
    children,
    onSubmit,
    renderInput,
    initialValue,
    disabled,
    renderButton,
    renderActions,
    ButtonProps,
    DialogProps,
    validators,
    minLength,
    maxLength,
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>(initialValue);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    function handleSubmit() {
        let submitValidators = validators || [];
        if (minLength)
            submitValidators.push(configureMinLengthValidator(minLength));
        if (maxLength)
            submitValidators.push(configureMaxLengthValidator(maxLength));
        const errorMessage = configureErrorMessageFromValidators(
            value,
            submitValidators
        );
        if (!errorMessage) {
            onSubmit(value);
            setModalOpen(false);
        } else {
            setErrorMessage(errorMessage);
        }
    }

    function handleError(message?: string) {
        setErrorMessage(message || defaultInputErrorMessage);
    }

    function handleButtonClicked() {
        setModalOpen(true);
        setValue(initialValue);
    }

    function updateFields(updates: any) {
        setValue((prev) => ({ ...prev, ...updates }));
    }

    function handleChange(e: ChangeEvent<any>) {
        updateFields({ [e.target.name || e.target.id]: e.target.value });
    }

    return (
        <>
            {renderButton ? (
                renderButton({ onClick: handleButtonClicked, disabled })
            ) : (
                <Button
                    onClick={handleButtonClicked}
                    disabled={disabled}
                    {...ButtonProps}
                >
                    {children}
                </Button>
            )}

            <Dialog
                open={!!modalOpen}
                onClose={() => setModalOpen(false)}
                maxWidth="sm"
                {...DialogProps}
            >
                <div className="dialog-content-container">
                    <DialogContent>
                        {renderInput(value, setValue, {
                            updateFields,
                            handleChange,
                            errorMessage,
                        })}
                    </DialogContent>
                    <DialogActions>
                        {renderActions ? (
                            renderActions({
                                close: function () {
                                    setModalOpen(false);
                                    return value;
                                },
                            })
                        ) : (
                            <>
                                <Button
                                    onClick={() => setModalOpen(false)}
                                    color="primary"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    color="primary"
                                    variant="contained"
                                    autoFocus
                                >
                                    Continue
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>

            <style jsx>{`
                .dialog-content-container {
                    width: 450px;
                    max-width: 100%;
                }
            `}</style>
        </>
    );
};

export default InputButton;
