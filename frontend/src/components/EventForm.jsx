import { useState } from "react";
import { createEvent } from "../api/eventApi";

const EventForm = ({ refreshEvents }) => {
  const [form, setForm] = useState({
    event: "",
    description: "",
    date: "",
    location: "",
    organizer: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(form);
    refreshEvents();
    setForm({
      event: "",
      description: "",
      date: "",
      location: "",
      organizer: ""
    });
  };

  // Helper to update state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-15 mt-10"> {/* Applied the requested 15 margin here */}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white p-8 shadow-sm border border-gray-200 rounded-xl"
      >
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Create New Event</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Fill in the details below to host your event.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          {/* Event Title */}
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">Event Name</label>
            <input
              name="event"
              value={form.event}
              placeholder="Summer Gala"
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Organizer */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Organizer</label>
            <input
              name="organizer"
              value={form.organizer}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Date */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Location */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4 pt-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;