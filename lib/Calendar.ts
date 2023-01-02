import Month from "./Month";
import Cursor from "./Cursor";
import Week from "./Week";

class Calendar {
    private year: number;
    private day: number = 0;
    private dayToMonthNumberMap: { [key: number]: number } = {};
    private daysInEachMonth: Array<number> = [];
    private daysInAYear: number = 0;

    constructor(
        public readonly name: string,
        public readonly week: Week,
        public readonly months: Array<Month>,
        starting_year: number = 1,
        starting_day: number = 1,
    ) {
        this.year = starting_year;
        this.generateMap();
        this.advance(starting_day);
    }

    /**
     * @return Cursor Returns a cursor object which gives you a bunch of variables of the current day.
     */
    current(): Cursor {
        return new Cursor(
            this.year,
            this.day,
            this.getDayOfMonth(),
            this.getDayOfWeek(),
            this.getWeeksPassed(),
            this.getMonthsPassed(),
            this.getMonth(),
        );
    }

    /**
     * Navigate forwards in the timeline, automatically incrementing years if necessary
     *
     * @param days number a postive number on how many days to navigate forwards
     *
     * @return Calendar returns the existing calendar so you can chain
     */
    advance(days: number = 1): Calendar {
        if (days === 0) {
            return this;
        }

        if (days < 0) {
            return this.back(Math.abs(days));
        }

        this.day += days;

        while (this.day > this.daysInAYear) {
            this.year++;
            this.day = this.day - this.daysInAYear;
        }

        return this;
    }

    /**
     * Navigate backwards in the timeline, automatically decrementing years if necessary
     * May throw if you go before the year 1, day 1 unless you explicitly opt out of that.
     *
     * @param days number a positive number on how many days to navigate backwards
     * @param throwIfNegativeYear boolean set to false if you want to be able to go before the year 1.
     *
     * @return Calendar returns the existing calendar so you can chain
     */
    back(days: number = 1, throwIfNegativeYear: boolean = true): Calendar {
        if (days === 0) {
            return this;
        }

        if (days < 0) {
            return this.advance(Math.abs(days));
        }

        this.day -= days;

        while (0 > this.day) {
            this.year--;
            this.day = this.day + this.daysInAYear;
        }

        // TODO: does not account for starting a calendar year by the year 1; which is the default.
        if (throwIfNegativeYear && this.year < 0) {
            throw new Error(`Calendar year is negative after moving backwards for ${days} days`);
        }

        return this;
    }

    /**
     * @return string the name of the calendar
     */
    getName(): string {
        return this.name;
    }

    /**
     * @return number the current day of the present year
     */
    getDayOfYear(): number {
        return this.day;
    }

    /**
     * @return number the current day of the present month
     */
    getDayOfMonth(): number {
        let d = this.day;
        this.daysInEachMonth.every(function (monthDays) {
            if (d - monthDays <= 0) {
                return false;
            }
            d -= monthDays;
            return true;
        });
        return d;
    }

    /**
     * @return number the current day of the present week
     */
    getDayOfWeek(): string {
        const remainder = this.day % this.week.getDaysInWeek();

        return this.week.name(remainder);
    }

    /**
     * @return number how many weeks have passed this year (exclusive, the present week has not passed)
     */
    getWeeksPassed(): number {
        return Math.floor(this.day / this.week.getDaysInWeek());
    }

    /**
     * @return number how many months have passed this year (exclusive, the present month has not passed)
     */
    getMonthsPassed(): number {
        return this.dayToMonthNumberMap[this.day] - 1;
    }

    /**
     * @return Month returns the present month object
     */
    getMonth(): Month {
        return this.months[this.getMonthsPassed()];
    }

    /**
     * @return Arra<Month> returns all months of any given year
     */
    getMonths(): Array<Month> {
        return this.months;
    }

    /**
     * @return number the current year
     */
    getYear(): number {
        return this.year;
    }

    /**
     * @return Array<number> a mapping of how many days are in each year
     */
    getDaysInEachMonth(): Array<number> {
        return this.daysInEachMonth;
    }

    /**
     * @return number how many days are in any given year
     */
    getDaysInYear(): number {
        return this.daysInAYear;
    }

    /**
     * @return Calendar make a copy of the current object state so you can modify it without modifying its parent
     */
    clone(): Calendar {
        return new Calendar(this.name, this.week, this.months, this.year, this.day);
    }

    private generateMap(): void {
        if (this.daysInAYear !== 0) {
            return;
        }

        let sections: Array<number> = [];
        let sum = 0;

        this.months.forEach(function (month) {
            sections.push(month.days)
            sum += month.days;
        });

        let currentMonth = 0;
        let map: { [key: number]: number } = {};
        sections.forEach(function (mo) {
            currentMonth++;

            // gets the slice of all preceding months and sums them (this would give you 31 on january, 59 on february, and so forth)
            // then removes the offset of current month and adds 1 since the first day is Day 1, not Day 0
            const baseline = sections.slice(0, currentMonth).reduce((collective, num) => collective + num) - mo + 1;

            for (let i = 0; i < mo; i++) {
                map[baseline + i] = currentMonth;
            }
        });

        this.dayToMonthNumberMap = map;
        this.daysInEachMonth = sections;
        this.daysInAYear = sum;
    }
}

export default Calendar;