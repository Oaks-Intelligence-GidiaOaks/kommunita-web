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
import { useState } from "react";
import { useSearchGeneralMutation } from "../../service/search.service";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import Modals from "../modals/Modal";
import GeneralSearch from "../search/GeneralSearch";
import { BeatLoader } from "react-spinners";
import { dark_logo, escrow_tech, logo } from "../../assets/images";
import { RiHome5Line } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { LuSquareStack } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BsBell } from "react-icons/bs";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { AiOutlineMenu } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";

const NavItem = ({ to, icon: Icon, label, exact }) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#3D7100]";

  return (
    <Link to={to}>
      <div className="items flex flex-col justify-center items-center w-[70px]">
        <div
          className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
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
  const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
  const [searchedData, setSearchedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const { data: profile } = useGetUserProfiileQuery();

  const handleSearch = async () => {
    setSearching(true);
    if (searchString) {
      const postData = {
        search_term: searchString,
      };
      try {
        const res = await rtkMutation(searchGeneral, { ...postData });
        console.log(res.data);
        setSearchedData(res.data);
        setOpenSearchModal(true);
      } catch (error) {
        console.error("Error making search: ", error);
        showAlert("Oops", "An error occurred while searching content", "error");
      }
    }
    setSearching(false);
  };

  return (
    <nav className="fixed h-auto flex justify-between items-center py-4 px-8 w-full top-0 left-0 right-0 z-10 mb-10 bg-white">
      <div className="logo">
        <Link to={"/"}>
          <img src={dark_logo} alt="logo" width="152" height="40" />
        </Link>
      </div>
      <div className="hidden md:flex items-center lg:space-x-10">
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
          <div className="flex search-box rounded w-[18rem]">
            <div className="cursor-pointer" onClick={handleSearch}>
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
            {/* <div className="flex  "> */}
            <div className="cursor-pointer hidden lg:flex items-center gap-5 bg-[#efefef]  rounded-[2.5rem] p-[0.5rem]">
              <img src={escrow_tech} alt="search" />
              <p>Escrow-Tech</p>
              <IoIosArrowDown size={20} className="text-[#838383]" />
              {/* </div> */}
            </div>
            <BsBell size={20} className="text-[]" />
            <div className="w-[3rem] h-[3rem] flex justify-center items-center] border rounded-full">
              <img
                src={profile?.data?.photo_url}
                alt=""
                className="rounded-full w-full object-cover"
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
      <div className="sm:flex md:hidden gap-4 items-center">
      <RiSearch2Line size={30} />
      <AiOutlineMenu size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
