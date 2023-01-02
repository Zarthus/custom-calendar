import Festivity from "../Festivity";
import Month from "../Month";
import BuilderError from "./BuilderError";

class BuilderMonth {
    private readonly festivities: { [key: number]: Festivity } = {};

    constructor(private readonly name: string, private readonly days: number) {
        if (days < 1) {
            throw new BuilderError("A month must have at least one day");
        }

        this.name = name;
        this.days = days;
    }

    addFestivity(name: string, day: number, description: string | null = null): BuilderMonth {
        return this.addFestivityObject(new Festivity(name, day, description));
    }

    addFestivityObject(festivity: Festivity): BuilderMonth {
        const day = festivity.day;

        if (day > this.days) {
            throw new BuilderError(`festivity happens on a day that is not present within ${this.name}`);
        }
        if (this.festivities[day] !== undefined) {
            throw new BuilderError(`a festivity already happens on the ${day} day (${this.festivities[day].name} - ${this.name})`);
        }

        this.festivities[day] = festivity;
        return this;
    }

    freeze(): Month {
        return new Month(this.name, this.days, this.festivities);
    }
}

export default BuilderMonth;