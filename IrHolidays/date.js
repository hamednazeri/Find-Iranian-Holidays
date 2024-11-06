const AnotherEvents = require('./AnotherDays');
const PersianEvents = require('./PersianDays');
const SolarEvents = require('./SolarDays');

function TotalDays(MonthInput, DayInput) {
    let daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30];
    let totalDays = 0;
    for (let i = 0; i < MonthInput - 1; i++) {
        totalDays += daysInMonth[i];
    }
    totalDays += DayInput;
    return totalDays;
}

function FirstDayOfYear(YearInput) {
    let DifferentYears = YearInput - 1360;
    let firstDayOfYear = 0;
    let kabise = 0;
    for (let i = 0; i <= DifferentYears; i++) {
        if ((i % 4) == 0) kabise++;
    }
    firstDayOfYear = (DifferentYears + kabise - 1) % 7;
    return firstDayOfYear;
}

function IsHoliday(YearInput, MonthInput, DayInput) {
    let totalDays = TotalDays(MonthInput, DayInput);
    let firstFriday = (7 - FirstDayOfYear(YearInput) + 5) % 7 + 2;
    if ((totalDays - firstFriday) % 7 === 0) return true;
    //search in AnotherDays
    for (let i = 0; i < AnotherEvents.length; i++) {
        if (YearInput === AnotherEvents[i].Year) {
            if (totalDays === AnotherEvents[i].Day) {
                if (AnotherEvents[i].OffDay === true)
                    return true;
            }
        }
    }
    //search in PersianDays
    for (let i = 0; i < PersianEvents.length; i++) {
        if (totalDays === PersianEvents[i].Day) {
            if (PersianEvents[i].OffDay === true)
                return true;
        }
    }
    //search in SolarDays
    for (let i = 0; i < SolarEvents.length; i++) {
        if (totalDays === SolarEvents[i].Day) {
            if (SolarEvents[i].OffDay === true)
                return true;
        }
    }
    return false;
}

module.exports = { IsHoliday };
