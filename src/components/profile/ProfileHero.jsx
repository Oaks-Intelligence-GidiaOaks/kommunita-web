import React, { useState } from "react";
import HeroLabel from "./HeroLabel";
import MenuItems from "./../sidebar/MenuItems";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { useSelector } from "react-redux";
import getTimeAgoString from "./../../utils/getTimeAgoString";

const ProfileHero = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { data: profile } = useGetUserProfiileQuery();
  console.log("Profile:", profile);

  // const display_name = useSelector((state) => state.user.user.display_name);
  const user = useSelector((state) => state.user.user);

  const createdAt = new Date(user.createdAt);
  const month = createdAt.toLocaleString("default", { month: "long" });
  const year = createdAt.getFullYear();

  return (
    <div className="lg:h-[300px] text-primary-dark-gray">
      <div className="h-[200px] w-full bg-[url('/src/assets/images/green_bg.jpeg')]"></div>
      {showMobileNav && (
        <div className="lg:hidden fixed bg-white z-50 h-screen top-0 sm:w-[50%]">
          <MenuItems />
          <p
            onClick={() => setShowMobileNav(false)}
            className="w-full bg-primary-dark-green text-white text-center p-2 font-semibold mt-10 cursor-pointer"
          >
            Close
          </p>
        </div>
      )}
      <div className="relative px-10 lg:px-20 ">
        <div className="lg:absolute -mt-10 lg:mt-0 -top-10 lg:h-[150px] rounded-xl lg:w-[90%] bg-white p-4">
          <div className="relative flex justify-center items-center">
            <div className="absolute top-0 right-5 h-[41px] w-[41px] rounded-full bg-[#02BA09] flex items-center justify-center">
              <img src="/src/assets/images/AddNotification.svg" />
            </div>
            <div
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="absolute top-0 left-5 h-[41px] w-[41px] rounded-full bg-[#02BA09] flex items-center justify-center cursor-pointer lg:!hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                // stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>

            <div className="flex lg:items-end gap-5 -mt-[50px] flex-col items-center lg:flex-row lg:justify-between w-full">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-5 lg:ml-10">
                <div className="border-white border-[5px] bg-white  w-[140px] h-[136px] overflow-hidden rounded-lg">
                  <img src={profile?.data.photo_url} />
                </div>
                <div className="flex flex-col items-center lg:block">
                  <h1 className="font-bold text-3xl xl:text-5xl mb-5">
                    {user.display_name}
                  </h1>
                  <div className="flex gap-5">
                    <div>
                      <HeroLabel
                        label={profile?.data.tech_title}
                        icon={
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_1324_14746)">
                              <path
                                d="M11.4453 3.88794H2.55642C1.94277 3.88794 1.44531 4.3854 1.44531 4.99905V10.5546C1.44531 11.1683 1.94277 11.6657 2.55642 11.6657H11.4453C12.059 11.6657 12.5564 11.1683 12.5564 10.5546V4.99905C12.5564 4.3854 12.059 3.88794 11.4453 3.88794Z"
                                stroke="#34B53A"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.22276 11.6659V2.77697C9.22276 2.48229 9.1057 2.19967 8.89733 1.9913C8.68895 1.78293 8.40634 1.66586 8.11165 1.66586H5.88943C5.59475 1.66586 5.31213 1.78293 5.10376 1.9913C4.89538 2.19967 4.77832 2.48229 4.77832 2.77697V11.6659"
                                stroke="#34B53A"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1324_14746">
                                <rect
                                  width="13.3333"
                                  height="13.3333"
                                  fill="white"
                                  transform="translate(0.333984 -0.000640869)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        }
                      />
                    </div>
                    <div>
                      <HeroLabel
                        label={`${profile?.data?.location?.country}, ${profile?.data?.location?.state}`}
                        icon={
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.001 7.05566C12.001 10.9446 7.00098 14.2779 7.00098 14.2779C7.00098 14.2779 2.00098 10.9446 2.00098 7.05566C2.00098 5.72958 2.52776 4.45781 3.46544 3.52013C4.40312 2.58245 5.67489 2.05566 7.00098 2.05566C8.32706 2.05566 9.59883 2.58245 10.5365 3.52013C11.4742 4.45781 12.001 5.72958 12.001 7.05566Z"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.00065 8.72249C7.92113 8.72249 8.66732 7.9763 8.66732 7.05583C8.66732 6.13535 7.92113 5.38916 7.00065 5.38916C6.08018 5.38916 5.33398 6.13535 5.33398 7.05583C5.33398 7.9763 6.08018 8.72249 7.00065 8.72249Z"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                    </div>
                    <div>
                      <HeroLabel
                        // label={getTimeAgoString(user.createdAt)}
                        label={`Joined ${month}, ${year}`}
                        icon={
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.6738 2.22168H2.89794C2.28445 2.22168 1.78711 2.71902 1.78711 3.33251V11.1083C1.78711 11.7218 2.28445 12.2192 2.89794 12.2192H10.6738C11.2873 12.2192 11.7846 11.7218 11.7846 11.1083V3.33251C11.7846 2.71902 11.2873 2.22168 10.6738 2.22168Z"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.00781 1.11084V3.33251"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.56445 1.11084V3.33251"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1.78711 5.55417H11.7846"
                              stroke="#34B53A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <svg
                  className="hidden lg:block"
                  width="3"
                  height="82"
                  viewBox="0 0 3 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.5 0V81.5" stroke="#E8E8E8" strokeWidth="3" />
                </svg>{" "}
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-3 lg:gap-20">
                <div className="flex items-center justify-between gap-5">
                  <div className="">
                    <h2 className="font-bold lg:text-2xl">
                      {user.followers.length}
                    </h2>
                    <p>Followers</p>
                  </div>
                  <div>
                    {" "}
                    <svg
                      width="3"
                      height="32"
                      viewBox="0 0 3 82"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1.5 0V81.5" stroke="#E8E8E8" strokeWidth="3" />
                    </svg>{" "}
                  </div>
                  <div className="">
                    <h2 className="font-bold lg:text-2xl">
                      {user.following.length}
                    </h2>
                    <p>Following</p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProfileHero.defaultProps = {
//   user: {
//     name: "Godspower Ogbona",
//     designation: "UI/UX Designer",
//     location: "Lagos, Nigeria",
//     joinedDate: "Joined March, 2024",
//     followers: "123k",
//     following: "56",
//     thumbnail: null,
//   },
// };

export default ProfileHero;
