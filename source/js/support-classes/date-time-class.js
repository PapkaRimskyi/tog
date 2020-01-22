export default class DateTime {
  constructor() {
    this.DOUBLE_DIGIT = 10;
    this.MONTHS_COUNT = 12;
    this.MONTH_NUMBERS = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
      6: 7,
      7: 8,
      8: 9,
      9: 10,
      10: 11,
      11: 12,
    }
  }

  setTime(time) {
    let [hours, min, sec] = time;
    hours = hours < this.DOUBLE_DIGIT ? `0${hours}` : hours;
    min = min < this.DOUBLE_DIGIT ? `0${min}` : min;
    sec = sec < this.DOUBLE_DIGIT ? `0${sec}` : sec;
    return `${hours}:${min}:${sec}`;
  }

  setDate(date) {
    let [day, month, years] = date;
    day = day < this.DOUBLE_DIGIT ? `0${day}` : day;
    for (let i = 0; i < Object.keys(this.MONTH_NUMBERS).length; i++) {
      if (Number(Object.keys(this.MONTH_NUMBERS)[i]) === month) {
        month = Object.values(this.MONTH_NUMBERS)[i];
        if (month < this.DOUBLE_DIGIT) {
          month = `0${month}`;
        }
        break;
      }
    }
    return `${day}.${month}.${years}`;
  }
}
