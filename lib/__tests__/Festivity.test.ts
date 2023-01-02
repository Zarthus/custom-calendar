import { expect, test } from '@jest/globals';
import Festivity from "../Festivity";

const newYear = new Festivity("New Years", 1, "ny");

test('name is correct', () => {
    expect(newYear.name).toBe("New Years");
});

test('day is correct', () => {
    expect(newYear.day).toBe(1);
});

test('description is correct', () => {
    expect(newYear.description).toBe("ny");
});
