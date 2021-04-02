import format from "date-fns/format";
import { ETimeFrameType, ITimeRange } from "../types";

export function addZeroPadding(num, size): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export function validateTimeRange({ start, end }: ITimeRange): boolean {
    start = typeof start === "string" ? new Date(start) : start;
    end = typeof end === "string" ? new Date(end) : end;

    return (
        end.getHours() * 60 + end.getMinutes() >
        start.getHours() * 60 + start.getMinutes()
    );
}

export function getFormalDateAndTime(d: string | Date) {
    const date = typeof d === "string" ? new Date(d) : d;
    return format(date, "h:ss a, MM/dd/yyyy");
}

export function getFormalDate(d: string | Date) {
    const date = typeof d === "string" ? new Date(d) : d;
    return format(date, "MM/dd/yyyy");
}

export function getTimeFrameType({ start, end }: ITimeRange): ETimeFrameType {
    const now = new Date();
    start = start instanceof Date ? start : new Date(start);
    end = end instanceof Date ? end : new Date(end);
    if (now < start) return ETimeFrameType.FUTURE;
    if (now > end) return ETimeFrameType.PAST;
    return ETimeFrameType.IN_PROGRESS;
}
