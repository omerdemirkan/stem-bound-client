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
    type: ENotificationTypes;
    text: string;
    imgsrc?: string;
    renderActions?: () => any;
    onClick: () => any;
}

export interface INotificationContextState {
    alertQueue: IAlertData[];
    snackbarQueue: ISnackbarData[];
    createAlert(alertData: IAlertData): void;
    createSnackbar(snackbarData: ISnackbarData): void;
}
