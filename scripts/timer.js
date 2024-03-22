document.getElementById("btn_startTimer").onclick = function() {startTimer(document.querySelectorAll('.semicircle') , document.getElementById("timer"))};

function startTimer(semicircles,timer){
    let sec = prompt("Please enter time:");
    if (sec == null || sec == "") {
        alert("No time entered");
    } else{
        if (!isNaN(sec))
        {
            const hr = 0;
            const min = 0;

            const hours = hr * 3600000;
            const minutes = min *60000;
            const seconds = sec * 1000;

            const setTime = hours + minutes + seconds;
            const startTime = Date.now();
            const futureTime = startTime+setTime;

            const timerLoop = setInterval(function (){
                const currentTime = Date.now();
                const remainingTime = futureTime - currentTime;
                const angle = (remainingTime/setTime) *360;

                if (angle > 180){
                    semicircles[2].style.display = 'none';
                    semicircles[0].style.transform = 'rotate(180deg)';
                    semicircles[1].style.transform = 'rotate(' + angle + 'deg)';
                }
                else{
                    semicircles[2].style.display = 'block';
                    semicircles[0].style.transform = 'rotate(' + angle + 'deg)';
                    semicircles[1].style.transform = 'rotate(' + angle + 'deg)';
                }
                timer.innerHTML=
                    Math.floor(remainingTime/3600000).toLocaleString('en-Us', {minimumIntegerDigits:2,useGrouping:false}) + 
                    ":" + (Math.floor(remainingTime/60000)%60).toLocaleString('en-Us', {minimumIntegerDigits:2,useGrouping:false}) + 
                    ":" + (Math.floor(remainingTime/1000)%60).toLocaleString('en-Us', {minimumIntegerDigits:2,useGrouping:false});
                if (remainingTime < 0){
                    clearInterval(timerLoop)
                    semicircles[0].style.display = 'none';
                    semicircles[1].style.display = 'none';
                    semicircles[2].style.display = 'none';
                    document.getElementById("timer").innerHTML= "00:00:00";
                }
            }, 100);
        }else{
            alert("Non number entered");
        }
    }
}