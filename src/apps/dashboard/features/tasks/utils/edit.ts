import type { TaskTriggerInfo } from '@jellyfin/sdk/lib/generated-client/models/task-trigger-info';
import { format, formatDistanceStrict, Locale, parse } from 'date-fns';
import { translate } from 'lib/globalize';
import { INTERVAL_DURATIONS } from '../constants/intervalDurations';

function getDisplayTime(ticks: number, locale: Locale) {
    const ms = ticks / 1e4;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setTime(now.getTime() + ms);
    return format(now, 'p', { locale: locale });
}

export function getTimeOfDayOptions(locale: Locale) {
    const options = [];

    for (let i = 0; i < 86400000; i += 900000) {
        options.push({
            name: getDisplayTime(i * 10000, locale),
            value: i * 10000
        });
    }

    return options;
}

export function getIntervalOptions(locale: Locale) {
    const options = [];

    for (const ticksDuration of INTERVAL_DURATIONS) {
        const durationMs = Math.floor(ticksDuration / 1e4);
        const unit = durationMs < 36e5 ? 'minute' : 'hour';
        options.push({
            name: formatDistanceStrict(0, durationMs, { locale: locale, unit: unit }),
            value: ticksDuration
        });
    }

    return options;
}

function getIntervalTriggerTime(ticks: number) {
    const hours = ticks / 36e9;

    switch (hours) {
        case 0.25:
            return translate('EveryXMinutes', '15');
        case 0.5:
            return translate('EveryXMinutes', '30');
        case 0.75:
            return translate('EveryXMinutes', '45');
        case 1:
            return translate('EveryHour');
        default:
            return translate('EveryXHours', hours);
    }
}

function localizeDayOfWeek(dayOfWeek: string | null | undefined, locale: Locale) {
    if (!dayOfWeek) return '';

    const parsedDayOfWeek = parse(dayOfWeek, 'cccc', new Date());

    return format(parsedDayOfWeek, 'cccc', { locale: locale });
}

export function getTriggerFriendlyName(trigger: TaskTriggerInfo, locale: Locale) {
    switch (trigger.Type) {
        case 'DailyTrigger':
            return translate('DailyAt', getDisplayTime(trigger.TimeOfDayTicks || 0, locale));
        case 'WeeklyTrigger':
            return translate('WeeklyAt', localizeDayOfWeek(trigger.DayOfWeek, locale), getDisplayTime(trigger.TimeOfDayTicks || 0, locale));
        case 'IntervalTrigger':
            return getIntervalTriggerTime(trigger.IntervalTicks || 0);
        case 'StartupTrigger':
            return translate('OnApplicationStartup');
        default:
            return trigger.Type;
    }
}
