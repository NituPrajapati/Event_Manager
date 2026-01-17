import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { getAllEvents } from "../api/eventApi";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // 'view' can be "create" or "list"
  const [activeTab, setActiveTab] = useState("create"); 

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getAllEvents();
    setEvents(data || []);
    setLoading(false);
  };
  
  useEffect(() => {
    if (activeTab === "list") {
      fetchEvents();
    }
  }, [activeTab]);

  if (loading) {
    return <div className="text-gray-800 text-4xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-15">
        
        {/* Header with Tab Switcher */}
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h2>
          <div className="mt-3 sm:ml-4 sm:mt-0">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab("create")}
                className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                  activeTab === "create" ? "bg-indigo-600 text-white" : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                Create Event
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                  activeTab === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                View List ({events.length})
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Page Rendering */}
        <div className="mt-6">
          {activeTab === "create" ? (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Enter Event Details</h3>
              <EventForm refreshEvents={fetchEvents} />
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <EventList 
                events={events} 
                isAdmin={true} 
                refreshEvents={fetchEvents} 
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;