import { expect, test } from '@jest/globals';
import Calendar from "../Calendar";
import Week from "../Week";
import Month from "../Month";
import Festivity from "../Festivity";

const base_calendar = new Calendar(
    'Simple',
    new Week(["w_one", "w_two", "w_three"]),
    [
        new Month("m_one", 7, {
            1: new Festivity("New Year", 1),
        }),
        new Month("m_two", 7, {}),
        new Month("m_three", 9, {
            5: new Festivity("First Day of Celebration", 5),
            6: new Festivity("Second Day of Celebration", 6),
            7: new Festivity("Final Day of Celebration", 7),
        }),
        new Month("m_four", 7, {
            7: new Festivity("End of Year", 7)
        }),
    ]
);

test("integration test", () => {
    const calendar = base_calendar.clone();

    expect(calendar.getDaysInYear()).toBe(30);

    const dayOne = calendar.current();

    expect(dayOne.hasFestivity()).toBeTruthy();
    expect(dayOne.getFestivity()?.name).toBe("New Year");

    // Advance to the next month
    calendar.advance(7);
    expect(calendar.getMonth().name).toBe("m_two");
    expect(calendar.getDayOfYear()).toBe(8);

    // Go back to the previous month
    calendar.back(1);
    expect(calendar.getMonth().name).toBe("m_one");
    expect(calendar.getDayOfYear()).toBe(7);

    // Advance to the third month from the final day of the first month
    calendar.advance(8);
    expect(calendar.getMonth().name).toBe("m_three");
    expect(calendar.getDayOfYear()).toBe(15);

    // Advance to a day before the festivity
    calendar.advance(3);
    expect(calendar.getDayOfYear()).toBe(18);
    expect(calendar.current().hasFestivity()).toBeFalsy();

    // Advance to the first festivity
    calendar.advance(1);
    const cursor_d19 = calendar.current();
    expect(cursor_d19.hasFestivity()).toBeTruthy();
    expect(cursor_d19.getFestivity()?.name).toBe("First Day of Celebration");

    // Assert the festivities of this month are correct
    const third_month = calendar.getMonth();
    expect(third_month.name).toBe("m_three");
    expect(third_month.hasFestivity(4)).toBeFalsy();
    expect(third_month.hasFestivity(5)).toBeTruthy();
    expect(third_month.hasFestivity(6)).toBeTruthy();
    expect(third_month.hasFestivity(7)).toBeTruthy();
    expect(third_month.hasFestivity(8)).toBeFalsy();

    // Advance to next month
    calendar.advance(cursor_d19.month.days - (cursor_d19.day - 1));
    expect(calendar.current().month.name).toBe("m_four");

    // Advance to end of year
    const cursor_m4 = calendar.current();
    calendar.advance(cursor_m4.month.days - cursor_m4.day);

    expect(calendar.getDayOfYear()).toBe(calendar.getDaysInYear());

    expect(calendar.getMonth().hasFestivity(calendar.getDayOfMonth())).toBeTruthy();
    expect(calendar.getMonth().getFestivity(calendar.getDayOfMonth())?.name).toBe("End of Year");

    calendar.advance(1); // happy new year
    expect(calendar.getDayOfYear()).toBe(1);
    expect(calendar.getYear()).toBe(2);
});