var totalTime = "";
var cnt = 0;
var x;
var hours, minutes, seconds, totalMinute = 0, totalSec = 0, totalHour = 0;
var stopBtn = document.querySelector('#stop');

stopBtn.disabled = true;

if (Notification.permission === "granted") {
    ;
} else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
        
    });
}

function pushNotif() {
    const notif = new Notification("Time Completed", {
        body: "Lets start again !"
    });
}



function play() { 
    var audio = new Audio( 
    'beep.mp3'); 
    audio.play(); 
}

function countdownTimeStart(){

var countDownDate = new Date().getTime()+ 100*(30000);

x = setInterval(function() {
    

    document.querySelector('#startstop').disabled = true;
    stopBtn.disabled = false;

    // Get todays date and time
    var now = new Date().getTime();
    
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("demo").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s ";
    
    if (distance < 0) {
        // play();
        clearInterval(x);
        document.querySelector('#startstop').disabled = false;
        stopBtn.disabled = true;
        document.querySelector('#startstop').style.display = "block";
        
        if(Notification.permission==="granted") {
            pushNotif();
        }
        else if(Notification.permission==="denied") {
            alert('Expired');
        }
        cnt+=1;
        document.querySelector('p').innerText = "0h 0m 0s"
        totalMinute +=50;
        if(totalMinute>59) {
            totalHour = (Math.floor(totalMinute/60));
            totalTime = `${totalHour}h ${totalMinute - 60*totalHour}m ${totalSec}s`
        }
        else {
            totalTime = `${totalHour}h ${totalMinute}m ${totalSec}s`
        }
        document.querySelector('#total').innerText = totalTime;
    }
}, 1000);
}

function stopTimer() {
    clearInterval(x);
    document.querySelector('#startstop').disabled = false;
    stopBtn.disabled = true;
    let mstop = 50-minutes-1;
    totalMinute +=mstop;
    let sstop = 60-seconds;
    totalSec+= sstop;
    if(totalSec>59) {
        totalMinute+=1;
        totalSec = totalSec-60;
    }
    
    if(totalMinute>59) {
        totalHour = (Math.floor(totalMinute/60));
        totalTime = `${totalHour}h ${totalMinute - 60*totalHour}m ${totalSec}s`
    }
    else {
        totalTime = `${totalHour}h ${totalMinute}m ${totalSec}s`
    }

    document.querySelector('#total').innerText = totalTime;
}