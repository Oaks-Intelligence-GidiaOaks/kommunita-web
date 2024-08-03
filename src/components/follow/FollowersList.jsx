import { Link } from "react-router-dom";
import React from "react";

const FollowersList = () => {
  const [link, setLink] = useState("");

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <div className="mt-8 px-5">
      <h2 className="font-semibold text-2xl mb-10">Polls</h2>
      <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
        <Link
          onClick={() => setLink("")}
          className={link == "" ? activeLink : "pb-5"}
          to="/profile/followers"
        >
          Followers
        </Link>
        <Link
          onClick={() => setLink("/profile/following")}
          className={link == "/profile/following" ? activeLink : "pb-5"}
          to="/profile/following"
        >
          Following
        </Link>
      </div>
    </div>
  );
};

export default FollowersList;
