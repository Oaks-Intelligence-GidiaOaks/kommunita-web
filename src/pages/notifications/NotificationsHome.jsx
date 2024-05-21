import React, { useEffect, useState } from "react";
import MainLayout from "./../../components/main/MainLayout";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetNotificationsQuery } from "../../service/notification.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
// import post_action from "../../assets/images/main/post-action.svg";
import CustomCarousel from "../../components/main/CustomCarousel";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import { Spinner } from "flowbite-react";
const NotificationsHome = () => {
  const { data, isLoading, refetch } = useGetNotificationsQuery();

  const [ntf, SetNotifications] = useState([]);

  useEffect(() => {
    if (data) {
      SetNotifications(data.data);
    }
  }, [data, refetch]);

  console.log(data?.data);
  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : (
        ntf?.map((ntf, id) => (
          <div
            key={id}
            className="flex gap-3 items-start bg-white border-b-2 p-5 w-full mt-4"
          >
            <div
              className={`rounded-full border-4 w-[40px] h-[40px]`}
              // style={{ borderColor: badgeColor || {post.user_id?.department[0]?.badge?.color} }}
              style={{ borderColor: "gray" }}
            >
              <img
                src={ntf?.initiator_id?.photo_url || avatar4}
                className="rounded-full w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex-1">
              {/* <div className="flex gap-2">
                <p className="post-name pb-1">{fullname || "Eko Rugged"}</p>{" "}
                {verifiedUser && (
                  <span>
                    <img src={verified || avatar4} alt="" className="pb-1" />
                  </span>
                )}
              </div> */}
              <p className="">{ntf?.initiator_id?.display_name}</p>
              <p className="text-primary-light-gray">{ntf?.content}</p>
              <div className="mt-2">
                <p className="mb-1">{ntf?.post_id?.content}</p>

                {ntf?.post_id?.media_urls.length > 0 && (
                  <div className="post-media rounded-md w-full">
                    <CustomCarousel
                      media_urls={ntf?.post_id?.media_urls}
                      left={left}
                      right={right}
                      dotsinactive={dotsinactive}
                      dotsactive={dotsactive}
                    />
                  </div>
                )}
              </div>
              <p className="text-primary-light-gray">
                {getTimeAgoString(ntf?.updatedAt)}
              </p>
            </div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
          </div>
          // <div>hello</div>
        ))
      )}
    </MainLayout>
  );
};

export default NotificationsHome;
