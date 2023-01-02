import { expect, test } from '@jest/globals';
import Cursor from "../Cursor";
import Month from "../Month";
import Week from "../Week";

test('it initializes properly', () => {
    const cursor = new Cursor(
        5,
        4,
        3,
        "Wednesday",
        1,
        20,
        new Month("April", 31, {})
    );

    expect(cursor.year).toBe(5);
    expect(cursor.day).toBe(3);
});
