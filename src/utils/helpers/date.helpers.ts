import { ITimeStringRange } from "../types";

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

export function validateTimeStringRange({ start, end }: ITimeStringRange) {
    const { hours: startHours, minutes: startMinutes } = getTimeStringValues(
        start
    );
    const { hours: endHours, minutes: endMinutes } = getTimeStringValues(end);

    return endHours * 60 + endMinutes > startHours * 60 + startMinutes;
}
