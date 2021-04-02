export interface ITimeRange {
    start: Date;
    end: Date;
}

export enum ETimeFrameType {
    PAST = "PAST",
    IN_PROGRESS = "IN_PROGRESS",
    FUTURE = "FUTURE",
}
