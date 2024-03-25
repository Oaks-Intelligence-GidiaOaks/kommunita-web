import React, { useState } from "react";
import Layout from "./Layout";
import GaleryBox from "../../components/profile/GaleryBox";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import MediaModal from "../../components/main/MediaModal";

const ProfileMedia = () => {
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [vidSrc, setVidSrc] = useState(null);

  function showModal(src) {
    setImgSrc(src);
    setVidSrc(src);
    setShow(true);
  }
  return (
    <Layout>
      <div className="flex flex-wrap flex-row gap-2">
        {/* <div className="grid grid-cols-3 gap-2"> */}
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/images/lady-in-yellow.jpeg")}
        >
          <GaleryBox img="/src/assets/images/lady-in-yellow.jpeg" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/video-2.mp4")}
        >
          <GaleryBox img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.brightedge.com%2Fsites%2Fdefault%2Ffiles%2Fvideo%2520thumbnail.jpg&f=1&nofb=1&ipt=b3ea593a342aa7853181ba31f1bdfba25727814474bb65eeb51c9edb8bdcf7f6&ipo=images" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/images/lady-in-yellow.jpeg")}
        >
          <GaleryBox img="/src/assets/images/lady-in-yellow.jpeg" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/video-2.mp4")}
        >
          <GaleryBox img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.brightedge.com%2Fsites%2Fdefault%2Ffiles%2Fvideo%2520thumbnail.jpg&f=1&nofb=1&ipt=b3ea593a342aa7853181ba31f1bdfba25727814474bb65eeb51c9edb8bdcf7f6&ipo=images" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/images/lady-in-yellow.jpeg")}
        >
          <GaleryBox img="/src/assets/images/lady-in-yellow.jpeg" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => showModal("/src/assets/video-2.mp4")}
        >
          <GaleryBox img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.brightedge.com%2Fsites%2Fdefault%2Ffiles%2Fvideo%2520thumbnail.jpg&f=1&nofb=1&ipt=b3ea593a342aa7853181ba31f1bdfba25727814474bb65eeb51c9edb8bdcf7f6&ipo=images" />
        </div>
      </div>
      {show && (
        <div
          onClick={() => setShow(!show)}
          className="fixed bg-primary-light-gray bg-opacity-40 w-screen h-screen top-0 left-0 flex items-center justify-center z-50"
        >
          {/* <MediaContainer /> */}
          <MediaModal
            avatar={avatar1}
            fullname="Perl Rosy"
            username="perl_skin"
            verifiedUser={true}
            postTime="10m"
            content="Check out this cool image!"
            imageSrc={imgSrc}
            videoSrc={vidSrc}
          />
        </div>
      )}
    </Layout>
  );
};

export default ProfileMedia;
