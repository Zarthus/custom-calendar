import Month from "./Month";
import Festivity from "./Festivity";

class Cursor {
    constructor(
        // The current year
        public readonly year: number,
        // Total number of days passed this year
        public readonly daysPassed: number,
        // Day of the current month
        public readonly day: number,
        // The name of the current weekday
        public readonly weekDayName: string,
        // The number of weeks passed this year (inclusive)
        public readonly weeksPassed: number,
        // The number of months passed this year (inclusive)
        public readonly monthsPassed: number,
        // The current month
        public readonly month: Month
    ) {
    }

    hasFestivity(): boolean {
        return this.month.getFestivity(this.day) !== undefined;
    }

    getFestivity(): Festivity | undefined {
        return this.month.getFestivity(this.day);
    }
}

export default Cursor;