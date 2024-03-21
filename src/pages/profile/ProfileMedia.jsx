import React, { useState } from "react";
import Layout from "./Layout";
import ImageVideoBox from "../../components/profile/ImageVideoBox";
import MediaContainer from "./../../components/profile/MediaContainer";

const ProfileMedia = () => {
  const [show, setShow] = useState(false);

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-8">
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <ImageVideoBox />
        </div>
      </div>
      {show && (
        <div
          onClick={() => setShow(!show)}
          className="fixed bg-primary-light-gray bg-opacity-40 w-screen h-screen top-0 left-0 flex items-center justify-center z-50"
        >
          <MediaContainer />
        </div>
      )}
    </Layout>
  );
};

export default ProfileMedia;
