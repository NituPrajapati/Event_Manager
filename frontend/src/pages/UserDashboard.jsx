import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { getAllEvents } from "../api/eventApi";


const UserDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <EventList events={events} />
    </div>
  );
};

export default UserDashboard;
