import React, { useEffect, useState } from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileNav from "../../components/profile/ProfileNav";
import MenuItems from "../../components/sidebar/MenuItems";
import { useParams } from "react-router-dom";
import {
  useGetOtherUserProfileMutation,
  useGetUserProfiileQuery,
} from "../../service/user.service";
import { showAlert } from "../../static/alert";
// import Profile from "../../components/sidebar/Profile";
// import MobileProfile from "../../components/mobile/MobileProfile";

const Layout = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const { data } = useGetUserProfiileQuery();
  // console.log(data);
  const [getOtherUserProfile, { isSuccess, isError }] =
    useGetOtherUserProfileMutation();
  const { user_id } = useParams();

  useEffect(() => {
    if (user_id) {
      GetOtherUser();
    } else {
      setProfile(data);
    }
  }, [user_id]);

  const GetOtherUser = async () => {
    try {
      const res = await getOtherUserProfile(user_id);
      setProfile(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user: ", error);
      showAlert("Oops", "An error occurred while fetching user", "error");
    }
  };

  return (
    <div className="bg-[#EFF2FC] overflow-x-hidden h-screen">
      <div className="">
        <ProfileHero />
      </div>
      <div className="mx-auto mt-5 px-4 md:px-8">
        <div className=" pt-5 xl:pt-0 grid grid-cols-12 gap-3">
          {/* <div className=" bg-red-400"> */}
          <div className="col-span-4 lg:col-span-3 xl:col-span-2 max-w-[277px] w-full rounded  hidden lg:block max-h-[auto] overflow-hidden">
            <div className="">
              {profile?.data?.current_organization?.organization_name ? (
                <div className="w-[70%] bg-white flex items-center justify-center">
                  <select className="border-none text-[#34b53a] text-xs">
                    <option className=" " value="">
                      <a
                        href={profile?.data?.current_organization?.website_url}
                        target="_blank"
                      >
                        {profile?.data?.current_organization
                          ?.organization_name && (
                          <p className="flex gap-2 items-center pt-5 text-sm">
                            <img
                              src={
                                profile?.data?.current_organization?.logo_url ||
                                ""
                              }
                              className="w-[24.96px] h-[28.87px]"
                              alt=""
                            />
                            {
                              profile?.data?.current_organization
                                ?.organization_name
                            }
                          </p>
                        )}
                      </a>
                    </option>
                  </select>
                </div>
              ) : (
                <div className="h-[35px] w-[50px]">{""}</div>
              )}
              <div className="bg-[#fff] -mt-2 rounded-lg">
                <MenuItems />
              </div>
            </div>
          </div>
          <div className="col-span-12 overflow-y-auto lg:col-span-9 xl:col-span-10 border-b-primary-dark-gray">
            {/* <ProfileNav /> */}
            {/* {children} */}
            <div className="">
              <div className="-mt-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
