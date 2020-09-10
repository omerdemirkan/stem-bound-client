import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";
import { NotificationContextProvider } from "../components/contexts/NotificationContext";
import { ThemeProvider } from "../components/contexts/ThemeContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <NotificationContextProvider>
                    <ThemeProvider>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </NotificationContextProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    );
};

export default App;
