import React, { useState, useEffect } from "react";
import SettingsLayout from "../../components/settings/SettingsLayout";
import { useGetUserProfiileQuery } from "../../service/user.service";
import "./style.css";
import edit_line from "../../assets/images/edit_line.svg";

const SettingsHome = () => {
  const { data: profile } = useGetUserProfiileQuery();
  console.log(profile);
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // State variables for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  //- second tab
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    setIsFieldsFilled(!!currentPassword && !!newPassword && !!confirmPassword);
  }, [currentPassword, newPassword, confirmPassword]);

  // State variable for checking if all fields are filled
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  // useEffect to update input field statuses and check if all fields are filled
  useEffect(() => {
    // Check if all fields are filled
    setIsAllFieldsFilled(
      !!username && !!email && !!phoneNumber && !!location && !!bio
    );
  }, [username, email, phoneNumber, location, bio]);

  // Set values once profile data is available
  useEffect(() => {
    if (profile) {
      setUsername(profile.data.username || "");
      setEmail(profile.data.email || "");
      setPhoneNumber(profile.data.phone || "");
      setLocation(
        profile.data.location && Object.keys(profile.data.location).length !== 0
          ? JSON.stringify(profile.data.location)
          : ""
      );
      setBio(profile.data.about || "");
    }
  }, [profile]);

  return (
    <SettingsLayout>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center gap-10"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg tabs ${
                activeTab === "profile"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("profile")}
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === "profile"}
            >
              Profile
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg tabs ${
                activeTab === "dashboard"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("dashboard")}
              role="tab"
              aria-controls="dashboard"
              aria-selected={activeTab === "dashboard"}
            >
              Password & Security
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "profile" ? "" : "hidden"
          }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="pt-5 px-10 pb-20">
            <div className="flex gap-3 items-center mb-5">
              <div>
                <div className="rounded-lg w-[100px] h-[100px] border flex flex-col gap-3 items-center">
                  <img
                    className="object-cover w-[100px]"
                    src={profile?.data?.photo_url}
                    alt=""
                  />
                  <p className="cursor-pointer settings-change-text text-[#398DEE]">
                    Change
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name=""
                      id=""
                    />
                  </p>
                </div>
              </div>
              <div>
                <div className="flex gap-2 pb-1">
                  <p className="settings-profile-name">
                    {profile?.data?.display_name}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </div>
                <p className="flex gap-2">
                  <p className="settings-profile-title">
                    {" "}
                    {profile?.data?.tech_title}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </p>
              </div>
            </div>
            <div className="pt-10">
              <form>
                <div className="flex items-center lg:gap-16 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your username"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your email"}
                    />
                  </div>
                </div>
                <div className="flex items-center lg:gap-16 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Location</label>
                    <input
                      value={location || ""}
                      onChange={(e) => setLocation(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Phone Number</label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your phone number"}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-5 w-full pb-3">
                  <label className="settings-label">Bio</label>
                  <textarea
                    placeholder=""
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="settings-textarea outline-none"
                    cols="30"
                    rows="7"
                  ></textarea>
                </div>
                <button
                  className={`w-full ${
                    isAllFieldsFilled ? "setting-btn-active" : "settings-btn"
                  }`}
                  disabled={!isAllFieldsFilled}
                >
                  Save
                </button>{" "}
              </form>
            </div>
          </div>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "dashboard" ? "" : "hidden"
          }`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <div className="pt-5 px-10 pb-20">
            <div className="flex gap-3 items-center mb-5">
              <div>
                <div className="rounded-lg w-[100px] h-[100px] border flex flex-col gap-3 items-center">
                  <img
                    className="object-cover w-[100px]"
                    src={profile?.data?.photo_url}
                    alt=""
                  />
                  <p className="cursor-pointer settings-change-text text-[#398DEE]">
                    Change
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name=""
                      id=""
                    />
                  </p>
                </div>
              </div>
              <div>
                <div className="flex gap-2 pb-1">
                  <p className="settings-profile-name">
                    {profile?.data?.display_name}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </div>
                <p className="flex gap-2">
                  <p className="settings-profile-title">
                    {" "}
                    {profile?.data?.tech_title}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </p>
              </div>
            </div>
            <div className="pt-10">
              <form>
                <div className="flex items-center lg:gap-16 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Current Password</label>
                    <input
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="settings-input outline-none"
                      type="password"
                      placeholder={"Please enter your current password"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">New Password</label>
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="settings-input outline-none"
                      type="password"
                      placeholder={"Please enter new password"}
                    />
                  </div>
                </div>
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Re-enter Password</label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="settings-input outline-none"
                      type="password"
                      placeholder="Please re-enter Password"
                    />
                  </div>
                </div>
                <button
                  className={`w-full ${
                    isFieldsFilled ? "setting-btn-active" : "settings-btn"
                  }`}
                  disabled={!isFieldsFilled}
                >
                  Save
                </button>{" "}
              </form>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsHome;
