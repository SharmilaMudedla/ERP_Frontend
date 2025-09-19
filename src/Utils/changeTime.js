const parseTimeToDate = (dateStr, timeStr) => {
  const [time, modifier] = timeStr.split(" "); // ["09:10", "AM"]
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
};
export default parseTimeToDate;
