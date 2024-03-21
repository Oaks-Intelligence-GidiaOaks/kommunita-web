import React from "react";
import SingleLikeContainer from "./SingleLikeContainer";
import { Link } from "react-router-dom";

const Likes = () => {
  return (
    <div className="max-w-[491px] flex flex-col gap-4 bg-white p-8 mb-5 rounded">
      <p>You might like</p>
      <SingleLikeContainer />
      <SingleLikeContainer />
      <SingleLikeContainer liked={true} />
      <SingleLikeContainer liked={true} />
      <SingleLikeContainer />
      <Link to={"/profile"}>
        <button className="text-white w-full py-3 bg-primary-dark-green  rounded-lg text-center">
          View more
        </button>
      </Link>
    </div>
  );
};

export default Likes;
