import { Temporal } from "temporal-polyfill-lite";

export function toJpDateString(date: Temporal.ZonedDateTime | Temporal.PlainDateTime | Temporal.PlainDate): string {
    return date.year + "年" + to02d(date.month) + "月" + to02d(date.day) + "日";
}

export function toJpTimeString(date: Temporal.ZonedDateTime | Temporal.PlainDateTime | Temporal.PlainTime): string {
    return to02d(date.hour) + "時" + to02d(date.minute) + "分";
}

export function toJpDateTimeString(date: Temporal.ZonedDateTime | Temporal.PlainDateTime): string {
    return toJpDateString(date) + " " + toJpTimeString(date);
}

export function dateToJSTDateTime(date: Date): Temporal.ZonedDateTime {
    return isoStringToJSTDateTime(date.toISOString());
}

export function isoStringToJSTDateTime(isoString: string): Temporal.ZonedDateTime {
    // return Temporal.Instant.from(isoString).toZonedDateTimeISO("Asia/Tokyo"); // Gitの嘘のISO出力をDateは読めるがTemporalは読めない🥺
    return Temporal.Instant.from(new Date(isoString).toISOString()).toZonedDateTimeISO("Asia/Tokyo");
}

function to02d(num: number): string {
    return num.toString().padStart(2, "0");
}
