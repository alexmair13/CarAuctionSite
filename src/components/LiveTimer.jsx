import React, { useEffect, useState } from 'react';

const LiveTimer = ({deadline}) => {
    const [timeLeft, setTimeLeft] = useState(null);

// let startDateTime = new Date();
// let endDateTime = new Date();
// endDateTime.setDate(startDateTime.getDate() + 7);

// function formatDateTime(dateTime) {
//     return dateTime.toISOString().slice(0, 19).replace('T', ' ');
// }

// console.log("Start Date:", formatDateTime(startDateTime));
// console.log("End Date:", formatDateTime(endDateTime));


// Live timer function adapated from here: https://www.geeksforgeeks.org/create-countdown-timer-using-javascript/
function countdown() {
    let now  = new Date().getTime();
    let timer = deadline - now;
    if (timer == 0) {
        return "ended";
    }
    let days = Math.floor(timer/(1000*60*60*24));
    let hours = Math.floor((timer%(1000*60*60*24))/(1000*60*60));
    let minutes = Math.floor((timer%(1000*60*60))/(1000*60));
    let seconds = Math.floor((timer%(1000*60))/1000);
    return days + " " + hours + ":" + minutes + ":" + seconds;
}

useEffect(() => {
    setInterval(() => {
        setTimeLeft(countdown());
    }, 1000);
})

return (
      <p>{timeLeft}</p>
  );
};

export default LiveTimer;
