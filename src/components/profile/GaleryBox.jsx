import React from "react";

const GaleryBox = ({ img }) => {
  return (
    <div className="w-[300px] h-[284px] overflow-hidden rounded object-cover">
      {img && (
        <img
          src={img}
          // src="https://images.pexels.com/photos/19175643/pexels-photo-19175643/free-photo-of-woman-in-coat-standing-by-wall-in-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={300}
          height={284}
          alt="personal media post"
        />
      )}
    </div>
  );
};

export default GaleryBox;
