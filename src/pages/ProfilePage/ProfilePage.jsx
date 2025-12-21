// src/Pages/ProfilePage/ProfilePage.jsx

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const backendUrl = "http://localhost:3000";

const ProfilePage = () => {
  const { user, token, updateUser, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: "", photoURL: "" },
  });

  // ==========================
  // Fetch user profile from MongoDB
  // ==========================
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No email found");
      const res = await axios.get(`${backendUrl}/users/${encodeURIComponent(user.email)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user?.email && !!token,
  });

  // Fill form when profile data is fetched
  useEffect(() => {
    if (profile) {
      reset({ name: profile.name || "", photoURL: profile.photoURL || "" });
    }
  }, [profile, reset]);

  // ==========================
  // Update profile mutation
  // ==========================
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      // 1️⃣ Update MongoDB
      const res = await axios.put(
        `${backendUrl}/users/${encodeURIComponent(user?.email)}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: async (updatedUser) => {
      try {
        // 2️⃣ Update Firebase Auth
        await updateUser({
          displayName: updatedUser.name,
          photoURL: updatedUser.photoURL,
        });

        // 3️⃣ Update AuthContext → live navbar update
        setUser(prev => ({
          ...prev,
          displayName: updatedUser.name,
          photoURL: updatedUser.photoURL,
        }));

        // 4️⃣ Invalidate profile query to refresh
        queryClient.invalidateQueries({ queryKey: ["profile", user?.email] });

        toast.success("Profile updated successfully!");
        setEditMode(false);
      } catch (err) {
        console.error("Firebase update error:", err);
        toast.error("Profile updated in DB, but Firebase update failed!");
      }
    },
    onError: (err) => {
      console.error("Profile update error:", err);
      toast.error(
        err.response?.data?.message || err.response?.data?.warning || "Update failed"
      );
    },
  });

  const onSubmit = (data) => updateProfileMutation.mutate(data);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="mt-4 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center text-red-600">
        <p className="text-xl font-semibold">Failed to load profile</p>
        <p className="mt-2">{error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">My Profile</h2>

      {!editMode ? (
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={profile?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-200 shadow-md"
          />
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              <span className="text-lg">{profile?.name || "-"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              <span className="text-lg">{profile?.email || "-"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Role:</span>{" "}
              <span className="text-lg capitalize">{profile?.role || "Member"}</span>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              {...register("photoURL")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Paste a direct image link (e.g., from imgbb, unsplash)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={profile?.role || "Member"}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                reset({ name: profile?.name || "", photoURL: profile?.photoURL || "" });
                setEditMode(false);
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || updateProfileMutation.isPending}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {(isSubmitting || updateProfileMutation.isPending) && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting || updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
























// // src/Pages/ProfilePage/ProfilePage.jsx

// import React, { useState, useContext, useEffect } from "react"; // 👈 useEffect add করো
// import { AuthContext } from "../../Context/AuthContext"; 
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";

// const backendUrl = "http://localhost:3000";

// const ProfilePage = () => {
//   const { user, token } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const [editMode, setEditMode] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       photoURL: "",
//     },
//   }); // 👈 defaultValues দাও (খালি থাকলেও)

//   // Fetch profile
//   const { data: profile, isLoading, isError } = useQuery({
//     queryKey: ["profile", user?.email],
//     queryFn: async () => {
//       if (!user?.email) throw new Error("No email found");
//       const res = await axios.get(
//         `${backendUrl}/users/${encodeURIComponent(user.email)}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   // 👈 গুরুত্বপূর্ণ: profile আসার পর form reset করো (defaultValues set করার জন্য)
//   useEffect(() => {
//     if (profile) {
//       reset({
//         name: profile.name || "",
//         photoURL: profile.photoURL || "",
//       });
//     }
//   }, [profile, reset]);

//   // Update mutation
//   const updateProfileMutation = useMutation({
//     mutationFn: async (updatedData) => {
//       const res = await axios.put(
//         `${backendUrl}/users/${encodeURIComponent(user?.email)}`,
//         updatedData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       toast.success("Profile updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["profile", user?.email] });
//       setEditMode(false);
//       // optional: reset(data); // যদি latest data দিয়ে form reset করতে চাও
//     },
//     onError: (err) => {
//       console.error("Update error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Update failed");
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Submitting data:", data); // 👈 ডিবাগ করার জন্য রাখো
//     updateProfileMutation.mutate(data);
//   };

//   if (isLoading) return <div className="text-center mt-20">Loading...</div>;
//   if (isError) return <div className="text-center mt-20 text-red-500">Failed to load profile</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       {!editMode ? (
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <img
//             src={profile?.photoURL || "/default-avatar.png"}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover"
//           />
//           <div className="flex-1 space-y-2">
//             <p><span className="font-semibold">Name:</span> {profile?.name || "-"}</p>
//             <p><span className="font-semibold">Email:</span> {profile?.email || "-"}</p>
//             <p><span className="font-semibold">Role:</span> {profile?.role || "Member"}</p>
//             <button
//               onClick={() => setEditMode(true)}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block font-medium">Name</label>
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               className="w-full border px-3 py-2 rounded"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//           </div>

//           <div>
//             <label className="block font-medium">Photo URL</label>
//             <input
//               type="text"
//               {...register("photoURL")}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Role</label>
//             <input
//               type="text"
//               value={profile?.role || "Member"}
//               disabled
//               className="w-full border px-3 py-2 rounded bg-gray-100"
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={isSubmitting || updateProfileMutation.isPending}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition"
//             >
//               {isSubmitting || updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 reset({
//                   name: profile?.name || "",
//                   photoURL: profile?.photoURL || "",
//                 });
//                 setEditMode(false);
//               }}
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;





// // src/Pages/ProfilePage/ProfilePage.jsx

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../Context/AuthContext"; 
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";

// const backendUrl = "http://localhost:3000"; // তোমার backend URL

// const ProfilePage = () => {
//   const { user, token } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const [editMode, setEditMode] = useState(false);

//   // React Hook Form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   // ==========================
//   // Fetch user profile data
//   // ==========================
//   const { data: profile, isLoading, isError } = useQuery({
//     queryKey: ["profile", user?.email],
//     queryFn: async () => {
//       if (!user?.email) throw new Error("No email found");
//       const res = await axios.get(
//         `${backendUrl}/users/${encodeURIComponent(user.email)}`, // encode email
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//     onSuccess: (data) => reset(data),
//   });

//   // ==========================
//   // Update profile mutation
//   // ==========================
//   const updateProfileMutation = useMutation({
//     mutationFn: async (updatedData) => {
//       const res = await axios.put(
//         `${backendUrl}/users/${encodeURIComponent(user.email)}`,
//         updatedData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success("Profile updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["profile", user?.email] });
//       setEditMode(false);
//     },
//     onError: (err) => {
//       toast.error(err.response?.data?.message || "Update failed");
//     },
//   });

//   const onSubmit = (data) => {
//     updateProfileMutation.mutate(data);
//   };

//   if (isLoading) return <div className="text-center mt-20">Loading...</div>;
//   if (isError) return <div className="text-center mt-20 text-red-500">Failed to load profile</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       {/* Profile Card */}
//       {!editMode ? (
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <img
//             src={profile?.photoURL || "/default-avatar.png"}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover"
//           />
//           <div className="flex-1 space-y-2">
//             <p>
//               <span className="font-semibold">Name:</span> {profile?.name || "-"}
//             </p>
//             <p>
//               <span className="font-semibold">Email:</span> {profile?.email || "-"}
//             </p>
//             <p>
//               <span className="font-semibold">Role:</span> {profile?.role || "Member"}
//             </p>
//             <button
//               onClick={() => setEditMode(true)}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       ) : (
//         /* Edit Form */
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block font-medium">Name</label>
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               defaultValue={profile?.name || ""}
//               className="w-full border px-3 py-2 rounded"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-medium">Photo URL</label>
//             <input
//               type="text"
//               {...register("photoURL")}
//               defaultValue={profile?.photoURL || ""}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Role</label>
//             <input
//               type="text"
//               value={profile?.role || "Member"}
//               disabled
//               className="w-full border px-3 py-2 rounded bg-gray-100"
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 reset(profile); // reset form to original
//                 setEditMode(false);
//               }}
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
