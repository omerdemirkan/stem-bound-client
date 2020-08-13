export function getTimeStringValues(
    timeString: string,
    defaultTimeString?: string
): { hours: number; minutes: number } {
    const [hours, minutes] = (timeString || defaultTimeString)
        .split(":")
        .map((t) => +t);
    return { hours, minutes };
}

export function getTimeStringFromDate(date: Date): string {
    date = typeof date === "object" ? date : new Date(date);
    return `${addZeroPadding(date.getHours(), 2)}:${addZeroPadding(
        date.getMinutes(),
        2
    )}`;
}

export function getDateAppendedToTimeString(
    date: Date,
    timeString: string
): Date {
    const newDate = new Date(date);
    const { hours, minutes } = getTimeStringValues(timeString);
    newDate.setMinutes(hours * 60 + minutes);
    return newDate;
}

export function addZeroPadding(num, size): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
