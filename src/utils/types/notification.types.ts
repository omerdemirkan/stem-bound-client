import { VariantType } from "notistack";

export enum ENotificationTypes {
    INFO = "INFO",
    DANGER = "DANGER",
    SUCCESS = "SUCCESS",
}

export interface IAlertData {
    type: ENotificationTypes;
    headerText: string;
    bodyText: string;
    renderFooter?: () => any;
    onOk?: () => any;
    onCancel?: () => any;
}

export interface ISnackbarData {
    type: VariantType;
    text: string;
    imgsrc?: string;
    renderActions?: () => any;
    onClick?: () => any;
    onClose?: () => any;
}

export interface INotificationContextState {
    createAlert(alertData: IAlertData): void;
    createSnackbar(snackbarData: ISnackbarData): void;
}
