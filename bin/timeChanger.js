"use strict";
const timeChanger = (time, splitSecond) => {
    const [hours, minutes, secondsAndMS] = time.split(":");
    const [seconds, milliseconds] = secondsAndMS.split(",");
    //get total millisecond
    const totalMS = parseInt(hours) * 60 * 60 * 1000 +
        parseInt(minutes) * 60 * 1000 +
        parseInt(seconds) * 1000 +
        parseInt(milliseconds) +
        +splitSecond * 1000;
    //generate new times
    const newHours = Math.floor(totalMS / (60 * 60 * 1000))
        .toString()
        .padStart(2, "0");
    const newMinutes = Math.floor((totalMS / (60 * 1000)) % 60)
        .toString()
        .padStart(2, "0");
    const newSeconds = Math.floor((totalMS / 1000) % 60)
        .toString()
        .padStart(2, "0");
    const newMilliseconds = (totalMS % 1000).toString().padStart(3, "0");
    return `${newHours}:${newMinutes}:${newSeconds},${newMilliseconds}`;
};
