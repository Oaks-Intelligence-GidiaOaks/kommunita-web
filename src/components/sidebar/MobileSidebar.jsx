// MobileSidebar.js
import React, { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { dark_logo, placeholder_logo } from "../../assets/images";
import { RiSearch2Line, RiSurveyLine } from "react-icons/ri";
import { useGetUserOrganisationQuery } from "../../service/organization.service";
import DropdownMenu from "../ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { CgPoll } from "react-icons/cg";
import { GoStar } from "react-icons/go";
import { CiLogout, CiMail, CiSearch } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import {
  BOOKMARK,
  MESSAGES,
  PROFILE,
  SETTINGS,
  SURVEY,
  POLLS,
  NOTIFICATION
} from "../../routes/routes";
import { useSelector } from "react-redux";

const MobileSidebar = ({ isOpen, onClick }) => {
  const { data: userOganisation } = useGetUserOrganisationQuery();
  const { data: profile } = useGetUserProfiileQuery();
  const [isOrganisationOpen, setIsOrganisationOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchOrganisation, setSearchOrganisation] = useState("");
  const organisationRef = useRef(null);

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  return (
    <div className="relative md:hidden">
      <div
        className={`fixed inset-0 z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClick}
        ></div>
        <div className="relative w-full bg-white h-full p-5">
          <div className="flex justify-between items-center pb-6 border-b-2">
            <Link to={"/"}>
              <img src={dark_logo} alt="logo" width="152" height="40" />
            </Link>
            <div className="flex gap-2">
              <button onClick={onClick} size={30} className="">
                <CiSearch size={30} className="inline-block" />
              </button>
              <button onClick={onClick} className="text-2xl ">
                <LiaTimesSolid />
              </button>
            </div>
          </div>
          {/* <hr /> */}
          <div className="cursor-pointer w-[60%] flex items-center gap-5 bg-[#efefef] my-10  rounded-[2.5rem] px-[0.5rem]">
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
                      alt="organisation logo"
                    />
                  </span>
                  <p>
                    {profile?.data?.current_organization?.organization_name}
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
                        <RiSearch2Line size={30} className="inline-block" />
                      )}
                    </div>
                    <input
                      type="text"
                      className="search-input w-full focus:outline-none focus:ring-0"
                      placeholder="Search"
                      value={searchOrganisation}
                      onChange={(e) => setSearchOrganisation(e.target.value)}
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

          <ul>
            <li className="flex items-center mb-6 text-[#1B1B1B]">
              <GoStar className="mr-3" />
              <Link to={BOOKMARK} className="text-[#1B1B1B] text-[1rem]">
                Favourites
              </Link>
            </li>

            {features.includes("Poll") && (
              <li className="flex items-center mb-6 text-[#1B1B1B]">
                <CgPoll className="mr-3" />
                <Link to={POLLS} className="text-[#1B1B1B] text-[1rem]">
                  Polls
                </Link>
              </li>
            )}

            {features.includes("Survey") && (
              <li className="flex items-center mb-6 text-[#1B1B1B]">
                <RiSurveyLine className="mr-3" />
                <Link to={SURVEY} className="text-[#1B1B1B] text-[1rem]">
                  Survey
                </Link>
              </li>
            )}

            {features.includes("Direct Messaging") && (
              <li className="flex items-center mb-6 text-[#1B1B1B]">
                <CiMail className="mr-3" />
                <Link to={MESSAGES} className="text-[#1B1B1B] text-[1rem]">
                  Messages
                </Link>
              </li>
            )}

            <li className="flex items-center mb-6 text-[#1B1B1B]">
              <BsBell className="mr-3" />
              <Link to={NOTIFICATION} className="text-[#1B1B1B] text-[1rem]">
                Notifications
              </Link>
            </li>

            <li className="flex items-center mb-6 text-[#1B1B1B]">
              <FaRegUser className="mr-3" />
              <Link to={PROFILE} className="text-[#1B1B1B] text-[1rem]">
                Profile
              </Link>
            </li>

            {features.includes("Account Management") ||
              (features.includes("Self Service") && (
                <li className="flex items-center mb-6 text-[#1B1B1B]">
                  <IoSettingsOutline className="mr-3" />
                  <Link to={SETTINGS} className="text-[#1B1B1B] text-[1rem]">
                    Settings
                  </Link>
                </li>
              ))}

            <li className="flex items-center text-red-600">
              <CiLogout className="mr-3" />
              <span className="text-[#1B1B1B] text-[1rem]">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
