import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router";

const initialEvents = [
  {
    id: 1,
    title: "Chess Tournament",
    description: "Annual club chess event",
    date: "2025-12-20",
    location: "Community Hall",
    isPaid: true,
    eventFee: 50,
    maxAttendees: 100,
  },
  {
    id: 2,
    title: "Music Night",
    description: "Club musical evening",
    date: "2025-12-25",
    location: "Club Lounge",
    isPaid: false,
    eventFee: 0,
    maxAttendees: 50,
  },
];

const EventsManagement = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    isPaid: false,
    eventFee: 0,
    maxAttendees: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === editEvent.id ? { ...formData, id: editEvent.id } : ev
        )
      );
    } else {
      setEvents([...events, { ...formData, id: Date.now() }]);
    }
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      isPaid: false,
      eventFee: 0,
      maxAttendees: 0,
    });
    setEditEvent(null);
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData(event);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <Link to="/dashboard/manager/create_event">Create Event</Link>
      </div>

   
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Paid</th>
              <th className="p-2 border">Fee</th>
              <th className="p-2 border">Max Attendees</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-gray-100">
                <td className="p-2 border">{ev.title}</td>
                <td className="p-2 border">{ev.date}</td>
                <td className="p-2 border">{ev.location}</td>
                <td className="p-2 border">{ev.isPaid ? "Yes" : "No"}</td>
                <td className="p-2 border">{ev.eventFee}</td>
                <td className="p-2 border">{ev.maxAttendees}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(ev)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsManagement;
