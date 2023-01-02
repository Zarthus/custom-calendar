import Calendar from "../Calendar";
import Month from "../Month";
import Week from "../Week";
import BuilderMonth from "./BuilderMonth";
import BuilderError from "./BuilderError";

class CalendarBuilder {
    private starting_year: number = 1;
    private starting_day: number = 1;

    static builder(name: string, weekdays: Array<string>) {
        return new CalendarBuilder(name, new Week(weekdays));
    }

    constructor(private name: string, private week: Week, private months: Array<Month> = []) {
        if (this.week.getDaysInWeek() === 0) {
            throw new BuilderError("You must have at least one day in a week");
        }
    }

    addBuilderMonth(month: BuilderMonth): CalendarBuilder {
        this.months.push(month.freeze());
        return this;
    }

    addMonth(month: Month): CalendarBuilder {
        this.months.push(month);
        return this;
    }

    startingYear(year: number): CalendarBuilder {
        this.starting_year = year;
        return this;
    }

    startingDay(days_to_advance: number): CalendarBuilder {
        this.starting_day = days_to_advance;
        return this;
    }

    build(): Calendar {
        if (this.months.length === 0) {
            throw new BuilderError("You should add at least one month to your calendar");
        }

        return new Calendar(this.name, this.week, this.months, this.starting_year, this.starting_day);
    }
}

export default CalendarBuilder;