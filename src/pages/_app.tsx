import { Provider } from "react-redux";
import "../global.css";

import store from "../store";
import { createWrapper } from "next-redux-wrapper";

const App: React.FC = function ({ Component, pageProps }: any) {
    return (
        <Provider store={store}>
            <Component {...pageProps}></Component>
        </Provider>
    );
};

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
