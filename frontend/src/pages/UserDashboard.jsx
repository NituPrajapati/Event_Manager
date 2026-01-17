import { Link } from "react-router-dom";
import EventList from "../components/EventList";
import { useEffect, useState } from "react";
import { getAllEvents } from "../api/eventApi";

const UserDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data || []);
    };
    fetchEvents();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-15">
        <h2 className="text-2xl font-bold mb-6">Available Events</h2>
        {/* Pass the fetched events here */}
        <EventList events={events} /> 
      </div>
    </div>
  );
};

export default UserDashboard;