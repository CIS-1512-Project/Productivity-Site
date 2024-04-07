let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let timeBtn = document.getElementById("btn-time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
let focusMin = 24;
let shortMin = 4;
let longMin = 14;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
    "click",
    (resetTime = () => {
        pauseTimer();
        switch (active) {
            case "long":
                minCount = longMin;
                break;
            case "short":
                minCount = shortMin;
                break;
            case "focus":
                minCount = focusMin;
                break;
            default:
                minCount = 24;
                break;
        }
        timeBtn.classList.remove("hide");
        count = 59;
        time.textContent = `${minCount + 1}:00`;
    })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
    active = "focus"; 
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
    "click",
    (pauseTimer = () => {
        paused = true;
        clearInterval(set);
        startBtn.classList.remove("hide");
        pause.classList.remove("show");
        reset.classList.remove("show");
    })
);

function playSound () {
	let ding = new Audio('sounds/ding.mp3');
	ding.play();
}

startBtn.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
    timeBtn.classList.add("hide");
    timeBtn.classList.remove("show");
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if (count == 0) {
                if (minCount != 0) {
                    minCount--;
                    count = 60;
                } else {
                    playSound();
                    resetTime();
                    clearInterval(set);
                }
            }
        }, 1000);
    }
});

timeBtn.addEventListener("click", () => {
    min = prompt("Enter amount of minutes between 1-60");
    if (1 <= min && min <= 60 && !isNaN(min)){
        min = Math.floor(min)-1;
        switch (active) {
            case "long":
                longMin = min;
                minCount = longMin;
                break;
            case "short":
                shortMin = min;
                minCount = shortMin;
                break;
            case "focus":
                focusMin = min;
                minCount = focusMin;
                break;
            default:
                break;
        }
        time.textContent = `${minCount + 1}:00`;
    }else{
        alert("Invalid value entered");
    }
});