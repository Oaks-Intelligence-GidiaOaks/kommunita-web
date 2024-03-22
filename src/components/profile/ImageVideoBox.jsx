import React from "react";

const ImageVideoBox = () => {
  return (
    <div className="w-[285px] h-[284px] overflow-hidden rounded">
      <img
        src="/src/assets/images/lady-in-yellow.jpeg"
        // src="https://images.pexels.com/photos/19175643/pexels-photo-19175643/free-photo-of-woman-in-coat-standing-by-wall-in-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        width={285}
        height={284}
        alt="personal media post"
      />
    </div>
  );
};

export default ImageVideoBox;
