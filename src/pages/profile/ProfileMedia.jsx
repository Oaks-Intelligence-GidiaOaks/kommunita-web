import React, { useState } from "react";
import Layout from "./Layout";
import GaleryBox from "../../components/profile/GaleryBox";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import MediaModal from "../../components/main/MediaModal";
import {
  useGetMediaQuery,
  useGetOtherMediaMutation,
} from "../../service/media.service";
import { useEffect } from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { useParams } from "react-router-dom";
import { showAlert } from "../../static/alert";
import ProfileNav from "../../components/profile/ProfileNav";

const ProfileMedia = () => {
  const { data: mediaData } = useGetMediaQuery();
  // const post = data;
  // console.log(data?.data);

  // const [showShimer, setShowShimer] = useState(true);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const [medias, setMedias] = useState(null);
  const [media, setMedia] = useState(null);
  const [getOtherMedia, { isSuccess, isError }] = useGetOtherMediaMutation();
  const { user_id: id } = useParams();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowShimer(false);
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (id) {
      // console.log(id);
      GetOtherUser();
    } else {
      setMedias(mediaData?.data);
    }
  }, [id]);

  const GetOtherUser = async () => {
    try {
      const res = await getOtherMedia(id);
      setMedias(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.error("Error making search: ", error);
      showAlert("Oops", "An error occurred while searching content", "error");
    }
  };

  function showModal(src) {
    setMedia(src);
    setShowMediaModal(true);
  }
  return (
    <Layout>
      <div>
        <ProfileNav />
      </div>
      <div>
        <div className="flex flex-wrap flex-row gap-2">
          {!medias ? (
            <ShimmerSocialPost type="both" />
          ) : (
            <>
              {medias?.map((dt, id) => (
                <div
                  key={id}
                  className="cursor-pointer"
                  onClick={() => showModal(dt)}
                >
                  <GaleryBox media={dt} />
                </div>
              ))}
            </>
          )}
        </div>
        {showMediaModal && (
          <div
            onClick={() => setShowMediaModal(!showMediaModal)}
            className="fixed bg-primary-light-gray bg-opacity-40 w-screen h-screen top-0 left-0 flex items-center justify-center z-50"
          >
            {/* <MediaContainer /> */}
            <MediaModal media={media} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileMedia;
