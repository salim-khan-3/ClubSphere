import React from "react";

const CreateClub = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create a New Club</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Club Name</label>
          <input
            type="text"
            placeholder="Enter club name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter club description"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option>Photography</option>
            <option>Sports</option>
            <option>Tech</option>
            <option>Music</option>
            <option>Art</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City/Area"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Banner Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Membership Fee</label>
          <input
            type="number"
            placeholder="0 for free"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Status</label>
          <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
