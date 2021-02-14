import Select, { SelectProps } from "@material-ui/core/Select";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { getCurrentSchoolYear, reverseMap } from "../../utils/helpers";
import { validStudentGradeLevels } from "../../utils/constants";
import MenuItem from "@material-ui/core/MenuItem";

export interface IGradeLevelInputProps extends SelectProps {
    value: number;
    FormControlProps?: FormControlProps;
}

const GradeLevelInput: React.FC<IGradeLevelInputProps> = ({
    value,
    FormControlProps,
    ...selectProps
}) => {
    const currentSchoolYear = getCurrentSchoolYear();
    return (
        <FormControl fullWidth margin="normal" {...FormControlProps}>
            <InputLabel id="grade-level-label">
                Grade Level <em>({currentSchoolYear} School Year)</em>
            </InputLabel>
            <Select
                labelId="grade-level-label"
                id="grade-level"
                label="Grade Level"
                fullWidth
                {...selectProps}
            >
                {reverseMap(validStudentGradeLevels, (gradeLevel) => (
                    <MenuItem value={gradeLevel}>{gradeLevel}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GradeLevelInput;
