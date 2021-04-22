import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";
import { NotificationContextProvider } from "../components/contexts/NotificationContext";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import MuiPickersProvider from "../components/contexts/MuiPickersContext";
import { MessagingContextProvider } from "../components/contexts/MessagingContext";
import { CssBaseline } from "@material-ui/core";
import { useEffect } from "react";
import { pingServer } from "../utils/services";

const App: React.FC = function ({ Component, pageProps }: any) {
    useEffect(function () {
        pingServer();
    }, []);

    return (
        <>
            <CssBaseline />
            <AuthContextProvider>
                <MuiPickersProvider>
                    <ThemeProvider>
                        <NotificationContextProvider>
                            <SocketContextProvider>
                                <MessagingContextProvider>
                                    <Component {...pageProps} />
                                </MessagingContextProvider>
                            </SocketContextProvider>
                        </NotificationContextProvider>
                    </ThemeProvider>
                </MuiPickersProvider>
            </AuthContextProvider>
        </>
    );
};

export default App;
