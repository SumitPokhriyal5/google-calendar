
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 0; hour <= 23; hour++) {
    let period = hour < 12 ? "AM" : "PM";
    let displayHour = hour <= 12 ? (hour === 0 ? 12 : hour) : hour - 12;
    let time = displayHour.toString() + " " + period;
    timeSlots.push(time);
  }
  return timeSlots;
};

const initialEventsData = [
  {
    id: 1,
    title: "Meeting with Client",
    startTime: new Date(2024, 1, 15, 9, 0), 
    endTime: new Date(2024, 1, 15, 10, 0), 
    type: "normal",
    privacy: true, 
    color: "#2196F3", 
  },
  {
    id: 2,
    title: "Gym Session",
    startTime: new Date(2024, 1, 15, 17, 0),
    endTime: new Date(2024, 1, 15, 18, 0),
    type: "stretching",
    privacy: false,
    color: "#4CAF50",
  },
  {
    id: 3,
    title: "Birthday Party",
    startTime: new Date(2024, 1, 15, 0, 0), 
    endTime: new Date(2024, 1, 15, 1, 0), 
    type: "all-day",
    privacy: true,
    color: "#FFC107",
  },
  {
    id: 4,
    title: "Morning Walk",
    startTime: new Date(2024, 1, 15, 6, 0), 
    endTime: new Date(2024, 1, 15, 7, 0), 
    type: "normal",
    privacy: true,
    color: "#2196F3",
  },
  {
    id: 5,
    title: "Breakfast",
    startTime: new Date(2024, 1, 15, 7, 0),
    endTime: new Date(2024, 1, 15, 8, 0),
    type: "stretching",
    privacy: false,
    color: "#4CAF50",
  },
  // Add more events as needed
];

const Dashboard = ({ selectedDate }) => {
  // console.log(selectedDate.toDateString())
  const [eventsData, setEventsData] = useState(initialEventsData);
  const timeSlots = generateTimeSlots();
  const [linePositionPercentage, setLinePositionPercentage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date(); 
      const elapsedMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();
      const newPositionPercentage = (elapsedMinutes / 60) * 100;
      setLinePositionPercentage(newPositionPercentage);
    }, 1000); 

    return () => clearInterval(interval);
  }, []); 

  // Function to check if a time falls within the range of two other times
  const isTimeBetween = (time, startTime, endTime) => {
    return time >= startTime && time < endTime;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const draggedEvent = eventsData.find((event) => event.id === parseInt(id));
    const newStartTime = new Date(draggedEvent.startTime);
    const newEndTime = new Date(draggedEvent.endTime);
    const timeDifference = index - draggedEvent.startTime.getHours();
    newStartTime.setHours(newStartTime.getHours() + timeDifference);
    newEndTime.setHours(newEndTime.getHours() + timeDifference);
    const updatedEventsData = eventsData.map((event) =>
      event.id === parseInt(id)
        ? { ...event, startTime: newStartTime, endTime: newEndTime }
        : event
    );
    setEventsData(updatedEventsData)
    // Update eventsData with the new start and end times
    console.log("Event dropped with ID:", id, "to index:", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="calendar">
      <div className="time-slots">
        {timeSlots.map((time, index) => {
          // Filter events that fall within the current time slot
          const eventsInSlot = eventsData.filter((event) =>
            isTimeBetween(
              index,
              event.startTime.getHours(),
              event.endTime.getHours()
            )
          );

          return (
            <div key={index} className="time-slot" onDrop={(e) => handleDrop(e, index)} onDragOver={(e) => handleDragOver(e)}>
              <p>{time}</p>
              <div className="eventsContainer">
                <hr />
                {index === 0 && (
                  <hr
                    className="current-time-line"
                    style={{
                      top: `${linePositionPercentage + index * 100}%`,
                    }}
                  />
                )}
                {eventsInSlot.map(
                  (event) =>
                    event.startTime.toDateString() ===
                      selectedDate.toDateString() && (
                      <div
                        key={event.id}
                        className="event"
                        style={{
                          color: event.color,
                          border: `1px solid ${event.color}`,
                        }}
                        onClick={() => handleEventClick(event)}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, event.id)}
                      >
                        <p>{event.privacy ? event.title : "Busy"}</p>
                        {" - "}
                        <p>
                          {event.startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          );
        })}
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>{selectedEvent.title}</h2>
            <p><span>Start Time:</span> {selectedEvent.startTime.toLocaleString()}</p>
            <p><span>End Time:</span> {selectedEvent.endTime.toLocaleString()}</p>
            <p><span>Type:</span> {selectedEvent.type}</p>
            <p><span>Privacy:</span> {selectedEvent.privacy ? "Public" : "Private"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


