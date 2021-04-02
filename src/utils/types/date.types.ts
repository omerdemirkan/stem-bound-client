export interface ITimeRange {
    start: Date;
    end: Date;
}

export enum ETimeFrameType {
    ENDED = "ENDED",
    IN_PROGRESS = "IN_PROGRESS",
    UPCOMING = "UPCOMING",
}
