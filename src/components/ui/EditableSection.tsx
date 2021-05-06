import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import InputButton, {
    IInputRenderFunction,
    IInputButtonProps,
} from "../util/InputButton";
import Section, { ISectionProps } from "./Section";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    avatar: {
        width: "100px",
        height: "100px",
    },
    editButton: {
        float: "right",
        margin: "0 10px",
    },
});

export interface IEditableSectionProps extends ISectionProps {
    value: any;
    onEdit(value: any): any;
    buttonText?: string;
    renderInput?: IInputRenderFunction;
    TypographyProps?: TypographyProps;
    TextFieldProps?: TextFieldProps;
    InputButtonProps?: Partial<IInputButtonProps>;
}

const EditableSection: React.FC<IEditableSectionProps> = ({
    value,
    onEdit,
    renderInput,
    buttonText,
    TextFieldProps,
    TypographyProps,
    InputButtonProps,
    children,
    ...sectionProps
}) => {
    const classes = useStyles();

    const isEmpty = !value || value.length === 0;

    return (
        <Section
            {...sectionProps}
            actionEl={
                <InputButton
                    initialValue={value}
                    renderInput={
                        renderInput ||
                        ((value, setValue, { errorMessage }) => (
                            <TextField
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                fullWidth
                                autoFocus
                                error={!!errorMessage}
                                helperText={errorMessage}
                                {...TextFieldProps}
                            />
                        ))
                    }
                    onSubmit={onEdit}
                    ButtonProps={{
                        color: "primary",
                        size: "small",
                        className: classes.editButton,
                    }}
                    {...InputButtonProps}
                >
                    {buttonText ||
                        `${!!value ? "Edit" : "Add"} ${sectionProps.title}`}
                </InputButton>
            }
        >
            {children || (
                <Typography
                    {...TypographyProps}
                    color={value ? "textPrimary" : "textSecondary"}
                >
                    {isEmpty ? `No ${sectionProps.title}` : value}
                </Typography>
            )}
        </Section>
    );
};

export default EditableSection;
