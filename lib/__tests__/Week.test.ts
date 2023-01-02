import { expect, test } from '@jest/globals';
import Week from "../Week";

const englishWeeks = new Week(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

test('has seven days', () => {
    expect(englishWeeks.getDaysInWeek()).toBe(7);
});

test('the first day is monday', () => {
    expect(englishWeeks.name(0)).toBe("Monday");
});

test('the second day is Tuesday', () => {
    expect(englishWeeks.name(1)).toBe("Tuesday");
});

test('the last day is Sunday', () => {
    expect(englishWeeks.name(6)).toBe("Sunday");
});

test('the last day + 1 throws error', () => {
    expect(() => {
        englishWeeks.name(7);
    }).toThrow();
});

test('negative indices throws error', () => {
    expect(() => {
        englishWeeks.name(-1);
    }).toThrow();
});