let mins = .25;
let secs = mins * 60;
let time = "";

    function countdown() {
        setTimeout('Decrement()', 60);
    }

    function Decrement() {
        if (document.getElementById) {
            minutes = document.getElementById("minutes");
            seconds = document.getElementById("seconds");
            if (seconds < 59) {
                seconds.innerHTML = secs;
                if (seconds < 10)
                {
                    //display 09 instead of 9
                }
            }
            else {
                time.concat(getminutes(), ":", getseconds())
                
            }
            if (mins < 0) {
                alert('time up');
                minutes.value = 0;
                seconds.value = 0;
            }
            else {
                secs--;
                setTimeout('Decrement()', 1000);
            }
        }
    }
 
    function getminutes() {
        mins = Math.floor(secs / 60);
        return mins;
    }
 
    function getseconds() {
        return secs - Math.round(mins * 60);
    }