import { ISelectInputOption, ECourseTypes } from "../types";

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
