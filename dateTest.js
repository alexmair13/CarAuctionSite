let startDateTime = new Date();
let endDateTime = new Date();

endDateTime.setDate(startDateTime.getDate() + 7);
endDateTime = endDateTime.toISOString().slice(0, 19).replace('T', ' ');
startDateTime = startDateTime.toISOString().slice(0, 19).replace('T', ' ');

console.log("Start Date:", startDateTime);
console.log("End Date:", endDateTime);
