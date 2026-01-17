import { deleteEvent } from "../api/eventApi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const EventList = ({ events, refreshEvents, onEdit }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      refreshEvents();
    }
  };

  // This function now sends the WHOLE event object to the parent
  const handleUpdateClick = (event) => {
    if (onEdit) {
      onEdit(event); 
    }
  };

  return (
    <div className="mx-15 my-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {events?.map((event) => (
          <div
            key={event._id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  {event.organizer || "General Event"}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 truncate">{event.event}</h4>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">{event.description}</p>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {event.location || "Online"}
              </div>
            </div>

            {isAdmin && (
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end gap-x-4">
                <button
                  onClick={() => handleUpdateClick(event)} // Pass whole event
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-green-600 hover:text-green-500"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-red-600 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;