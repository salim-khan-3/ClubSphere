



import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "https://club-sphere-server-six.vercel.app/",
});

const CreateEventForm = () => {
  const { user } = useContext(AuthContext);

  // ================= Fetch all clubs =================
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      // const res = await axiosInstance.get("/clubs/all");
      const res = await axiosInstance.get("clubs/all");
      return res.data;
    },
  });

  // ================= Fetch user role =================
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        // `/users/role-info?email=${user.email}`
        `users/role-info?email=${user.email}`
      );
      return res.data;
    },
  });

  // ================= Filter clubs by manager =================
  const userClubs = user?.email
    ? clubs.filter((club) => club.managerEmail === user.email)
    : [];

  // ================= React Hook Form =================
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      clubId: "",
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

  // ================= Submit Handler =================
  const onSubmit = async (data) => {
    if (!user?.email) {
      toast.error("You must be logged in!");
      return;
    }

    // clubId string vs ObjectId fix
    const selectedClub = clubs.find(
      (club) => String(club._id) === String(data.clubId)
    );

    if (!selectedClub) {
      toast.error("Invalid club selected");
      return;
    }

    try {
      // 🔐 Get Firebase token
      const token = await user.getIdToken();

      const payload = {
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        isPaid: Boolean(data.isPaid),
        eventFee: data.isPaid ? Number(data.eventFee) : 0,
        maxAttendees: Number(data.maxAttendees) || 0,
        clubId: data.clubId,
        clubName: selectedClub.clubName,
        createdAt: new Date(),
      };

      console.log("Event Payload:", payload);

      const response = await fetch("https://club-sphere-server-six.vercel.app/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // ✅ MOST IMPORTANT FIX
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Event created successfully! Waiting for admin approval"
        );
        reset();
        console.log("Created Event:", result);
      } else {
        toast.error(result.message || "Failed to create event");
        console.error(result);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const getBorderStyle = (fieldName) =>
    errors[fieldName] ? "border-red-500" : "border-gray-300";

  // ================= UI =================
  if (isLoading || roleLoading) return <Loader />;

  if (userRole?.role !== "clubManager" && userRole?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold text-red-500">
          You do not have permission to create events.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center border-b pb-4">
          ✨ Create New Event
        </h2>

        {/* Club Select */}
        <select
          {...register("clubId", { required: "Club is required" })}
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
        <input
          type="text"
          placeholder="Event Title"
          {...register("title", { required: true, minLength: 5 })}
          className={`w-full px-4 py-2 border rounded-lg ${getBorderStyle(
            "title"
          )}`}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Date */}
        <input
          type="datetime-local"
          {...register("date", { required: true })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Paid */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isPaid")} />
          <label>Paid Event?</label>
        </div>

        {isPaid && (
          <input
            type="number"
            placeholder="Event Fee"
            {...register("eventFee", { required: true, min: 1 })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        )}

        {/* Max Attendees */}
        <input
          type="number"
          placeholder="Max Attendees"
          {...register("maxAttendees")}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {isSubmitting ? "Submitting..." : "Publish Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;

