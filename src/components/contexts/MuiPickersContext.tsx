import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import MomentUtils from "@date-io/moment";

const MuiPickersProvider: React.FC = ({ children }) => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            {children}
        </MuiPickersUtilsProvider>
    );
};

export default MuiPickersProvider;
