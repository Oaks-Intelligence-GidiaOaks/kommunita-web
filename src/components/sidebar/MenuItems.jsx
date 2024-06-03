import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import home from "../../assets/images/sidebar/home.svg";
import notifications from "../../assets/images/sidebar/notifications.svg";
import favorite from "../../assets/images/sidebar/favorite.svg";
import play from "../../assets/images/sidebar/play.svg";
import live from "../../assets/images/sidebar/live.svg";
import mail from "../../assets/images/sidebar/mail.svg";
import diaries from "../../assets/images/sidebar/diaries.svg";
import profileIcon from "../../assets/images/sidebar/profile.svg";
import settings from "../../assets/images/sidebar/settings.svg";
import logout from "../../assets/images/sidebar/logout.svg";
import logo from "../../assets/images/sidebar/oaks-logo.svg";
import small_logo from "../../assets/images/sidebar/small-logo.svg";

// active icons
import homeActive from "../../assets/images/sidebar/homeActive.svg";
import notificationsActive from "../../assets/images/sidebar/notificationsActive.svg";
import playActive from "../../assets/images/sidebar/playActive.svg";
import mailActive from "../../assets/images/sidebar/mailActive.svg";
import diariesActive from "../../assets/images/sidebar/diariesActive.svg";
import profileActive from "../../assets/images/sidebar/profileActive.svg";
import settingsActive from "../../assets/images/sidebar/settingsActive.svg";
import favoriteActive from "../../assets/images/sidebar/favoriteActive.svg";
import liveActive from "../../assets/images/sidebar/liveActive.svg";
import { handleLogout } from "../../static/logout";
import { useDispatch } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";

function MenuItems() {
  const { data: profile } = useGetUserProfiileQuery();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  const links = useMemo(
    () => [
      { id: 1, icon: home, activeIcon: homeActive, text: "Home", to: "/" },
      {
        id: 2,
        icon: notifications,
        activeIcon: notificationsActive,
        text: "Notifications",
        to: "/notifications",
      },
      // {
      //   id: 3,
      //   icon: favorite,
      //   activeIcon: favoriteActive,
      //   text: "Favourites",
      //   to: "/favorites",
      // },
      // {
      //   id: 4,
      //   icon: play,
      //   activeIcon: playActive,
      //   text: "Start a post",
      //   to: "/post",
      // },
      // { id: 5, icon: live, activeIcon: liveActive, text: "Live", to: "/live" },
      {
        id: 6,
        icon: mail,
        activeIcon: mailActive,
        text: "Direct Messages",
        to: "/messages",
      },
      // {
      //   id: 7,
      //   icon: diaries,
      //   activeIcon: diariesActive,
      //   text: "My Diary",
      //   to: "/diary",
      // },
      {
        id: 8,
        icon: profileIcon,
        activeIcon: profileActive,
        text: "Profile",
        to: "/profile",
      },
      {
        id: 9,
        icon: settings,
        activeIcon: settingsActive,
        text: "Settings",
        to: "/settings",
      },
    ],
    []
  );

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
      <div className="px-5">
        {links.map(({ id, icon, activeIcon, text, to }) => (
          <NavLink
            key={id}
            to={to}
            className="flex items-center justify-between py-3 menu-items"
            activeclassname="active"
            onMouseEnter={() => setActiveLink(id)}
            onMouseLeave={() => {
              const activeMenu = links.find(
                (item) => item.to === location.pathname
              );
              if (activeMenu) {
                setActiveLink(activeMenu.id);
              } else {
                setActiveLink(null);
              }
            }}
          >
            <div className="flex items-center">
              <img
                src={activeLink === id ? activeIcon : icon}
                alt={text}
                className="mr-2"
              />
              <span className={activeLink === id ? "active" : ""}>{text}</span>
            </div>
          </NavLink>
        ))}

        <button
          className="logout-btn flex justify-between gap-3 items-center mt-3"
          onClick={() => Logout()}
        >
          <img src={logout} alt="logout" /> Log out
        </button>
        <a
          href={profile?.data?.current_organization?.website_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {profile?.data?.current_organization?.organization_name && (
            <p className="flex gap-2 items-center oaks-text pt-5 text-sm">
              <img
                src={
                  profile?.data?.current_organization?.logo_url || small_logo
                }
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
