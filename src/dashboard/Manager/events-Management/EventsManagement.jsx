import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../Components/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const EventsManagement = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // =========================
  // Fetch Manager Events
  // =========================
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["managerEvents"],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        "https://club-sphere-server-six.vercel.app/manager/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  // =========================
  // Delete Event (SweetAlert)
  // =========================
  const handleDeleteEvent = async (eventId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = await user.getIdToken();

      await axios.delete(`https://club-sphere-server-six.vercel.app/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Event has been deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      // 🔄 Refetch events
      queryClient.invalidateQueries(["managerEvents"]);
    } catch (error) {
      console.error(error);

      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error.response?.data?.message ||
          "Failed to delete event. Please try again.",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Events Management
        </h2>

        <Link
          to="/dashboard/manager/create_event"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Title</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-center font-semibold">Paid</th>
                <th className="px-6 py-4 text-center font-semibold">Fee</th>
                <th className="px-6 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {events.map((ev) => (
                <tr key={ev._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {ev.title}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(ev.date).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {ev.isPaid ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        Free
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center font-medium">
                    {ev.isPaid ? `$${ev.eventFee}` : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      {/* Edit */}
                      <Link
                        to={`/dashboard/manager/update-event/${ev._id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Edit Event"
                      >
                        <AiOutlineEdit size={20} />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteEvent(ev._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Event"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {events.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;
