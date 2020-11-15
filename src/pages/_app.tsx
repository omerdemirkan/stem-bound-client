import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";
import { NotificationContextProvider } from "../components/contexts/NotificationContext";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import MuiPickersProvider from "../components/contexts/MuiPickersContext";
import { MessagingContextProvider } from "../components/contexts/MessagingContext";
import { SnackbarProvider } from "notistack";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <MuiPickersProvider>
            <SnackbarProvider>
                <ThemeProvider>
                    <AuthContextProvider>
                        <SocketContextProvider>
                            <NotificationContextProvider>
                                <MessagingContextProvider>
                                    <Component {...pageProps} />
                                </MessagingContextProvider>
                            </NotificationContextProvider>
                        </SocketContextProvider>
                    </AuthContextProvider>
                </ThemeProvider>
            </SnackbarProvider>
        </MuiPickersProvider>
    );
};

export default App;
