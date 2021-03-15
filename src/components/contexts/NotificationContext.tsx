import { createContext, useRef, useState } from "react";
import {
    INotificationContextState,
    IAlertData,
    ISnackbarData,
} from "../../utils/types";
import { clone } from "../../utils/helpers";
import { ProviderContext, SnackbarProvider } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const initialState: INotificationContextState = {
    createAlert: () => {},
    createSnackbar: () => {},
};

const NotificationContext = createContext(initialState);

export default NotificationContext;

export const NotificationContextProvider: React.FC = ({ children }) => {
    const [alertQueue, setAlertQueue] = useState<IAlertData[]>([]);

    const [lastAlert, setLastAlert] = useState<IAlertData>();

    const notistackRef = useRef<ProviderContext>();

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
        if (alert.onOk) alert.onOk();
    }

    function handleAlertCancelButtonClicked() {
        handleCloseAlert();
        if (alert.onCancel) alert.onCancel();
    }

    function createAlert(alertData: IAlertData) {
        setAlertQueue((prev) => [...prev, alertData]);
    }

    function createSnackbar(snackbarData: ISnackbarData) {
        notistackRef.current.enqueueSnackbar(snackbarData.text, {
            variant: snackbarData.type,
            onClick: snackbarData.onClick,
            key: snackbarData.text,
        });
    }

    return (
        <SnackbarProvider
            ref={notistackRef as any}
            action={(key) => (
                <IconButton
                    onClick={() => notistackRef.current.closeSnackbar(key)}
                    size="small"
                    color="inherit"
                    aria-label="Close Alert"
                >
                    <CloseIcon />
                </IconButton>
            )}
        >
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
                        {alert?.renderContent
                            ? alert?.renderContent({
                                  closeAlert: handleCloseAlert,
                              })
                            : null}
                    </DialogContent>
                    <DialogActions>
                        {alert?.renderFooter
                            ? alert?.renderFooter({
                                  closeAlert: handleCloseAlert,
                              })
                            : null}
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
        </SnackbarProvider>
    );
};
