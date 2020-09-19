import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import DateFnsUtils from "@date-io/date-fns";

const MuiPickersProvider: React.FC = ({ children }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {children}
        </MuiPickersUtilsProvider>
    );
};

export default MuiPickersProvider;
