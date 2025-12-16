import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const CreateEventForm = () => {

  const { user } = useContext(AuthContext)
  // console.log(user.email);
  // Fetching club data using React Query
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clubs/all");
      return res.data;
    },
  });

  // const userClubs = clubs.filter(club=> club.managerEmail === user.email)
  const userClubs = user?.email 
    ? clubs.filter(club => club.managerEmail === user.email)
    : [];
  console.log(userClubs);

  // Map club names
  // const clubNames = clubs.map((club) => club.clubName);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    getValues // Conditional validation এর জন্য getValues ব্যবহার করা হবে
  } = useForm({
    defaultValues: {
      clubName: "",
      title: "",
      description: "",
      date: "",
      location: "",
      isPaid: false,
      eventFee: 0,
      maxAttendees: 0,
    },
  });

  // Watch the 'isPaid' field for conditional rendering and validation
  const isPaid = watch("isPaid");

  // Form Submission Handler
  const onSubmit = (data) => {
    console.log("Form Data Validated and Submitted:", data);
    
    // API Submission logic here...
    // Example: await axiosInstance.post('/events', data);

    alert("Event Data is valid! Check console for submission details.");
  };

  // Helper function to dynamically set the border style based on validation errors
  const getBorderStyle = (fieldName) => 
    errors[fieldName] ? "border-red-500" : "border-gray-300";


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4 mb-4">
          ✨ Create New Event (RHF)
        </h2>

        {/* Club name Dropdown (RHF Validation) */}
<select
  id="clubName"
  {...register("clubId", {
    required: "Club Name is required.",
  })}
  className={`w-full px-4 py-2 border rounded-lg ${
    getBorderStyle("clubId")
  }`}
>
  <option value="">Select a Club</option>

  {userClubs.map((club) => (
    <option key={club._id} value={club._id}>
      {club.clubName}
    </option>
  ))}
</select>

        {/* Title (RHF Validation) */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Annual Tech Conference"
            {...register("title", {
                required: "Event Title is required.",
                minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters.",
                }
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${
                getBorderStyle("title")
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Description (RHF Validation) */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Briefly describe your event..."
            {...register("description", {
                maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters.",
                }
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none transition duration-150 ease-in-out ${
                getBorderStyle("description")
            }`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Date & Location (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date (RHF Validation) */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              {...register("date", {
                required: "Date and Time are required.",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${
                getBorderStyle("date")
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          {/* Location (No Validation) */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g., Virtual or Convention Center"
              {...register("location")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${
                getBorderStyle("location")
              }`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>

        {/* IsPaid Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isPaid"
            {...register("isPaid")}
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="isPaid" className="text-sm font-medium text-gray-900">
            Is this a Paid Event?
          </label>
        </div>

        {/* Event Fee & Max Attendees (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Event Fee (Conditional Validation based on `isPaid`) */}
          {isPaid && ( // Using the watched value here
            <div>
              <label htmlFor="eventFee" className="block text-sm font-medium text-gray-700 mb-1">
                Event Fee (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="eventFee"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("eventFee", {
                    valueAsNumber: true, // Auto-convert to number
                    required: "Event Fee is required for paid events.",
                    validate: (value) => {
                        // Custom validation: Fee must be greater than 0 if isPaid is true
                        return getValues('isPaid') && value <= 0
                            ? "Fee must be greater than 0 for paid events."
                            : true;
                    }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${
                  getBorderStyle("eventFee")
                }`}
              />
              {errors.eventFee && <p className="text-red-500 text-xs mt-1">{errors.eventFee.message}</p>}
            </div>
          )}

          {/* Max Attendees (RHF Validation) */}
          <div>
            <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-1">
              Max Attendees
            </label>
            <input
              type="number"
              id="maxAttendees"
              min="0"
              placeholder="e.g., 100"
              {...register("maxAttendees", {
                valueAsNumber: true, // Auto-convert to number
                min: {
                    value: 0,
                    message: "Must be a positive number.",
                }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${
                getBorderStyle("maxAttendees")
              }`}
            />
            {errors.maxAttendees && <p className="text-red-500 text-xs mt-1">{errors.maxAttendees.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting} // Disable button during submission
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Publish Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;




























// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// // import React, { useState } from 'react';
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const CreateEventForm = () => {
//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["clubs"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/clubs/all");
//       return res.data;
//     },
//   });

//   console.log(clubs);
//   const clubName = clubs.map((club)=>club.clubName)
//   // console.log(clubName);

//   const eventTypes = [
//     clubName
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <form className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4 mb-4">
//           ✨ Create New Event
//         </h2>

//         {/* Club name */}
//         <div>
//           <label
//             htmlFor="eventType"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Club Name<span className="text-red-500">*</span>
//           </label>
//           <select
//             name="eventType"
//             id="eventType"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none transition duration-150 ease-in-out"
//           >
//             {eventTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Event Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             required
//             placeholder="e.g., Annual Tech Conference"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             id="description"
//             rows="3"
//             placeholder="Briefly describe your event..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none"
//           ></textarea>
//         </div>

//         {/* Date & Location (Two Columns) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Date */}
//           <div>
//             <label
//               htmlFor="date"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="datetime-local" // Use datetime-local for date and time
//               name="date"
//               id="date"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label
//               htmlFor="location"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               id="location"
//               placeholder="e.g., Virtual or Convention Center"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//             />
//           </div>
//         </div>

//         {/* IsPaid Checkbox */}
//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="isPaid"
//             id="isPaid"
//             className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//           />
//           <label htmlFor="isPaid" className="text-sm font-medium text-gray-900">
//             Is this a Paid Event?
//           </label>
//         </div>

//         {/* Event Fee & Max Attendees (Two Columns) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Event Fee (Conditionally rendered) */}
//           {/* {formData.isPaid && ( */}
//           <div>
//             <label
//               htmlFor="eventFee"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Event Fee (BDT) <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="eventFee"
//               id="eventFee"
//               // value={formData.eventFee}
//               // onChange={handleChange}
//               // required={formData.isPaid}
//               min="0"
//               placeholder="0.00"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//             />
//           </div>
//           {/* )} */}

//           {/* Max Attendees */}
//           <div>
//             <label
//               htmlFor="maxAttendees"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Max Attendees
//             </label>
//             <input
//               type="number"
//               name="maxAttendees"
//               id="maxAttendees"
//               min="0"
//               placeholder="e.g., 100"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//         >
//           Publish Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;
