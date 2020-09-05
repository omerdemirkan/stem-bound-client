import AlertModal, { AlertModalFooter } from "../ui/AlertModal";
import { createContext, useState } from "react";
import {
    INotificationContextState,
    IAlertData,
    ISnackbarData,
} from "../../utils/types";
import { clone } from "../../utils/helpers";

const initialState: INotificationContextState = {
    alertQueue: [],
    snackbarQueue: [],
    createAlert: () => {},
    createSnackbar: () => {},
};

const NotificationContext = createContext(initialState);

export default NotificationContext;

export const NotificationContextProvider: React.FC = ({ children }) => {
    const [alertQueue, setAlertQueue] = useState<IAlertData[]>([]);
    const [snackbarQueue, setSnackbarQueue] = useState<ISnackbarData[]>([]);

    const alert = alertQueue[0];

    function handleCloseAlert() {
        setAlertQueue(function (prev) {
            const newAlerts = clone(prev);
            newAlerts.shift();
            return newAlerts;
        });
    }

    function handleAlertOkButtonClicked() {
        handleCloseAlert();
        alert.onOk();
    }

    function handleAlertCancelButtonClicked() {
        handleCloseAlert();
        alert.onCancel();
    }

    return (
        <NotificationContext.Provider
            value={{
                alertQueue,
                snackbarQueue,
                createAlert: (alertData: IAlertData) =>
                    setAlertQueue((prev) => [...prev, alertData]),
                createSnackbar: (snackbarData: ISnackbarData) =>
                    setSnackbarQueue((prev) => [...prev, snackbarData]),
            }}
        >
            {children}

            <AlertModal
                open={!!alert}
                bodyText={alert?.bodyText}
                headerText={alert?.bodyText}
                hideCloseIcon
            >
                <AlertModalFooter>
                    {alert?.renderFooter ? (
                        alert?.renderFooter()
                    ) : (
                        <>
                            {alert?.onOk && (
                                <button onClick={handleAlertOkButtonClicked}>
                                    OK
                                </button>
                            )}
                            {alert?.onCancel && (
                                <button
                                    onClick={handleAlertCancelButtonClicked}
                                >
                                    CANCEL
                                </button>
                            )}
                        </>
                    )}
                </AlertModalFooter>
            </AlertModal>
        </NotificationContext.Provider>
    );
};
