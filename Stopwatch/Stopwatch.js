let isStop = true;
let s = 0;
let min = 0;
let hr = 0;

// start grna lai isStop false true xa vaney false grnu prxa 
// ani timer function call grnu prxa ani start hunxa
function start() {
    if (isStop === true) {
        isStop = false;
        timer();
    }
}

//timer start grna lai
function timer() {
    if (!isStop) {
        s++;
        //second 60 pugesi feri start hunxa 0 bata
        if (s === 60) {
            s = 0;
            min++;
        }
        //Minute 60 pugesi feri start hunxa 0 bata

        if (min === 60) {
            min = 0;
            hr++;
        }

        // check grna lai ani initialize grna lai
        // 10 second vnda kam xa vnepxi second, hour and minute ko agadi 0 add hunxa 
        let formattedSeconds = s < 10 ? "0" + s : s;
        let formattedMinutes = min < 10 ? "0" + min : min;
        let formattedHours = hr < 10 ? "0" + hr : hr;

        document.getElementById("stopwatch").innerHTML =
            `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

        setTimeout(timer, 1000);
    }
}
//stop grna ko laagi isStop lai false grnu prxa
// matlab jati bela stop thiye teti bela is stop= false thiyo
// stop vaisakepxi yes it is stopped vanera true gareko
function stop() {
    isStop = true;
}

//reset garisakepxi sabbai  0 set hunxa tei vayera sab 0 set xa  
function reset() {
    isStop = true;
    s = 0;
    min = 0;
    hr = 0;
    // reset vayepxi initial state ma sab 00:00:00 hunxa
    document.getElementById("stopwatch").innerHTML = "00 : 00 : 00";
}
