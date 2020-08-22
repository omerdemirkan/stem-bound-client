import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";
import { SocketContextProvider } from "../components/contexts/SocketContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <Component {...pageProps} />
            </SocketContextProvider>
        </AuthContextProvider>
    );
};

export default App;
