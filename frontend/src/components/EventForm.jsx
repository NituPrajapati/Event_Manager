import { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../api/eventApi";

const EventForm = ({ refreshEvents, editingEvent, setEditingEvent }) => {
  const initialFormState = {
    event: "",
    description: "",
    date: "",
    location: "",
    organizer: ""
  };

  const [form, setForm] = useState(initialFormState);

  // Sync form with editingEvent whenever it changes
  useEffect(() => {
    if (editingEvent) {
      const formattedDate = editingEvent.date ? editingEvent.date.split('T')[0] : "";
      setForm({ ...editingEvent, date: formattedDate });
    } else {
      setForm(initialFormState);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, form);
        setEditingEvent(null); // Reset to create mode
      } else {
        await createEvent(form);
      }
      refreshEvents();
      setForm(initialFormState);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-15 mt-10">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-sm border border-gray-200 rounded-xl">
        <div className="border-b border-gray-900/10 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingEvent ? "⚡ Edit Mode" : "Create New Event"}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {editingEvent ? "Updating existing event details." : "Fill in the details to host a new event."}
            </p>
          </div>
          {editingEvent && (
            <button 
              type="button" 
              onClick={() => setEditingEvent(null)}
              className="text-sm font-bold text-red-600 hover:underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-6 gap-x-6">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-900">Event Name</label>
            <input name="event" value={form.event} onChange={handleChange} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900">Organizer</label>
            <input name="organizer" value={form.organizer} onChange={handleChange} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={handleChange} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-900">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-900">Location</label>
            <input name="location" value={form.location} onChange={handleChange} required className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className={`rounded-md px-10 py-2 text-sm font-semibold text-white shadow-sm ${
              editingEvent ? "bg-green-600 hover:bg-green-500" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {editingEvent ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;