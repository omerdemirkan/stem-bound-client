import {
    ISelectInputOption,
    ECourseTypes,
    ECourseVerificationStatus,
} from "../types";

export const meetingTypes = {
    IN_PERSON: "In Person",
    REMOTE: "Remote",
};

export const courseTypes = {
    IN_PERSON: "In Person",
    REMOTE: "Remote",
    HYBRID: "Hybrid (In Person and Online)",
};

export const courseTypesInputOptions: ISelectInputOption[] = [
    {
        display: "In Person",
        value: ECourseTypes.IN_PERSON,
    },
    {
        display: "Remote",
        value: ECourseTypes.REMOTE,
    },
    {
        display: "Hybrid",
        value: ECourseTypes.HYBRID,
    },
];

export const courseVerificationStatuses = {
    [ECourseVerificationStatus.DISMISSED]: "Dismissed",
    [ECourseVerificationStatus.VERIFIED]: "Verified",
    [ECourseVerificationStatus.PENDING_VERIFICATION]: "Pending verification",
    [ECourseVerificationStatus.UNPUBLISHED]: "Unpublished",
};
