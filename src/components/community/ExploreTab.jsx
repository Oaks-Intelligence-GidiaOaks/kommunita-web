import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ExploreTab = () => {
  const selecteddiv = useLocation();
  const [selected, setSelectedDiv] = useState(selecteddiv);

  const handleDivClick = (divId) => {
    setSelectedDiv(divId);
  };

  useEffect(() => {
    setSelectedDiv(selecteddiv);
  }, [selecteddiv]);
  return (
    <>
      <div className="flex flex-col mt-3 items-center">
        <ul
          className="flex justify-between items-center gap-10 w-full"
          role="tablist"
        >
          <li
            className={`pb-1  ${
              selected?.pathname === "/explore"
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(1);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes()
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              } `}
              to="/explore"
            >
              Popular Posts
            </Link>
          </li>
          <li
            className={`pb-1  ${
              selected?.pathname?.includes("k_diaries")
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(2);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes()
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              }`}
              to="k_diaries"
            >
              Diaries
            </Link>
          </li>
          <li
            className={`pb-1  ${
              selected?.pathname?.includes("videos")
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(3);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes("k_videos")
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              }`}
              to="k_videos"
            >
              Videos
            </Link>
          </li>
          <li
            className={`pb-1  ${
              selected?.pathname?.includes("k_images")
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(4);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes("k_images")
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              }`}
              to="k_images"
            >
              Images
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExploreTab;
