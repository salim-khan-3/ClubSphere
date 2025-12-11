import React from "react";
import ManageUserCard from "./ManageUserCard";
const ManageUser = () => {

  return (
<div>
      <div className="bg-white rounded-2xl shadow p-4">
        <ManageUserCard></ManageUserCard>
        <ManageUserCard></ManageUserCard>
        <ManageUserCard></ManageUserCard>
      </div>
    </div>
  );
};

export default ManageUser;
