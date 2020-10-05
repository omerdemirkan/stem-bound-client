import { createContext, useState, useContext } from "react";
import {
    INotificationContextState,
    IAlertData,
    ISnackbarData,
    ESocketEvents,
    IUserOriginal,
    ENotificationTypes,
    IAnnouncementOriginal,
    ICourseOriginal,
} from "../../utils/types";
import { clone, mapUserData } from "../../utils/helpers";
import useSocket from "../hooks/useSocket";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

    const [lastAlert, setLastAlert] = useState<IAlertData>();
    const [lastSnackbar, setLastSnackbar] = useState<ISnackbarData>();

    const router = useRouter();

    const { user } = useContext(AuthContext);

    useSocket(function (socket: SocketIOClient.Socket) {
        const localUser = user;
        socket.on(ESocketEvents.CHAT_MESSAGE_CREATED, function ({
            user,
            chatId,
        }: {
            user: IUserOriginal;
            chatId: string;
        }) {
            if (localUser._id === user._id || router.query?.id === chatId)
                return;

            const mappedUser = mapUserData(user);
            createSnackbar({
                text: `${mappedUser.firstName} ${mappedUser.lastName} sent you a message`,
                onClick: () =>
                    router.push(`/app/messaging`, {
                        query: { id: chatId },
                    }),
                type: ENotificationTypes.INFO,
            });
        });

        socket.on(ESocketEvents.COURSE_ANNOUNCEMENT_CREATED, function ({
            announcement,
            course,
        }: {
            announcement: IAnnouncementOriginal;
            course: ICourseOriginal;
        }) {
            createSnackbar({
                text: `${course.title} - New Announcement: ${announcement.text}`,
                type: ENotificationTypes.INFO,
            });
        });
    });

    const alertModalOpen = !!alertQueue.length;
    const alert = alertQueue[0] || lastAlert;
    const snackbarOpen = !!snackbarQueue.length;
    const snackbar = snackbarQueue[0] || lastSnackbar;

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

    function handleCloseSnackbar() {
        if (snackbarQueue.length === 1) {
            setLastSnackbar(snackbarQueue[0]);
        }
        setSnackbarQueue(function (prev) {
            const newSnackbars = clone(prev);
            newSnackbars.shift();
            return newSnackbars;
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
        setSnackbarQueue((prev) => [...prev, snackbarData]);
    }

    return (
        <NotificationContext.Provider
            value={{
                alertQueue,
                snackbarQueue,
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

            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={snackbar?.text}
                action={
                    <>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </NotificationContext.Provider>
    );
};
