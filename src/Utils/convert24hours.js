const convertTo12HourFormat = (time24) => {
  if (!time24) return "";
  let [hour, minute] = time24.split(":");
  hour = parseInt(hour, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 -> 12 for 12 AM
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
};
export default convertTo12HourFormat;
