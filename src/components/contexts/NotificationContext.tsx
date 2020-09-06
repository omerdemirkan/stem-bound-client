import AlertModal, { AlertModalFooter } from "../ui/AlertModal";
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
import SnackBar from "../ui/SnackBar";
import useSocket from "../hooks/useSocket";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";

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

            user = mapUserData(user);
            createSnackbar({
                text: `${user.firstName} ${user.lastName} sent you a message`,
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

    const alert = alertQueue[0];

    function handleCloseAlert() {
        setAlertQueue(function (prev) {
            const newAlerts = clone(prev);
            newAlerts.shift();
            return newAlerts;
        });
    }

    function handleCloseSnackbar(index: number) {
        setSnackbarQueue((prev) => prev.filter((s, i) => i !== index));
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

            <AlertModal
                open={!!alert}
                bodyText={alert?.bodyText}
                headerText={alert?.headerText}
                hideCloseIcon
            >
                <AlertModalFooter>
                    {alert?.renderFooter ? (
                        alert?.renderFooter()
                    ) : (
                        <>
                            {alert?.onCancel && (
                                <button
                                    onClick={handleAlertCancelButtonClicked}
                                >
                                    CANCEL
                                </button>
                            )}
                            {alert?.onOk && (
                                <button onClick={handleAlertOkButtonClicked}>
                                    OK
                                </button>
                            )}
                        </>
                    )}
                </AlertModalFooter>
            </AlertModal>

            {snackbarQueue.map((snackbarData: ISnackbarData, index) => (
                <SnackBar
                    text={snackbarData.text}
                    key={`snackbar[${index}]`}
                    onClose={() => handleCloseSnackbar(index)}
                    onClick={snackbarData.onClick}
                    type={snackbarData.type}
                />
            ))}
        </NotificationContext.Provider>
    );
};
