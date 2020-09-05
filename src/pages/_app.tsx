import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";
import { NotificationContextProvider } from "../components/contexts/NotificationContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <NotificationContextProvider>
                    <Component {...pageProps} />
                </NotificationContextProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    );
};

export default App;
