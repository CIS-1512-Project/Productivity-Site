let seconds = 60;
let count = seconds;

let btn_startTimer = document.getElementById("btn_startTimer");
btn_startTimer.addEventListener(click, changeColor('red'));



text = document.getElementById("timer");


function startTimer() { setInterval(countdown, 1000); }

function countdown()
{
    count--
    time_text.innerHTML = count;
    console.log(count)
    if(count == 0)
    {
        alert("TIMES UP LOL");
    }
}

function changeColor(newColor)
{
    the_text = document.getElementById("the_text");
    the_text.innerHTML = "YAY I AM SO ELATED RN"
    the_text.style.color = newColor;
}