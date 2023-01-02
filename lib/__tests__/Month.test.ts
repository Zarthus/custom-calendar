import { expect, test } from '@jest/globals';
import Month from "../Month";
import Festivity from "../Festivity";

const january = new Month("January", 31, {
    1: new Festivity("New Years", 1, "New Years Eve"),
    15: new Festivity("Some Fest", 15, "MockDesc")
});

test('name is correct', () => {
    expect(january.name).toBe("January");
});

test('day count is correct', () => {
    expect(january.days).toBe(31);
});

test('has 2 festivities', () => {
    expect(Object.values(january.festivities).length).toBe(2);

    expect(january.hasFestivity(1)).toBeTruthy();
    expect(january.hasFestivity(2)).toBeFalsy();
    expect(january.hasFestivity(15)).toBeTruthy();
});

test('festivities match their names', () => {
    const newYear = january.getFestivity(1);
    const someFest = january.getFestivity(15);

    expect(newYear?.name).toBe("New Years");
    expect(newYear?.description).toBe("New Years Eve");

    expect(someFest?.name).toBe("Some Fest");
    expect(someFest?.description).toBe("MockDesc");
});
