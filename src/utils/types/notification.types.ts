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
    renderFooter?: (helpers?: { closeAlert(): any }) => any;
    renderContent?: (helpers?: { closeAlert(): any }) => any;
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

export interface IScreenData {
    Component?: React.FC<{ onClose(): void }>;
    content?: any;
    renderContent?(data: { onClose(): void }): any;
}

export interface INotificationContextState {
    createAlert(alertData: IAlertData): void;
    createSnackbar(snackbarData: ISnackbarData): void;
    createScreen(screenData: IScreenData): void;
}
