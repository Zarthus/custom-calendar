class Week {
    constructor(public readonly names: Array<string>) {
    }

    // zero-indexed lookup of a name, but throwing errors on impossible lookups.
    // if you want more granular control, access `.names[index]` directly.
    name(index: number): string {
        if (0 > index) {
            throw new Error(`Week with index of ${index} is too snall`);
        }
        if (index > this.names.length - 1) {
            throw new Error(`Week with index of ${index} is too large`);
        }

        return this.names[index];
    }

    getDaysInWeek(): number {
        return this.names.length;
    }
}

export default Week;