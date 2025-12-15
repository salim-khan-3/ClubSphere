import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MdAdd } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const EventsManagement = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      isPaid: false,
      eventFee: 0,
      maxAttendees: 0,
    },
  });

  const isPaid = watch("isPaid");

  // =====================
  // Fetch events (TanStack Query v5 style)
  // =====================
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/events`);
      return res.data;
    },
  });

  // =====================
  // Create Event Mutation
  // =====================
  const createEventMutation = useMutation({
    mutationFn: (newEvent) => axios.post(`${API_URL}/events`, newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] }); // refetch events
      reset();
      setShowForm(false);
      alert("Event created successfully!");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to create event");
    },
  });

  const onSubmit = (data) => {
    if (!data.isPaid) data.eventFee = 0;
    createEventMutation.mutate(data);
  };

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Failed to load events</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Create Event Form */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <MdAdd size={20} /> {showForm ? "Close Form" : "Add Event"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-4 rounded space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              className="p-2 border rounded w-full"
              {...register("title", { required: "Title is required" })}
            />
            <input
              type="date"
              className="p-2 border rounded w-full"
              {...register("date", { required: "Date is required" })}
            />
            <input
              type="text"
              placeholder="Location"
              className="p-2 border rounded w-full"
              {...register("location", { required: "Location is required" })}
            />
            <input
              type="number"
              placeholder="Max Attendees"
              className="p-2 border rounded w-full"
              {...register("maxAttendees", { required: true, min: 1 })}
            />
            <input
              type="number"
              placeholder="Event Fee"
              className="p-2 border rounded w-full"
              {...register("eventFee")}
              disabled={!isPaid}
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("isPaid")} />
              <label>Paid Event?</label>
            </div>
          </div>

          <textarea
            placeholder="Description"
            className="p-2 border rounded w-full"
            {...register("description", { required: "Description is required" })}
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Event
          </button>
        </form>
      )}

      {/* Events Table */}
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
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev._id} className="hover:bg-gray-100">
                <td className="p-2 border">{ev.title}</td>
                <td className="p-2 border">{ev.date}</td>
                <td className="p-2 border">{ev.location}</td>
                <td className="p-2 border">{ev.isPaid ? "Yes" : "No"}</td>
                <td className="p-2 border">{ev.eventFee}</td>
                <td className="p-2 border">{ev.maxAttendees}</td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
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




// // EventsManagement.jsx
// import React, { useState } from "react";
// import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
// import { MdAdd } from "react-icons/md";

// const initialEvents = [
//   {
//     id: 1,
//     title: "Chess Tournament",
//     description: "Annual club chess event",
//     date: "2025-12-20",
//     location: "Community Hall",
//     isPaid: true,
//     eventFee: 50,
//     maxAttendees: 100,
//   },
//   {
//     id: 2,
//     title: "Music Night",
//     description: "Club musical evening",
//     date: "2025-12-25",
//     location: "Club Lounge",
//     isPaid: false,
//     eventFee: 0,
//     maxAttendees: 50,
//   },
// ];

// const EventsManagement = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [showForm, setShowForm] = useState(false);
//   const [editEvent, setEditEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     isPaid: false,
//     eventFee: 0,
//     maxAttendees: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editEvent) {
//       setEvents(
//         events.map((ev) =>
//           ev.id === editEvent.id ? { ...formData, id: editEvent.id } : ev
//         )
//       );
//     } else {
//       setEvents([...events, { ...formData, id: Date.now() }]);
//     }
//     setFormData({
//       title: "",
//       description: "",
//       date: "",
//       location: "",
//       isPaid: false,
//       eventFee: 0,
//       maxAttendees: 0,
//     });
//     setEditEvent(null);
//     setShowForm(false);
//   };

//   const handleEdit = (event) => {
//     setEditEvent(event);
//     setFormData(event);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       setEvents(events.filter((ev) => ev.id !== id));
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Events Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           <MdAdd size={20} /> {showForm ? "Close Form" : "Add Event"}
//         </button>
//       </div>

//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-100 p-4 rounded space-y-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Event Title"
//               className="p-2 border rounded w-full"
//               required
//             />
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="p-2 border rounded w-full"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Location"
//               className="p-2 border rounded w-full"
//               required
//             />
//             <input
//               type="number"
//               name="maxAttendees"
//               value={formData.maxAttendees}
//               onChange={handleChange}
//               placeholder="Max Attendees"
//               className="p-2 border rounded w-full"
//               required
//             />
//             <input
//               type="number"
//               name="eventFee"
//               value={formData.eventFee}
//               onChange={handleChange}
//               placeholder="Event Fee"
//               className="p-2 border rounded w-full"
//               disabled={!formData.isPaid}
//             />
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isPaid"
//                 checked={formData.isPaid}
//                 onChange={handleChange}
//                 id="isPaid"
//               />
//               <label htmlFor="isPaid">Paid Event?</label>
//             </div>
//           </div>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="p-2 border rounded w-full"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             {editEvent ? "Update Event" : "Create Event"}
//           </button>
//         </form>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border">Paid</th>
//               <th className="p-2 border">Fee</th>
//               <th className="p-2 border">Max Attendees</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((ev) => (
//               <tr key={ev.id} className="hover:bg-gray-100">
//                 <td className="p-2 border">{ev.title}</td>
//                 <td className="p-2 border">{ev.date}</td>
//                 <td className="p-2 border">{ev.location}</td>
//                 <td className="p-2 border">{ev.isPaid ? "Yes" : "No"}</td>
//                 <td className="p-2 border">{ev.eventFee}</td>
//                 <td className="p-2 border">{ev.maxAttendees}</td>
//                 <td className="p-2 border flex gap-2">
//                   <button
//                     onClick={() => handleEdit(ev)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <AiOutlineEdit size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(ev.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <AiOutlineDelete size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {events.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center p-4">
//                   No events found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventsManagement;
