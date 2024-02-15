import { useState } from "react";
import Dashboard from "../components/Dashboard"
import TopSection from "../components/TopSection"

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define an array of abbreviated day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year
  const dayIndex = selectedDate.getDay();
  const [dayName, setDayName] = useState(dayNames[dayIndex]);
  const [day, setDay] = useState(selectedDate.getDate());
  const monthIndex = selectedDate.getMonth();
  const [monthName, setMonthName] = useState(monthNames[monthIndex]);

  // Format the date string
  const formattedDate = `${dayName}, ${day} ${monthName}`;
  const handleDateChange = (dates, dateString) => {
    let dateArr = []
    if(dateString)dateArr = dateString.split('-').map(Number)
    if (dateArr.length === 3) {
      const newDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
      setSelectedDate(newDate)
      setDayName(dayNames[newDate.getDay()])
      setDay(newDate.getDate())
      setMonthName(monthNames[newDate.getMonth()])
    }
  };
  return (
    <div>
      <TopSection formattedDate={formattedDate} handleDateChange={handleDateChange}/>
      <Dashboard selectedDate={selectedDate} />
    </div>
  )
}

export default Calendar