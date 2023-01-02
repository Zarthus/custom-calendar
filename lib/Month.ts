import Festivity from "./Festivity";

class Month {
    constructor(public readonly name: string, public readonly days: number, public readonly festivities: { [key: number]: Festivity } = {}) {
        this.name = name;
        this.days = days;
        this.festivities = festivities;
    }

    hasFestivity(day: number): boolean {
        return this.festivities[day] !== undefined;
    }

    getFestivity(day: number): Festivity | undefined {
        return this.festivities[day];
    }
}

export default Month;