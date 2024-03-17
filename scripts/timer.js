document.getElementById("btn_startTimer").onclick = function() {startTimer(document.getElementById("timer"))};

function startTimer(timer){
    let sec = prompt("Please enter time:");
    if (sec == null || sec == "") {
        alert("No time entered");
    } else{
        if (!isNaN(sec))
        {
            var time = setInterval(function() {
                timer.innerHTML='00:'+sec;
                sec--;
                if (sec < 0) {
                    clearInterval(time);
                }
            }, 1000);
        }else{
            alert("Non number entered");
        }
    }
}