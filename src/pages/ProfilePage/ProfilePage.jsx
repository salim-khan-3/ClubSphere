// src/Pages/ProfilePage/MyProfile.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:3000";

const MyProfile = () => {
  const { user, setUser, updateUser, token } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: name || user.displayName,
      photoURL: photo || user.photoURL,
    };

    try {
      // 1️⃣ Backend update
      const res = await axios.patch(
        `${backendUrl}/users/${encodeURIComponent(user.email)}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUserFromDB = res.data;

      // 2️⃣ Firebase update
      await updateUser({
        displayName: updatedUserFromDB.name,
        photoURL: updatedUserFromDB.photoURL,
      });

      // 3️⃣ Update Context → Navbar auto update
      setUser((prev) => ({
        ...prev,
        displayName: updatedUserFromDB.name,
        photoURL: updatedUserFromDB.photoURL,
      }));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error.response?.data?.message || "Profile update failed!"
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="bg-white flex-1 shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">My Profile</h2>

        <img
          src={user?.photoURL || null}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-200 mb-4 object-cover"
        />

        {!isEditing ? (
          <>
            <h3 className="text-xl font-semibold mb-2">
              {user?.displayName || "No Name Found"}
            </h3>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.displayName || "");
                  setPhoto(user.photoURL || "");
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

