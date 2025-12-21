
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const CreateEventForm = () => {
  const { user } = useContext(AuthContext);

  // Fetch clubs
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clubs/all");
      return res.data;
    },
  });

  // Fetch user role
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/users/role-info?email=${user.email}`
      );
      return res.data;
    },
  });

  // Filter clubs managed by the user
  const userClubs = user?.email
    ? clubs.filter((club) => club.managerEmail === user.email)
    : [];

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    getValues,
    reset
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

  const isPaid = watch("isPaid");

const onSubmit = async (data) => {
  if (!user?.email) {
    toast.error("You must be logged in!");
    return;
  }

    const selectedClub = clubs.find(
    (club) => club._id === data.clubId
  );

  if (!selectedClub) {
    toast.error("Invalid club selected");
    return;
  }

  try {
    const payload = {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      isPaid: data.isPaid || false,
      eventFee: data.isPaid ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees) || 0,
      clubId: data.clubId,
      createdAt: new Date(),
      clubName:selectedClub.clubName
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Event created successfully! Waiting for admin approval");
      reset();
      console.log("Created Event:", result);
    } else {
      toast.error(result.message || "Failed to create event");
      console.error("Error creating event:", result);
    }
  } catch (err) {
    toast.error("Network error. Try again.");
    console.error(err);
  }
};


  const getBorderStyle = (fieldName) =>
    errors[fieldName] ? "border-red-500" : "border-gray-300";

  // Ternary logic for rendering
  return roleLoading || isLoading ? (
    <Loader />
  ) : userRole?.role === "clubManager" || userRole?.role === "admin" ? (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4 mb-4">
          ✨ Create New Event (RHF)
        </h2>

        {/* Club Dropdown */}
        <select
          id="clubName"
          {...register("clubId", { required: "Club Name is required." })}
          className={`w-full px-4 py-2 border rounded-lg ${getBorderStyle(
            "clubId"
          )}`}
        >
          <option value="">Select a Club</option>
          {userClubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${getBorderStyle(
              "title"
            )}`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none transition duration-150 ease-in-out ${getBorderStyle(
              "description"
            )}`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              {...register("date", { required: "Date and Time are required." })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${getBorderStyle(
                "date"
              )}`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g., Virtual or Convention Center"
              {...register("location")}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${getBorderStyle(
                "location"
              )}`}
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Paid Event */}
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

        {/* Event Fee & Max Attendees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isPaid && (
            <div>
              <label
                htmlFor="eventFee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Fee (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="eventFee"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("eventFee", {
                  valueAsNumber: true,
                  required: "Event Fee is required for paid events.",
                  validate: (value) =>
                    getValues("isPaid") && value <= 0
                      ? "Fee must be greater than 0 for paid events."
                      : true,
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${getBorderStyle(
                  "eventFee"
                )}`}
              />
              {errors.eventFee && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.eventFee.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="maxAttendees"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Attendees
            </label>
            <input
              type="number"
              id="maxAttendees"
              min="0"
              placeholder="e.g., 100"
              {...register("maxAttendees", {
                valueAsNumber: true,
                min: { value: 0, message: "Must be a positive number." },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${getBorderStyle(
                "maxAttendees"
              )}`}
            />
            {errors.maxAttendees && (
              <p className="text-red-500 text-xs mt-1">
                {errors.maxAttendees.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Publish Event"}
        </button>
      </form>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-bold text-red-500">
        You do not have permission to create events.
      </h2>
    </div>
  );
};

export default CreateEventForm;
