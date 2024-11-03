let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").onclick = function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
};

document.getElementById("pause").onclick = function() {
    clearInterval(tInterval);
    running = false;
};

document.getElementById("reset").onclick = function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00:000";
    laps.innerHTML = "";
    lapCount = 0;
};

document.getElementById("lap").onclick = function() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        laps.innerHTML += `<div>Lap ${lapCount}: ${lapTime}</div>`;
    }
};

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = ms % 1000;

    return (hours < 10 ? "0" + hours : hours) + ":" + 
           (minutes < 10 ? "0" + minutes : minutes) + ":" + 
           (seconds < 10 ? "0" + seconds : seconds) + ":" + 
           (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}
