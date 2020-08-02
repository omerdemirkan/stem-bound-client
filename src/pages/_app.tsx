import "../styles/index.css";
import { AuthContextProvider } from "../components/contexts/AuthContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <AuthContextProvider>
            <Component {...pageProps}></Component>
        </AuthContextProvider>
    );
};

export default App;
