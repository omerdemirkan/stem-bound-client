import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";
import { NotificationContextProvider } from "../components/contexts/NotificationContext";
import { ThemeProvider } from "../components/contexts/ThemeContext";
import MuiPickersProvider from "../components/contexts/MuiPickersContext";
import { MessagingContextProvider } from "../components/contexts/MessagingContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <MuiPickersProvider>
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
        </MuiPickersProvider>
    );
};

export default App;
