import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import logout from "../../assets/images/sidebar/logout.svg";
import { RiHome5Line } from "react-icons/ri";
import { GoStar } from "react-icons/go";
import { CgPoll } from "react-icons/cg";
import { RiSurveyLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";

// active icons
import homeActive from "../../assets/images/sidebar/homeActive.svg";
import notificationsActive from "../../assets/images/sidebar/notificationsActive.svg";
import mailActive from "../../assets/images/sidebar/mailActive.svg";
import profileActive from "../../assets/images/sidebar/profileActive.svg";
import settingsActive from "../../assets/images/sidebar/settingsActive.svg";
import favoriteActive from "../../assets/images/sidebar/favoriteActive.svg";
import { handleLogout } from "../../static/logout";
import {
  // useGetAUserProfileQuery,
  useGetUserProfiileQuery
} from "../../service/user.service";
import { backToOak } from "../../assets/images";
import { MdOutlineLibraryBooks, MdOutlineSettings } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

function MenuItems() {
  const { data: profile } = useGetUserProfiileQuery();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  const login_user_id = useSelector((state) => state.user?.user?._id);

  const links = useMemo(
    () => [
      {
        id: 1,
        icon: <RiHome5Line />,
        activeIcon: homeActive,
        text: "Home",
        to: "/",
        feature: ""
      },
      {
        id: 2,
        icon: <GoStar />,
        activeIcon: notificationsActive,
        text: "Favourites",
        to: "/bookmarks",
        feature: ""
      },
      {
        id: 3,
        icon: <CgPoll />,
        activeIcon: favoriteActive,
        text: "Polls",
        to: "/polls",
        feature: "Poll"
      },
      {
        id: 8,
        icon: <RiSurveyLine />,
        activeIcon: profileActive,
        text: "Survey",
        to: "/survey",
        feature: "Survey"
      },
      {
        id: 6,
        icon: <CiMail />,
        activeIcon: mailActive,
        text: "Messages",
        to: "/messages",
        feature: "Direct Messaging"
      },
      //  IF PROFILE IS LOGGED IN USER PROFILE
      // ...(login_user_id === profile?.data._id &&
      // location.pathname === "/profile"
      //   ? [
      //       {
      //         id: 4,
      //         icon: <MdOutlineLibraryBooks />,
      //         activeIcon: settingsActive,
      //         text: "My Diary",
      //         to: "/diary",
              feature: "Diary"
      //       },
      //       {
      //         id: 5,
      //         icon: <AiOutlineUser />,
      //         activeIcon: settingsActive,
      //         text: "Profile",
      //         to: "/profile",
              feature: ["Self Service", "Account Management"]
      //       },
      //       {
      //         id: 11,
      //         icon: <MdOutlineSettings />,
      //         activeIcon: settingsActive,
      //         text: "Settings",
      //         to: "/settings",
              feature: ["Self Service", "Account Management"]
      //       }
      //     ]
      //   : [])
    ],
    [login_user_id, profile?.data._id, location.pathname]
  );

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  console.log(features);

  const filteredItems = links.filter((item) => {
    if (item.feature) {
      if (Array.isArray(item.feature)) {
        const hasFeature = item.feature.some((feature) =>
          features.includes(feature)
        );
        if (!hasFeature) return false;
      } else {
        if (!features.includes(item.feature)) return false;
      }
    }

    return true;
  });

  useEffect(() => {
    const activeLinkIndex = links.findIndex(
      (link) => link.to === location.pathname
    );
    if (activeLinkIndex !== -1) {
      setActiveLink(links[activeLinkIndex].id);
    }
  }, [location.pathname, links]);

  const dispatch = useDispatch();

  const Logout = () => {
    handleLogout(dispatch);
  };

  return (
    <div className="mt-5 pb-5 w-full">
      <div className="px-1 xl:px-5">
        {filteredItems?.map(({ id, icon, text, to }) => (
          <NavLink
            key={id}
            to={to}
            className="flex items-center justify-between py-3 menu-items"
            activeclassname="active"
            onMouseEnter={() => setActiveLink(id)}
            onMouseLeave={() => {
              const activeMenu = links?.find(
                (item) => item?.to === location.pathname
              );
              if (activeMenu) {
                setActiveLink(activeMenu.id);
              } else {
                setActiveLink(null);
              }
            }}
          >
            <div className="flex gap-5 items-center">
              <span className={activeLink === id ? "text-[#3D7100]" : ""}>
                {icon}
              </span>
              <span className={activeLink === id ? "active" : ""}>{text}</span>
            </div>
          </NavLink>
        ))}

        {login_user_id === profile?.data._id &&
          location.pathname === "/profile" && (
            <button
              className="logout-btn flex justify-between gap-3 items-center mt-3"
              onClick={() => Logout()}
            >
              <img src={logout} alt="logout" /> Log out
            </button>
          )}
        <a
          href={profile?.data?.current_organization?.website_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {profile?.data?.current_organization?.organization_name && (
            <p className="flex gap-2 items-center text-[#3160A5] oaks-text pt-5 text-sm">
              <img
                src={profile?.data?.current_organization?.logo_url || backToOak}
                className="w-[24.96px] h-[28.87px]"
                alt=""
              />{" "}
              Back to {profile?.data?.current_organization?.organization_name}
            </p>
          )}
        </a>
      </div>
    </div>
  );
}

export default MenuItems;
