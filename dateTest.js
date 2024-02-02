let startDateTime = new Date();
let endDateTime = new Date();
endDateTime.setDate(startDateTime.getDate() + 7);

function formatDateTime(dateTime) {
    return dateTime.toISOString().slice(0, 19).replace('T', ' ');
}

console.log("Start Date:", formatDateTime(startDateTime));
console.log("End Date:", formatDateTime(endDateTime));


// Live timer function adapated from here: https://www.geeksforgeeks.org/create-countdown-timer-using-javascript/
function liveTimer() {
    let now  = new Date().getTime();
    let timer = endDateTime - now;
    let days = Math.floor(timer/(1000*60*60*24));
    let hours = Math.floor((timer%(1000*60*60*24))/(1000*60*60));
    let minutes = Math.floor((timer%(1000*60*60))/(1000*60));
    let seconds = Math.floor((timer%(1000*60))/1000);
    return days + " / " + hours + " / " + minutes + " / " + seconds;
}

  setInterval(() => {
    console.log("The time is:", liveTimer());
}, 1000);