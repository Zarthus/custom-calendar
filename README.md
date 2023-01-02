# Custom Calendar

A library for custom calendar written with typescipt, functionality with zero dependencies, 
define your own calendars, and interact with them.

Add your own custom calendar to your software using this library.

## Features

- Easily create a custom calendar with terms we're already familiar with: days, weeks, months, years
- Easily navigate back or forward through a year and calculates year increments/decrements
- A builder with strict error checking to ensure the calendar you're building is correct
- Support for custom holidays/festivities
- Good customizability, so you can use it in your own custom calendars, such as
    ones you would need for RPGs or World Building.
- Well tested - the provided API has a good enough coverage %.

### No support for

- Leap years (though you can manually account for it if you only 
    need a single-year calendar rather than multi-year, by creating
    a calendar with the leap-month's days incremented by 1.)
- Workdays / Days off - the calendar does not tell you if a festivity is 
      a day off or just an observation, nor can you specify 
      non-working days in a Week object.
- There is no definition of seasons

### Caveats

- Calendars start at the year zero unless otherwise specified in the builder.
 
## Install the library

```
npm install @zarthus/custom-calendar
```

## How to use

```typescript
import { CalendarBuilder, BuilderMonth } from "@zarthus/custom-calendar"; 

const myCalendar = CalendarBuilder.builder("Gregorian", ["Monday", "Tuesday", "..."])
    .addBuilderMonth(
        new BuilderMonth("January", 31)
            .addFestivity("New Years", 1)
    )
    .addBuilderMonth(
        new BuilderMonth("February", 28)
            .addFestivity("Valentines Day", 14)
    )
    .startingYear(2023)
    // and so on..
    .build();

const vDay = myCalendar.clone().advance(31 + 14);

// Today is the 14th of February, 2023
console.log(`Today is the ${vDay.getDayOfMonth()}th of ${vDay.getMonth().name}, ${vDay.getYear()}`);
// Let's celebrate Valentines Day
console.log(`Let's celebrate ${vDay.current().getFestivity()?.name ?? ".. nothing!"}`);
```

## Versioning

This repository uses semantic versioning.

## License

Licensed under [MIT](LICENSE)