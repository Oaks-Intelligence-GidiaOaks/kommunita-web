import React from "react";

const ProfileReactions = ({ icon, data }) => {
  return (
    <div className="flex gap-1 items-center">
      {icon}
      <p className="text-sm">{data}</p>
    </div>
  );
};

export default ProfileReactions;
