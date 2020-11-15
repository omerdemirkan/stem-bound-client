import { createContext, useState } from "react";
import {
    INotificationContextState,
    IAlertData,
    ISnackbarData,
} from "../../utils/types";
import { clone } from "../../utils/helpers";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { useSnackbar } from "notistack";

const initialState: INotificationContextState = {
    createAlert: () => {},
    createSnackbar: () => {},
};

const NotificationContext = createContext(initialState);

export default NotificationContext;

export const NotificationContextProvider: React.FC = ({ children }) => {
    const [alertQueue, setAlertQueue] = useState<IAlertData[]>([]);

    const [lastAlert, setLastAlert] = useState<IAlertData>();

    const { enqueueSnackbar } = useSnackbar();

    const alertModalOpen = !!alertQueue.length;
    const alert = alertQueue[0] || lastAlert;

    function handleCloseAlert() {
        if (alertQueue.length === 1) {
            setLastAlert(alertQueue[0]);
        }
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

    function createAlert(alertData: IAlertData) {
        setAlertQueue((prev) => [...prev, alertData]);
    }

    function createSnackbar(snackbarData: ISnackbarData) {
        enqueueSnackbar(snackbarData.text, {
            variant: snackbarData.type,
            onClick: snackbarData.onClick,
            key: snackbarData.text,
        });
    }

    return (
        <NotificationContext.Provider
            value={{
                createAlert,
                createSnackbar,
            }}
        >
            {children}

            <Dialog
                open={!!alertModalOpen}
                onClose={handleAlertCancelButtonClicked}
            >
                <DialogTitle>{alert?.headerText}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alert?.bodyText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {alert?.onCancel && (
                        <Button
                            onClick={handleAlertCancelButtonClicked}
                            color="primary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    )}
                    {alert?.onOk && (
                        <Button
                            onClick={handleAlertOkButtonClicked}
                            color="primary"
                            variant="contained"
                            autoFocus
                        >
                            Ok
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </NotificationContext.Provider>
    );
};
