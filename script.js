let christmas;
let interval;

function timer() {
    let current = new Date().getTime();
    let difference = christmas - current;
    
    let days, hrs, mins, secs;
    
    days = Math.floor(difference / (1000*60*60*24));
    hrs = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
    mins = Math.floor((difference % (1000*60*60)) / (1000*60));
    secs = Math.floor((difference % (1000*60)) / 1000);
    
    if (days < 100) {
        days = "0" + days;
        if (days < 10) {
            days = "0" + days;
        }
    }
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }
    
    if (difference < 0) {
        clearInterval(interval);
        return "It's Christmas Today.";
    } else {
        return "<span id=\"days\">" + days + "d </span><span id=\"hours\">" + hrs + "h </span><span id=\"mins\">" + mins + "m </span><span id=\"secs\">" + secs + "s</span>";
    }
}

function start() {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    if (month === 11 && day >= 26){
        year++;
    }
    christmas = new Date("Dec 25, " + year + " 00:00:00").getTime();
    interval = setInterval(() => {countdown.innerHTML = timer()}, 1000);
}

window.addEventListener('load', start);
