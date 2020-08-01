import { createContext } from "react";
import { IAuthContextState } from "../../utils/types";

export const initialAuthContextState: IAuthContextState = {
    authLoading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
};

const AuthContext = createContext(initialAuthContextState);

export default AuthContext;
