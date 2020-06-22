import { Provider } from "react-redux";
import store from "../store";
import { createWrapper } from "next-redux-wrapper";
import "../global.css";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <Component {...pageProps}></Component>
        </Provider>
    );
};

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
