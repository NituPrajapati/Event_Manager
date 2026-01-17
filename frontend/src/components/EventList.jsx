import { deleteEvent, updateEvent} from "../api/eventApi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";


const EventList = ({ events, refreshEvents }) => {
    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === "admin";

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      refreshEvents(); // Ensure this is passed down to update the UI
    }
  };

  const handleUpdate = async (id) => {
    if (window.confirm("Are you sure you want to update this event?")) {
      await updateEvent(id);
      refreshEvents(); // Ensure this is passed down to update the UI
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
            {/* Card Body */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  {event.organizer || "General Event"}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 truncate">
                {event.event}
              </h4>
              
              <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {event.location || "Online"}
              </div>
            </div>

            {/* Admin Actions Footer */}
           {isAdmin && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end gap-x-4">
                  {/* Update Button */}
                  <button
                    onClick={() => handleUpdate(event._id)}
                    className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors"
                  >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                        Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-red-600 hover:text-red-500 transition-colors"
                   >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                      </svg>
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