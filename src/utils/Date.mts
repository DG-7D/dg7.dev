import { Temporal } from "temporal-polyfill-lite";

export function toJpDateString(date: Temporal.ZonedDateTime | Temporal.PlainDate): string {
    if (!(date instanceof Temporal.PlainDate)) {
        date = date.toPlainDate();
    }
    return date.year + "年" + to02d(date.month) + "月" + to02d(date.day) + "日";
}

export function toJpTimeString(date: Temporal.ZonedDateTime): string {
    const pt = date.toPlainTime();
    return to02d(pt.hour) + "時" + to02d(pt.minute) + "分";
}

export function toJpDateTimeString(date: Temporal.ZonedDateTime): string {
    return toJpDateString(date) + " " + toJpTimeString(date);
}

export function dateToZonedDateTime(date: Date): Temporal.ZonedDateTime {
    return isoStringToZonedDateTime(date.toISOString());
}

export function isoStringToZonedDateTime(isoString: string): Temporal.ZonedDateTime {
    // return Temporal.Instant.from(isoString).toZonedDateTimeISO("Asia/Tokyo"); // Gitの嘘のISO出力をDateは読めるがTemporalは読めない🥺
    return Temporal.Instant.from(new Date(isoString).toISOString()).toZonedDateTimeISO("Asia/Tokyo");
}

function to02d(num: number): string {
    return num.toString().padStart(2, "0");
}
