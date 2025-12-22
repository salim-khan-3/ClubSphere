import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

const UpdateEvent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // event _id
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ===============================
  // Fetch event by ID
  // ===============================
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`https://club-sphere-server-six.vercel.app/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  // ===============================
  // React Hook Form
  // ===============================
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
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

  // ===============================
  // Prefill form when event loads
  // ===============================
  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description || "",
        date: event.date
          ? new Date(event.date).toISOString().slice(0, 16)
          : "",
        location: event.location || "",
        isPaid: event.isPaid || false,
        eventFee: event.eventFee || 0,
        maxAttendees: event.maxAttendees || 0,
      });
    }
  }, [event, reset]);

  // ===============================
  // Update Event Mutation
  // ===============================
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = await user.getIdToken();
      await axios.patch(`https://club-sphere-server-six.vercel.app/events/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerEvents"]);
      toast.success("Event updated successfully!");
      navigate("/dashboard/manager/events-Management");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to update event"
      );
    },
  });

  // ===============================
  // Submit Handler
  // ===============================
  const onSubmit = (data) => {
    const updatedData = {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      isPaid: Boolean(data.isPaid),
      eventFee: data.isPaid ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees) || 0,
    };

    mutation.mutate(updatedData);
  };

  const getBorderStyle = (field) =>
    errors[field] ? "border-red-500" : "border-gray-300";

  // ===============================
  // States
  // ===============================
  if (isLoading) return <Loader />;

  if (isError || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">
          Event not found or access denied.
        </p>
      </div>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 border-b pb-4">
          Edit Event: {event.title}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 border rounded-lg ${getBorderStyle(
                "title"
              )}`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="4"
              {...register("description")}
              className="w-full px-4 py-2 border rounded-lg resize-none"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register("date", {
                  required: "Date & time is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg ${getBorderStyle(
                  "date"
                )}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Paid Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isPaid")}
              className="h-5 w-5"
            />
            <label className="text-sm font-medium">
              Is this a Paid Event?
            </label>
          </div>

          {/* Fee & Max Attendees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isPaid && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Fee (BDT) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("eventFee", {
                    required: "Fee is required",
                    validate: (v) =>
                      v > 0 || "Fee must be greater than 0",
                  })}
                  className={`w-full px-4 py-2 border rounded-lg ${getBorderStyle(
                    "eventFee"
                  )}`}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Max Attendees
              </label>
              <input
                type="number"
                min="0"
                {...register("maxAttendees")}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/manager/events-Management")
              }
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              {mutation.isPending ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
