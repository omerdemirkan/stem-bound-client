import { CardProps } from "@material-ui/core";
import { EUserRoles } from "../../utils/types";
import InstructorSignUpForm from "./InstructorSignUpForm";
import SchoolOfficialSignUpForm from "./SchoolOfficialSignUpForm";
import StudentSignUpForm from "./StudentSignUpForm";

export interface ISignUpFormProps {
    userRole?: EUserRoles;
    onSubmit(values: any): void;
    errorMessage?: string;
    loading?: boolean;
    success?: boolean;
    CardProps?: CardProps;
    withoutCard?: boolean;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({ userRole, ...props }) => {
    switch (userRole) {
        case EUserRoles.INSTRUCTOR:
            return <InstructorSignUpForm {...props} />;
        case EUserRoles.SCHOOL_OFFICIAL:
            return <SchoolOfficialSignUpForm {...props} />;
        case EUserRoles.STUDENT:
            return <StudentSignUpForm {...props} />;
    }
    return null;
};

export default SignUpForm;
