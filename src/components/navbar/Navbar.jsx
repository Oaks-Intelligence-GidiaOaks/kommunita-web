// import { Link } from "react-router-dom";
// import search from "../../assets/images/menu/search.svg";
// import "./style.css";
// import { useState } from "react";
// import { useSearchGeneralMutation } from "../../service/search.service";
// import rtkMutation from "../../utils/rtkMutation";
// import { showAlert } from "../../static/alert";
// import Modals from "../modals/Modal";
// import GeneralSearch from "../search/GeneralSearch";
// import { BeatLoader } from "react-spinners";
// import { logo } from "../../assets/images";
// import { RiHome5Line } from "react-icons/ri";
// import { TbUsersGroup } from "react-icons/tb";
// import { LuSquareStack } from "react-icons/lu";
// import { MdOutlineLibraryBooks } from "react-icons/md";

// const Navbar = () => {
//   const currentPath = window.location.pathname;
//   const [openSearchModal, setOpenSearchModal] = useState(false);
//   const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
//   const [searchedData, setSearchedData] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [searchString, setSearchString] = useState("");
//   const nAL = "pt-1 pb-2";
//   const aL = nAL + " text-[#3D7100]";

//   const handleSearch = async () => {
//     setSearching(true);
//     // console.log(searchString);
//     if (searchString) {
//       const postData = {
//         search_term: searchString,
//       };
//       try {
//         const res = await rtkMutation(searchGeneral, { ...postData });
//         console.log(res.data);
//         setSearchedData(res.data);
//         setOpenSearchModal(true);
//       } catch (error) {
//         console.error("Error making search: ", error);
//         showAlert("Oops", "An error occurred while searching content", "error");
//       }
//     }
//     setSearching(false);
//   };

//   return (
//     <nav className="fixed h-auto flex justify-between items-center p-4 w-full top-0 left-0 right-0 z-10 mb-10 bg-whit">
//       <div className="logo">
//         <Link to={"/"}>
//           <img src={logo} alt="" width="152" height="40" />
//         </Link>
//       </div>
//       <div className="flex lg:space-x-10">
//         <Link to="/">
//           <div className="items flex flex-col justify-center items-center w-[70px]">
//             <div
//               className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
//                 currentPath !== "/explore" && currentPath !== "/diary"
//                   ? "text-[#3D7100]"
//                   : ""
//               } `}
//             >
//               <RiHome5Line className="" size={20}/>
//               {/* <img src={home} alt="feeds" /> */}
//               {/* <img src={feeds} alt="feeds" /> */}
//             </div>
//             <p
//               className={
//                 currentPath !== "/explore" && currentPath !== "/diary"
//                   ? aL
//                   : nAL
//               }
//             >
//               My Feed
//             </p>
//             {currentPath !== "/explore" && currentPath !== "/diary" && (
//               <div className="active-border"></div>
//             )}
//           </div>
//         </Link>

//         <Link to="/community">
//           <div className="items flex flex-col justify-center items-center w-[70px]">
//             <div
//               className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
//                 currentPath === "/community" && currentPath !== "/diary"
//                   ? "text-[#3D7100]"
//                   : ""
//               } `}
//             >
//             <TbUsersGroup  className="" size={20}/>
//             </div>
//             <p className={currentPath === "/community" ? aL : nAL}>Community</p>
//             {currentPath === "/community" && (
//               <div className="active-border"></div>
//             )}
//           </div>
//         </Link>
//         <Link to="/explore">
//           <div className="items flex flex-col justify-center items-center w-[70px]">
//             <div
//               className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
//                 currentPath === "/explore" && currentPath !== "/diary"
//                   ? "text-[#3D7100]"
//                   : ""
//               } `}
//             >
//               <LuSquareStack size={20} style={{transform:"rotate(90deg)"}}/>
//               {/* <img src={explore} alt="explore" /> */}
//             </div>
//             <p className={currentPath === "/explore" ? aL : nAL}>Explore</p>
//             {currentPath === "/explore" && (
//               <div className="active-border"></div>
//             )}
//           </div>
//         </Link>

//         <Link to="/diary">
//           <div className="items flex flex-col justify-center items-center w-[70px]">
//             <div
//               className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
//                 currentPath !== "/explore" && currentPath === "/diary"
//                   ? "bg-[#3D7100]"
//                   : ""
//               } `}
//             >
//               <MdOutlineLibraryBooks size={20} style={{transform:"rotate(45deg)"}} />
//               {/* <img src={diaries} alt="diaries" /> */}
//             </div>
//             <p className={currentPath === "/diary" ? aL : nAL}>Diaries</p>
//             {currentPath === "/diary" && <div className="active-border"></div>}
//           </div>
//         </Link>
//       </div>

//       <div className="search">
//         <div className="flex search-box w-[220px] md:w-[300px] lg:w-[331px]">
//           <input
//             type="text"
//             className="search-input w-full focus:outline-none focus:ring-0 "
//             placeholder="Search"
//             value={searchString}
//             onChange={(e) => setSearchString(e.target.value)}
//           />
//           <div className="cursor-pointer" onClick={handleSearch}>
//             {searching ? (
//               <BeatLoader color="#ffffff" loading={true} />
//             ) : (
//               <img src={search} alt="" />
//             )}
//           </div>
//         </div>
//       </div>
//       {openSearchModal && (
//         <Modals
//           title={searchString}
//           openModal={openSearchModal}
//           modalSize="2xl"
//           onClose={() => setOpenSearchModal(false)}
//         >
//           <GeneralSearch data={searchedData} />
//         </Modals>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import search from "../../assets/images/menu/search.svg";
import "./style.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchGeneralMutation } from "../../service/search.service";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import Modals from "../modals/Modal";
import GeneralSearch from "../search/GeneralSearch";
import { BeatLoader } from "react-spinners";
import {
  dark_logo,
  escrow_tech,
  logo,
  placeholder_logo,
  profile_placeholder,
} from "../../assets/images";
import { RiHome5Line } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { LuSquareStack } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BsBell } from "react-icons/bs";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { AiOutlineMenu } from "react-icons/ai";
import DropdownMenu from "../ui/DropdownMenu";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout, CiSearch } from "react-icons/ci";
import { useGetUserOrganisationQuery } from "../../service/organization.service";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../static/logout";
import { PROFILE } from "../../routes/routes";
import NotificationModal from "../../pages/notifications/NotificationModal";
import MobileSidebar from "../sidebar/MobileSidebar";

const NavItem = ({ to, icon: Icon, label, exact }) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#3D7100]";

  return (
    <Link to={to}>
      <div className="items flex flex-col justify-center items-center lg:w-16  ">
        <div
          className={`flex justify-center items-center h-[28.327px] lg:w-[20px] xl:w-[28.327px] rounded-full ${
            isActive ? "text-[#3D7100]" : ""
          }`}
        >
          <Icon size={20} />
        </div>
        <p className={isActive ? aL : nAL}>{label}</p>
        {isActive && <div className="active-border"></div>}
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchOnSmallScreen, setSearchOnSmallScreen] = useState(false);
  const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
  const [searchedData, setSearchedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [isOrganisationOpen, setIsOrganisationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationBox, setNotificationBox] = useState(false);
  const organisationRef = useRef(null);
  const profileRef = useRef(null);
  const [searchString, setSearchString] = useState("");
  const [searchOrganisation, setSearchOrganisation] = useState("");
  const { data: profile } = useGetUserProfiileQuery();
  const { data: userOganisation } = useGetUserOrganisationQuery();

  const dispatch = useDispatch();

  const Logout = () => {
    handleLogout(dispatch);
  };

  const handleSearch = async () => {
    // setSearching(true);
    // if (searchString) {
    //   const postData = {
    //     search_term: searchString,
    //   };
    //   try {
    //     const res = await rtkMutation(searchGeneral, { ...postData });
    //     console.log(res.data);
    //     setSearchedData(res.data);
    //     setOpenSearchModal(true);
    //   } catch (error) {
    //     console.error("Error making search: ", error);
    //     showAlert("Oops", "An error occurred while searching content", "error");
    //   }
    // }
    // setSearching(false);
    console.log("saerch organisation");
  };

  const debouncedSearch = useRef(
    debounce(async (searchTerm) => {
      setSearching(true);
      const postData = { search_term: searchTerm };
      try {
        const res = await rtkMutation(searchGeneral, { ...postData });
        console.log(res.data);
        setSearchedData(res.data);
        setOpenSearchModal(true);
      } catch (error) {
        console.error("Error making search: ", error);
        showAlert("Oops", "An error occurred while searching content", "error");
      }
      setSearching(false);
    }, 2000)
  ).current;

  useEffect(() => {
    if (searchString) {
      debouncedSearch(searchString);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchString, debouncedSearch]);

  // console.log(userOganisation?.data)

  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed h-auto flex justify- items-center py-4 px-4 md:px-0 lg:px-12 w-full top-0 left-0 right-0 z-10 mb-10 bg-white">
        <div className="mr-auto">
          <Link to={"/"}>
            <img src={dark_logo} alt="logo" width="152" height="40" />
          </Link>
        </div>
        <div className="hidden md:flex items-center md:space-x-5  xl:space-x-12">
          <NavItem to="/" icon={RiHome5Line} label="My Feed" exact={true} />
          <NavItem
            to="/community"
            icon={TbUsersGroup}
            label="Community"
            exact={true}
          />
          <NavItem
            to="/explore"
            icon={LuSquareStack}
            label="Explore"
            exact={true}
          />
          <NavItem
            to="/diary"
            icon={MdOutlineLibraryBooks}
            label="Diaries"
            exact={true}
          />
          <div className="search flex items-center gap-10">
            <div className="hidden xl:flex search-box rounded lg:w-[15rem] xl:w-[18rem]">
              <div
                className="cursor-pointer"
                onClick={() => debouncedSearch(searchString)}
              >
                {searching ? (
                  <BeatLoader color="#ffffff" loading={true} />
                ) : (
                  <img src={search} alt="search" />
                )}
              </div>
              <input
                type="text"
                className="search-input w-full focus:outline-none focus:ring-0"
                placeholder="Search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
            </div>
            <div className="search flex gap-5 items-center">
              <div className="cursor-pointer flex items-center gap-5 bg-[#efefef]  rounded-[2.5rem] px-[0.5rem]">
                <DropdownMenu
                  dropdownRef={organisationRef}
                  aria_label={"organisation"}
                  onClick={() => {
                    setIsOrganisationOpen(!isOrganisationOpen);
                  }}
                  display_value={
                    <>
                      <span className="w-6 h-6 rounded-full">
                        <img
                          src={profile?.data?.current_organization?.logo_url}
                          alt="l"
                        />
                      </span>
                      <p>
                        {profile?.data?.current_organization?.organization_name.slice(
                          0,
                          10
                        )}
                        ...
                      </p>
                      <IoIosArrowDown size={20} className="text-[#838383]" />
                    </>
                  }
                  isDropdownOpen={isOrganisationOpen}
                  listItem={
                    <div className="px-4 py-5">
                      <div className="flex search-box rounded w-full">
                        <div className="cursor-pointer">
                          {searching ? (
                            <BeatLoader color="#ffffff" loading={true} />
                          ) : (
                            <img src={search} alt="search" />
                          )}
                        </div>
                        <input
                          type="text"
                          className="search-input w-full focus:outline-none focus:ring-0"
                          placeholder="Search"
                          value={searchOrganisation}
                          onChange={(e) =>
                            setSearchOrganisation(e.target.value)
                          }
                        />
                      </div>
                      {/* Organisations list goes here */}
                      <ul className="w-full mt-3">
                        {userOganisation?.data?.map((org) => (
                          <li key={org._id} className="w-full border-b">
                            <Link
                              to={`#`}
                              className="py-2 w-full flex items-center gap-2"
                            >
                              {/* <Link to={`/dashboard/organisation/${org.id}`}> */}
                              <span className="w-6 h-6 rounded-full">
                                <img
                                  src={org?.logo_url || placeholder_logo}
                                  alt={org?.organization_name}
                                  className="w-full"
                                />
                              </span>
                              {org?.organization_name}
                            </Link>
                          </li>
                        )) || <p>No Organisations found</p>}
                      </ul>
                    </div>
                  }
                />
              </div>
              <div>
                <BsBell
                  size={20}
                  className="inline-block"
                  onClick={() => {
                    setNotificationBox((prev) => !prev);
                  }}
                />
                <CiSearch
                  size={30}
                  className="inline-block xl:hidden"
                  onClick={() => {
                    setSearchOnSmallScreen(!searchOnSmallScreen);
                    console.log("clicked me");
                  }}
                />
                {searchOnSmallScreen && (
                  <Modals
                    title={searchString}
                    openModal={searchOnSmallScreen}
                    modalSize="2xl"
                    onClose={() => setSearchOnSmallScreen(!searchOnSmallScreen)}
                  >
                    <div className="flex search-box rounded w-full">
                      <div
                        className="cursor-pointer"
                        onClick={() => debouncedSearch(searchString)}
                      >
                        {searching ? (
                          <BeatLoader color="#ffffff" loading={true} />
                        ) : (
                          <img src={search} alt="search" />
                        )}
                      </div>
                      <input
                        type="text"
                        className="search-input w-full focus:outline-none focus:ring-0"
                        placeholder="Search"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                      />
                    </div>
                  </Modals>
                )}

                {notificationBox && (
                  <NotificationModal
                    onClick={() => {
                      setNotificationBox(!notificationBox);
                    }}
                  />
                )}
              </div>
              <div className="w-[3rem] h-[3rem] flex justify-center items-center border rounded-full">
                <DropdownMenu
                  aria_label={"Profile"}
                  dropdownRef={profileRef}
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  display_value={
                    <>
                      <img
                        src={profile?.data?.photo_url || profile_placeholder}
                        alt=""
                        className="rounded-full w-full object-cover"
                      />
                    </>
                  }
                  isDropdownOpen={isProfileOpen}
                  listItem={
                    <>
                      <Link
                        to={PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setIsProfileOpen(false);
                        }}
                      >
                        <FaRegUser className="w-4 h-4 mr-2 inline" />
                        Profile
                      </Link>
                      <Link
                        to={"/settings"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setIsProfileOpen(false);
                        }}
                      >
                        <IoSettingsOutline className="w-4 h-4 mr-2 inline" />
                        Settings
                      </Link>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => Logout()}
                      >
                        <CiLogout className="w-4 h-4 mr-2 inline" />
                        Logout
                      </button>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {openSearchModal && (
          <Modals
            title={searchString}
            openModal={openSearchModal}
            modalSize="2xl"
            onClose={() => setOpenSearchModal(false)}
          >
            <GeneralSearch data={searchedData} />
          </Modals>
        )}
        <div className="sm:flex md:hidden gap- items-center">
          <CiSearch size={30} className="inline-block"   onClick={() => {
                    setSearchOnSmallScreen(!searchOnSmallScreen);
                    console.log("clicked me");
                  }} />
          <AiOutlineMenu
            size={30}
            className="inline-block"
            onClick={toggleMobileSidebar}
          />
        </div>
      </nav>
      {isOpen && (
        <MobileSidebar onClick={toggleMobileSidebar} isOpen={isOpen} />
      )}
    </>
  );
};

export default Navbar;
