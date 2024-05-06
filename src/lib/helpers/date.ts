import {DateRange} from "react-day-picker";

export function getDateRangeByMonth(year: number, month: number): DateRange {

    // Get the first and last day of the current month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0); // 0 is the last day of the previous month

    // Return an object with from and to dates
    return {
        from: firstDay,
        to: lastDay
    };
}

export function getDateRangeByYear(year: number): DateRange {
    // Validate year
    if (isNaN(year) || year < 1) {
        throw new Error('Invalid year. Year must be a positive integer.');
    }

    const firstDay = new Date(year, 0, 1); // Jan 1st
    const lastDay = new Date(year, 11, 31); // Dec 31st

    return {
        from: firstDay,
        to: lastDay,
    };
}

export const MONTHS: Month[] = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
];

export function getPastTenYears(): string[] {
    const today = new Date();
    const currentYear = today.getFullYear();

    const pastYears = [];
    for (let year = currentYear - 9; year <= currentYear; year++) {
        pastYears.push(year.toString());
    }

    return pastYears.sort((a, b) => parseInt(b) - parseInt(a));
}

export function getWeeksInMonth(year: number, month: number): WeekDateRange[] {
    // Validate month (0-based indexing)
    if (month < 0 || month > 11) {
        throw new Error('Invalid month. Month must be between 0 (January) and 11 (December).');
    }

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0); // 0 is the last day of the previous month

    const weeks: WeekDateRange[] = [];
    let currentDay = firstDay;

    while (currentDay <= lastDay) {
        const weekStart = currentDay.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' });
        let weekEnd: Date | string = currentDay;

        // Iterate until the end of the week (Saturday) or the last day of the month
        while (currentDay.getDay() !== 6 && currentDay < lastDay) {
            currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
        }
        weekEnd = currentDay.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' });

        weeks.push({
            dateRange: {
                from: new Date(weekStart),
                to: new Date(weekEnd)
            },
            text: `${weekStart} to ${weekEnd}`
        });

        currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1)); // Move to next day
    }

    return weeks;
}

export interface WeekDateRange {
    dateRange: DateRange,
    text: string;
}

export interface Month {
    value: number,
    name: string;
}