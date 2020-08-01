import { Provider } from "react-redux";
import "../styles/index.css";

import store from "../store";
import { createWrapper } from "next-redux-wrapper";
import { AuthContextProvider } from "../components/contexts/AuthContext";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <AuthContextProvider>
            <Provider store={store}>
                <Component {...pageProps}></Component>
            </Provider>
        </AuthContextProvider>
    );
};

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
