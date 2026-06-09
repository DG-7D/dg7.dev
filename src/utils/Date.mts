import { Temporal } from "temporal-polyfill-lite";

export function toJpISODateTimeString(date: Date): string {
    return dateToZonedDateTime(date).toString();
}

export function toJpISODateString(date: Date): string {
    return dateToZonedDateTime(date).toPlainDate().toString();
}

export function toJpDateString(date: Date | string): string {
    const pd = (() => {
        switch (typeof date) {
            case "string":
                return Temporal.PlainDate.from(date);
            case "object":
                return dateToZonedDateTime(date).toPlainDate();
        }
    })();
    return pd.year + "年" + to02d(pd.month) + "月" + to02d(pd.day) + "日";
}

export function toJpTimeString(date: Date): string {
    const pt = dateToZonedDateTime(date).toPlainTime();
    return to02d(pt.hour) + "時" + to02d(pt.minute) + "分";
}

export function toJpDateTimeString(date: Date): string {
    return toJpDateString(date) + " " + toJpTimeString(date);
}

export function dateToZonedDateTime(date: Date): Temporal.ZonedDateTime {
    return Temporal.Instant.from(date.toISOString()).toZonedDateTimeISO("Asia/Tokyo");
}

function to02d(num: number): string {
    return num.toString().padStart(2, "0");
}
