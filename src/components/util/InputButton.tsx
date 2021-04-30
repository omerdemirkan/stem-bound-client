import { useState, Dispatch, ChangeEvent } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    IValidationAmount,
    IValidatorFunction,
} from "../../utils/types/validation.types";
import {
    configureErrorMessageFromValidators,
    configureMaxLengthValidator,
    configureMinLengthValidator,
} from "../../utils/helpers";
import { Box } from "@material-ui/core";

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
    validate?: IValidatorFunction<any>[] | IValidatorFunction<any>;
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
    validate,
    minLength,
    maxLength,
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>(initialValue);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    function handleSubmitClicked() {
        validate = validate || [];
        let validators = Array.isArray(validate) ? validate : [validate];
        if (minLength) validators.push(configureMinLengthValidator(minLength));
        if (maxLength) validators.push(configureMaxLengthValidator(maxLength));
        const errorMessage = configureErrorMessageFromValidators(
            value,
            validators
        );
        if (!errorMessage) {
            onSubmit(value);
            setModalOpen(false);
            setErrorMessage(null);
        } else {
            setErrorMessage(errorMessage);
        }
    }

    function handleCancelClicked() {
        setModalOpen(false);
        setErrorMessage(null);
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
                fullWidth
                {...DialogProps}
            >
                <Box className="dialog-content-container" width="100%">
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
                                    onClick={handleCancelClicked}
                                    color="primary"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmitClicked}
                                    color="primary"
                                    variant="contained"
                                    autoFocus
                                >
                                    Continue
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Box>
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

// Attempt to make input button dialog a context screen

// import { useState, Dispatch, ChangeEvent, useContext } from "react";
// import Button, { ButtonProps } from "@material-ui/core/Button";
// import Dialog, { DialogProps } from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import {
//     IValidationAmount,
//     IValidatorFunction,
// } from "../../utils/types/validation.types";
// import {
//     configureErrorMessageFromValidators,
//     configureMaxLengthValidator,
//     configureMinLengthValidator,
// } from "../../utils/helpers";
// import Box from "@material-ui/core/Box";
// import NotificationContext from "../contexts/NotificationContext";
// import ScreenLayout from "../layouts/ScreenLayout";

// export type IInputRenderFunction = (
//     value: any,
//     setValue: Dispatch<any>,
//     options?: {
//         updateFields(value: any): void;
//         handleChange(event: ChangeEvent<any>): void;
//         errorMessage: string;
//     }
// ) => any;

// export type IButtonRenderFunction = (props: {
//     onClick(): any;
//     disabled: boolean;
// }) => any;

// export interface IInputButtonProps {
//     renderInput?: IInputRenderFunction;
//     renderButton?: IButtonRenderFunction;
//     renderActions?(actionHelpers: { close: (values: any) => void }): any;
//     onSubmit: (value: any) => any;
//     initialValue?: any;
//     disabled?: boolean;
//     ButtonProps?: ButtonProps;
//     DialogProps?: DialogProps;
//     validate?: IValidatorFunction<any>[] | IValidatorFunction<any>;
//     minLength?: IValidationAmount<number>;
//     maxLength?: IValidationAmount<number>;
// }

// const InputButton: React.FC<IInputButtonProps> = ({
//     children,
//     onSubmit,
//     renderInput,
//     initialValue,
//     disabled,
//     renderButton,
//     renderActions,
//     ButtonProps,
//     DialogProps,
//     validate,
//     minLength,
//     maxLength,
// }) => {
//     const [value, setValue] = useState<any>(initialValue);
//     const [errorMessage, setErrorMessage] = useState<string | null>();
//     const { createScreen } = useContext(NotificationContext);

//     function handleSubmitClicked() {
//         validate = validate || [];
//         let validators = Array.isArray(validate) ? validate : [validate];
//         if (minLength) validators.push(configureMinLengthValidator(minLength));
//         if (maxLength) validators.push(configureMaxLengthValidator(maxLength));
//         const errorMessage = configureErrorMessageFromValidators(
//             value,
//             validators
//         );
//         if (!errorMessage) {
//             onSubmit(value);
//             setErrorMessage(null);
//         } else {
//             setErrorMessage(errorMessage);
//         }
//     }

//     function handleButtonClicked() {
//         createScreen({
//             renderContent: ({ onClose }) => (
//                 <>
//                     <DialogContent>
//                         {renderInput(value, setValue, {
//                             updateFields,
//                             handleChange,
//                             errorMessage,
//                         })}
//                     </DialogContent>
//                     <DialogActions>
//                         {renderActions ? (
//                             renderActions({
//                                 close: onClose,
//                             })
//                         ) : (
//                             <>
//                                 <Button
//                                     onClick={onClose}
//                                     color="primary"
//                                     variant="outlined"
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     onClick={function () {
//                                         handleSubmitClicked();
//                                         onClose();
//                                     }}
//                                     color="primary"
//                                     variant="contained"
//                                     autoFocus
//                                 >
//                                     Continue
//                                 </Button>
//                             </>
//                         )}
//                     </DialogActions>
//                 </>
//             ),
//             DialogProps: { maxWidth: "sm" },
//         });
//         // setModalOpen(true);
//         setValue(initialValue);
//     }

//     function updateFields(updates: any) {
//         setValue((prev) => ({ ...prev, ...updates }));
//     }

//     function handleChange(e: ChangeEvent<any>) {
//         updateFields({ [e.target.name || e.target.id]: e.target.value });
//     }

//     return renderButton ? (
//         renderButton({ onClick: handleButtonClicked, disabled })
//     ) : (
//         <Button
//             onClick={handleButtonClicked}
//             disabled={disabled}
//             {...ButtonProps}
//         >
//             {children}
//         </Button>
//     );
// };

// export default InputButton;
