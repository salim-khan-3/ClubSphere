import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";

const CreateClub = () => {
    const { user } = useContext(AuthContext);

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      clubName: "",
      description: "",
      category: "Tech",
      location: "",
      bannerImage: "",
      membershipFee: 0,
    },
  });


  const categories = [
    "Tech", "Photography", "Sports", "Music", "Art", "Gaming",
    "Business", "Education", "Science", "Literature", "Others"
  ];

  const onSubmit = async (data) => {
    if (!user?.email) {
      toast.error("You must be logged in!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          managerEmail: user.email,
          status: "pending",
          membershipFee: Number(data.membershipFee),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Club created successfully! Waiting for admin approval");
        reset();
      } else {
        toast.error(result.message || "Failed to create club");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
      console.error(err);
    }
  };

  
    return (
<div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
            Create New Club
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            {/* Club Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Club Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("clubName", {
                  required: "Club name is required",
                  minLength: { value: 3, message: "At least 3 characters" }
                })}
                type="text"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                placeholder="e.g. Dhaka Coders Club"
              />
              {errors.clubName && <p className="text-red-500 text-sm mt-2">{errors.clubName.message}</p>}
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", { required: "Please select a category" })}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("location", { required: "Location is required" })}
                  type="text"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none"
                  placeholder="e.g. Dhaka, Bangladesh"
                />
                {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location.message}</p>}
              </div>
            </div>

            {/* Membership Fee */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Membership Fee (BDT) - 0 for free
              </label>
              <input
                {...register("membershipFee", {
                  min: { value: 0, message: "Fee cannot be negative" }
                })}
                type="number"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none"
                placeholder="0"
              />
            </div>

            {/* Banner Image URL */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Banner Image URL (Optional)
              </label>
              <input
                {...register("bannerImage")}
                type="url"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none"
                placeholder="https://example.com/banner.jpg"
              />
            </div>


            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Write at least 20 characters" }
                })}
                rows="6"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 outline-none resize-none"
                placeholder="What is your club about? Activities? Goals?..."
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
              >
                {isSubmitting ? "Creating Club..." : "Create Club"}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-8 text-lg">
              Your club will be reviewed by admin → Status: <span className="font-bold text-orange-600">Pending</span>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default CreateClub;