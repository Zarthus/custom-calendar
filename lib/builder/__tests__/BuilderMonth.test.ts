import { expect, test } from '@jest/globals';
import BuilderMonth from "../BuilderMonth";
import Festivity from "../../Festivity";

test('freezing the builder month has correct values', () => {
    const bm = new BuilderMonth("foo", 10);
    const frozen = bm.freeze();

    expect(frozen.name).toBe("foo");
    expect(frozen.days).toBe(10);
    expect(Object.values(frozen.festivities).length).toBe(0);
});

test('freezing the builder month with festivities has correct values', () => {
    const bm = new BuilderMonth("foo", 10)
        .addFestivityObject(new Festivity("1", 1, null))
        .addFestivityObject(new Festivity("2", 3, null))
        .addFestivityObject(new Festivity("3", 4, null));

    expect(Object.values(bm.freeze().festivities).length).toBe(3);
});

test('disallows duplicate-day festivities', () => {
    expect(() => {
        new BuilderMonth("foo", 10)
            .addFestivityObject(new Festivity("1", 1, null))
            .addFestivityObject(new Festivity("1", 1, null))
    }).toThrow();
});

test('disallows days outside of the scope of the month', () => {
    expect(() => {
        new BuilderMonth("foo", 2)
            .addFestivityObject(new Festivity("1", 3, null))
    }).toThrow();
});

test('disallows zero or fewer days', () => {
    expect(() => {
        new BuilderMonth("foo", 0)
    }).toThrow();

    expect(() => {
        new BuilderMonth("foo", -15)
    }).toThrow();
});
