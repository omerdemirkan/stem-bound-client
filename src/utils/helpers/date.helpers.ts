import { ITimeRange } from "../types";

export function getTimeStringValues(
    timeString: string,
    defaultTimeString?: string
): { hours: number; minutes: number } {
    const [hours, minutes] = (timeString || defaultTimeString)
        .split(":")
        .map((t) => +t);
    return { hours, minutes };
}

export function getTimeStringFromDate(date: Date | string): string {
    date = typeof date === "object" ? date : new Date(date);
    return `${addZeroPadding(date.getHours(), 2)}:${addZeroPadding(
        date.getMinutes(),
        2
    )}`;
}

export function configureDateByTimeString(
    date: Date,
    timeString: string
): Date {
    const newDate = new Date(date);
    const { hours, minutes } = getTimeStringValues(timeString);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
}

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
