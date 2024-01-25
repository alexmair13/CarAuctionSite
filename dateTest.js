let startDateTime = new Date();
const endDateTime = new Date(startDateTime.setDate(startDateTime.getDate() + 7)).toISOString().slice(0, 19).replace('T', ' ');;
startDateTime = startDateTime.toISOString().slice(0, 19).replace('T', ' ');;

console.log("Start Date:", startDateTime);
console.log("End Date:", endDateTime);
