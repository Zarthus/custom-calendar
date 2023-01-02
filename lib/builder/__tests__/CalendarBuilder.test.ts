import { expect, test } from '@jest/globals';
import BuilderMonth from "../BuilderMonth";
import CalendarBuilder from "../CalendarBuilder";
import Month from "../../Month";
import Week from "../../Week";

const threeDayWeek = new Week(["Monday", "Tuesday", "Wednesday"]);

test('static builder method works', () => {
    const calendar = CalendarBuilder.builder("Simple", ["a", "b", "c"])
        .addBuilderMonth(new BuilderMonth("first", 4))
        .build();

    expect(calendar.week.getDaysInWeek()).toBe(3);
    expect(calendar.week.name(0)).toBe("a");
});

test('it builds a simple calendar', () => {
    const simple = new CalendarBuilder("Simple", threeDayWeek)
        .addMonth(new Month("first", 3, {}))
        .addBuilderMonth(
            new BuilderMonth("second", 4)
                .addFestivity("name", 3)
        )
        .build();

    expect(simple.getName()).toBe("Simple");
    expect(simple.getYear()).toBe(1);
    expect(simple.getWeeksPassed()).toBe(0);
    expect(simple.getMonthsPassed()).toBe(0);
    expect(simple.getDaysInYear()).toBe(7);

    simple.advance(5);

    expect(simple.getWeeksPassed()).toBe(2);
    expect(simple.getMonthsPassed()).toBe(1);
    expect(simple.current().hasFestivity()).toBeTruthy();
});

test('it builds an English Gregorian calendar', () => {
    const gregorian = new CalendarBuilder(
        "Gregorian",
        new Week(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    )
        .addMonth(new Month("January", 31))
        .addMonth(new Month("February", 28))
        .addMonth(new Month("March", 31))
        .addMonth(new Month("April", 30))
        .addMonth(new Month("May", 31))
        .addMonth(new Month("June", 30))
        .addMonth(new Month("July", 31))
        .addMonth(new Month("August", 31))
        .addMonth(new Month("September", 30))
        .addMonth(new Month("October", 31))
        .addMonth(new Month("November", 30))
        .addMonth(new Month("December", 31))
        .build();

    expect(gregorian.getDaysInYear()).toBe(365);
    expect(gregorian.getMonths().length).toBe(12);
    gregorian.advance(364);
    expect(gregorian.getWeeksPassed()).toBe(52);
});

test('throws if you don\'t add any weeks', () => {
    expect(() => {
        new CalendarBuilder(
            "foo",
            new Week([])
        );
    }).toThrow();
});

test('throws if you don\'t add any months', () => {
    expect(() => {
        new CalendarBuilder(
            "foo",
            new Week(["one", "two", "three"])
        ).build();
    }).toThrow();
});

test('starting year and day set properly', () => {
    const cal = new CalendarBuilder(
        "foo",
        new Week(["one", "two", "three"])
    )
        .addMonth(new Month("mo", 30))
        .startingYear(15)
        .startingDay(3)
        .build();

    expect(cal.getYear()).toBe(15);
    expect(cal.getDayOfYear()).toBe(3);
});
