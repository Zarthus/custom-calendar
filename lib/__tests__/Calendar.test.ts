import { expect, test } from '@jest/globals';
import Calendar from "../Calendar";
import Week from "../Week";
import Month from "../Month";

const simpleCalendar = new Calendar(
    'Simple',
    new Week(["w_one", "w_two", "w_three"]),
    [
        new Month("m_one", 7, {}),
        new Month("m_two", 7, {}),
        new Month("m_three", 9, {}),
        new Month("m_four", 7, {}),
    ]
);

test('simple calendar works properly', () => {
    expect(simpleCalendar.name).toBe('Simple');
    expect(simpleCalendar.week.getDaysInWeek()).toBe(3);
    expect(simpleCalendar.getMonths().length).toBe(4);
});

test('advances properly to the next day', () => {
    const copy = simpleCalendar.clone();
    copy.advance(1);

    expect(copy.getDayOfYear()).toBe(simpleCalendar.getDayOfYear() + 1)
});

test('advances properly to the next month', () => {
    const copy = simpleCalendar.clone();
    copy.advance(copy.getMonth().days);

    expect(copy.getMonth().name).toBe("m_two");
});

test('advances properly to the next year', () => {
    const copy = simpleCalendar.clone();
    copy.advance(copy.getDaysInYear() + 1);

    expect(copy.getYear()).toBe(2);
});

test('initializes a proper cursor', () => {
    const copy = simpleCalendar.clone();
    copy.advance((copy.getDaysInYear() * 5) + 50);

    const cursor = copy.current();
    expect(cursor.year).toBe(7);
    expect(cursor.day).toBe(7);
    expect(cursor.weekDayName).toBe("w_one");
    expect(cursor.weeksPassed).toBe(7);
    expect(cursor.hasFestivity()).toBe(false);
    expect(cursor.getFestivity()).toBe(undefined);
    expect(cursor.month.name).toBe("m_three");

    const cursor2 = copy.advance(1).current();
    expect(cursor2.year).toBe(7);
    expect(cursor2.day).toBe(8);
    expect(cursor2.weekDayName).toBe("w_two");
    expect(cursor2.weeksPassed).toBe(7);
    expect(cursor2.hasFestivity()).toBe(false);
    expect(cursor2.getFestivity()).toBe(undefined);
    expect(cursor2.month.name).toBe("m_three");
});

test('months are properly initialized', () => {
    expect(simpleCalendar.getDaysInEachMonth()[0]).toBe(7);
    expect(simpleCalendar.getDaysInEachMonth()[1]).toBe(7);
    expect(simpleCalendar.getDaysInEachMonth()[2]).toBe(9);
    expect(simpleCalendar.getDaysInEachMonth()[3]).toBe(7);
});

test('throws if navigating to the year -1', () => {
    const copy = simpleCalendar.clone();

    expect(() => {
        copy.back(copy.getDaysInYear() * (1 + copy.getYear()));
    }).toThrow();
});

test('does not throw if navigating back with throw-suppression', () => {
    const copy = simpleCalendar.clone();
    copy.back(copy.getDaysInYear() * 3, false);

    expect(copy.getYear()).toBe(-2);
});

test('edge-case: provides advance() with a negative number sends it to back', () => {
    const copy = simpleCalendar.clone();

    copy.advance(3);

    const expected = copy.getDayOfYear() - 1;
    copy.advance(-1);
    expect(copy.getDayOfYear()).toBe(expected);
});

test('edge-case: provides back() with a negative number sends it to advance', () => {
    const copy = simpleCalendar.clone();

    copy.advance(3);

    const expected = copy.getDayOfYear() + 1;
    copy.back(-1);
    expect(copy.getDayOfYear()).toBe(expected);
});

test('edge-case: advance() and back() ignore 0 days', () => {
    const copy = simpleCalendar.clone();

    copy.advance(0);
    copy.back(0);

    expect(copy.getDayOfYear()).toBe(simpleCalendar.getDayOfYear());
});