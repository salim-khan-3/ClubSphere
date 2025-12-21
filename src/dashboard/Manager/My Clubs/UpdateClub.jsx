import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const categories = [
    "Tech", "Photography", "Sports", "Music", "Art",
    "Gaming", "Business", "Education", "Science",
    "Literature", "Others",
  ];

  // 🔹 Load existing club data
  useEffect(() => {
    fetch(`http://localhost:3000/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        reset({
          clubName: data.clubName,
          description: data.description,
          category: data.category,
          location: data.location,
          bannerImage: data.bannerImage,
          membershipFee: data.membershipFee,
        });
      })
      .catch(() => toast.error("Failed to load club data"));
  }, [id, reset]);

  // 🔹 Update submit
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/clubs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Club updated successfully!");
        navigate("/dashboard/manager/my-clubs");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Edit Club
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

          {/* Club Name */}
          <input
            {...register("clubName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Club Name"
          />

          {/* Category */}
          <select {...register("category")} className="input input-bordered w-full">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Location */}
          <input
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="Location"
          />

          {/* Membership Fee */}
          <input
            {...register("membershipFee")}
            type="number"
            className="input input-bordered w-full"
          />

          {/* Banner */}
          <input
            {...register("bannerImage")}
            className="input input-bordered w-full"
            placeholder="Banner Image URL"
          />

          {/* Description */}
          <textarea
            {...register("description", { required: true })}
            rows="5"
            className="textarea textarea-bordered w-full"
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700"
          >
            {isSubmitting ? "Updating..." : "Update Club"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClub;