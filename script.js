const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth;

let christmas;
let interval;

class Snow {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
    }

    update() {
        this.y += this.dy
        this.x += Math.random() < 0.5 ? -1 : 1;
        if (this.y > canvas.height + this.radius) {
            this.y = Math.floor((Math.random() * canvas.height) + -canvas.height);
        }
    }
}

function timer() {
    let current = new Date().getTime();
    let difference = christmas - current;
    let days, hrs, mins, secs;

    days = Math.floor(difference / (1000 * 60 * 60 * 24));
    hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    secs = Math.floor((difference % (1000 * 60)) / 1000);

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
    if (month === 11 && day >= 26) {
        year++;
    }
    document.getElementById("year").innerHTML = year;
    christmas = new Date("Dec 25, " + year + " 00:00:00").getTime();
    interval = setInterval(() => { countdown.innerHTML = timer() }, 1000);
    animate();
}

let snowArray = [];

for (let i = 0; i < 50; i++) {
    snowArray.push(new Snow(Math.random() * innerWidth, Math.floor((Math.random() * canvas.height) + -canvas.height), 0, 2, 10));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (let snowflake of snowArray) {
        snowflake.update();
        snowflake.draw();
    }
}

window.addEventListener('load', start);
