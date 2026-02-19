const studyBtn = document.getElementById("studyBtn");
const breakBtn = document.getElementById("breakBtn");

const timeDisplay = document.getElementById("timeDisplay");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// durations!
const DURATIONS = {
    study: 25 * 60 * 1000,
    break: 5 * 60 * 1000,
};

//states
let mode = "study";
let menaingMs = DURATIONS[mode];

let isRunning = false;
let endTime = 0;
let intervalId = null;
//*

//stop button behavior tracking?
let stopPaused = false;

//displayTime
function renderTime(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeDisplay.textContent = String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2, "0");
    //*
}

//mode switching
function setMode(newMode){
    mode = newMode;

    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;

    remainingMs = DURATIONS[mode];
    renderTime(remainingMs);

    //*

    stopPaused = false;
}

function start() {
    if(isRunning) return;

    isRunning = true;
    stopPaused = false;

    endTime = Date.now() + remainingMs;

    intervalId = setInterval(() => {
        remainingMs = Math.max(0, endTime - Date.now());
        renderTime(remainingMs);

        if(remainingMs == 0){
            clearInterval(intervalId);
            intervalId = null;
            isRunning = false;
            stopPaused = true;
        }
    }, 200);

}

function stopTimer() {
    //if running pause
    if(isRunning){
        clearInterval(intervalId);
        intervalId = null;

        remainingMs = Math.max(0, endTime - Date.now());
        renderTime(remainingMs);
        isRunning = false;
        stopPaused = true;
        return;
    }

    if(stopPaused){
        remainingMs = Duration[mode];
        renderTime(remainingMs);
        stopPaused = false;
    }
}

studyBtn.addEventListener("click", () => setMode("study"));
breakBtn.addEventListener("click", () => setMode("break"));

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stopTimer);

renderTime(remainingMs);
