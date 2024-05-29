import React, { useState, useEffect } from "react";
import SettingsLayout from "../../components/settings/SettingsLayout";
import { useGetUserProfiileQuery } from "../../service/user.service";
import "./style.css";
import edit_line from "../../assets/images/edit_line.svg";
import Resizer from "react-image-file-resizer";
import UploadedItem from "../../components/main/UploadedItem";
import axios from "axios";
import { showAlert } from "../../static/alert";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";

import countries from "../../utils/countries.json";

const SettingsHome = () => {
  const { data: profile } = useGetUserProfiileQuery();
  // console.log(profile);
  const [activeTab, setActiveTab] = useState("verification");
  // const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // State variables for form fields
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [techtitle, setTechtitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bio, setBio] = useState("");
  const [states, setStates] = useState([]);

  //- second tab
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);
  const [code, setCode] = useState("");
  const [codeRequested, setCodeRequested] = useState(false);
  // const [selectedImages, setSelectedImages] = useState([]);

  const { refetch } = useGetFeedsQuery();
  const token = useSelector((state) => state.user?.token);

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
      !!username && !!email && !!phoneNumber && !!country && !!state && !!bio
    );
  }, [username, email, phoneNumber, country, state, bio]);

  // Set values once profile data is available
  useEffect(() => {
    if (profile?.data) {
      setUsername(profile?.data.username || "");
      setState(profile?.data.location.state || "");
      setCountry(profile?.data.location.country || "");
      setEmail(profile?.data.email || "");
      setPhoneNumber(profile?.data.phone_number || "");
      // setFullname(profile?.data.fullname || "");
      // setTechtitle(profile?.data.tech_title || "");
      // setLocation(
      //   profile?.data.location && Object.keys(profile?.data.location).length !== 0
      //     ? JSON.stringify(profile?.data.location)
      //     : ""
      // );
      setBio(profile?.data.about || "");
    }
  }, [profile]);

  useEffect(() => {
    countries.map((ct) => {
      if (ct.name === country) {
        setStates(ct.states);
        // console.log(ct.states);
      }
    });
  }, [country]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const location = { country, state };

    const formData = new FormData();
    if (imageFile) {
      formData.append("photo", imageFile);
    }
    if (bio) {
      formData.append("about", bio);
    }

    if (phoneNumber) {
      formData.append("phone_number", phoneNumber);
    }
    if (email) {
      formData.append("email", email);
    }
    if (country && state) {
      formData.append("location", JSON.stringify(location));
    }

    // formData.append("tech_title", techtitle);
    // formData.append("username", username);
    // formData.append("fullname", fullname);

    // console.log(formData);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.patch(`${apiUrl}/user/me`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Profile updated successfully:", response.data);

      showAlert("Great!", "Profile updated successfully", "success");
      refetch();
    } catch (error) {
      console.error("Error updating profile:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!code) {
      requestCode();
      setSubmitting(false);
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
      code,
    };

    if (!data) {
      setSubmitting(false);
      return;
    }
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    try {
      const response = await axios.patch(
        `${apiUrl}/user/settings/password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      console.log("Password updated successfully:", response.data);

      showAlert("Great!", "Password updated successfully", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setCode("");
      refetch();
      // window.location.href = "/";
    } catch (error) {
      console.error("Error updating password:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const requestCode = async (e) => {
    e.preventDefault();
    // setSubmitting(true);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/user/settings/reset-code`, {
        headers: {
          // "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      console.log("Code sent successfully:", response.data);
      showAlert("Great!", "Code has been sent to your mail", "success");
    } catch (error) {
      console.error("Error Getting Code:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // console.log(currentPassword);
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
                    className="object-cover w-[100px] cursor-pointer"
                    src={previewSrc || profile?.data?.photo_url}
                    alt=""
                  />
                  <label className="cursor-pointer settings-change-text text-[#398DEE]">
                    Change
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      // className="hidden w-[100px] h-[100px]"
                    />
                  </label>
                </div>
              </div>
              <div>
                {profile?.data?.display_name && (
                  <div className="flex gap-2 pb-1">
                    <p className="settings-profile-name">
                      {profile?.data?.display_name}
                    </p>
                    <img src={edit_line} alt="" className="cursor-pointer" />
                  </div>
                )}
                {profile?.data?.tech_title && (
                  <div className="flex gap-2">
                    <p className="settings-profile-title">
                      {" "}
                      {profile?.data?.tech_title}
                    </p>
                    <img src={edit_line} alt="" className="cursor-pointer" />
                  </div>
                )}
              </div>
            </div>
            <div className="pt-10 mt-10">
              <form onSubmit={handleSubmit}>
                {/* <div className="flex items-center lg:gap-16 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Full Name</label>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your fullname"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Tech Title</label>
                    <input
                      value={techtitle}
                      onChange={(e) => setTechtitle(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your techtitle"}
                    />
                  </div>
                </div> */}
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      disabled
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
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="settings-input outline-none"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      {countries.map((ct) => (
                        <option>{ct.name}</option>
                      ))}
                    </select>
                    {/* <input
                      value={country || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                    /> */}
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="settings-input outline-none"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states?.map((st) => (
                        <option>{st.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 lg:w-[50%] w-full ">
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
                  {submitting ? (
                    <BeatLoader color="#ffffff" loading={true} />
                  ) : (
                    "Save"
                  )}
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
                    alt=""
                    src={previewSrc || profile?.data?.photo_url}
                  />
                  <label className="cursor-pointer settings-change-text text-[#398DEE]">
                    Change
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      // className="hidden w-[100px] h-[100px]"
                    />
                  </label>
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
            <div className="pt-10 mt-10">
              <form onSubmit={handlePasswordUpdate}>
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
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
                <div className="flex relative items-center lg:gap-10 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full lg:w-[49%]">
                    <label className="settings-label">Re-enter Password</label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="settings-input outline-none"
                      type="password"
                      placeholder="Please re-enter Password"
                    />
                  </div>
                  {/* <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Enter Code</label>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder="Please Enter code"
                    />
                  </div> */}
                  {/* <div
                    onClick={requestCode}
                    className="absolute bottom-0 right-0 bg-primary-dark-green rounded-lg p-1 px-2 text-xs text-white cursor-pointer"
                  >
                    {codeRequested ? "Code sent" : "request code"}
                  </div> */}
                </div>
                <button
                  className={`w-full mt-10 ${
                    isFieldsFilled ? "setting-btn-active" : "settings-btn"
                  }`}
                  disabled={!isFieldsFilled}
                >
                  {submitting ? (
                    <BeatLoader color="#ffffff" loading={true} />
                  ) : (
                    "Confirm"
                  )}
                </button>{" "}
              </form>
            </div>
          </div>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "verification" ? "" : "hidden"
          }`}
          id="verification"
          role="tabpanel"
          aria-labelledby="verification-tab"
        >
          <div className="flex gap-3 items-center mb-5">
            <div>
              <div className="rounded-lg w-[100px] h-[100px] border flex flex-col gap-3 items-center">
                <img
                  className="object-cover w-[100px] cursor-pointer"
                  src={previewSrc || profile?.data?.photo_url}
                  alt=""
                />
                <label className="cursor-pointer settings-change-text text-[#398DEE]">
                  Change
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    // className="hidden w-[100px] h-[100px]"
                  />
                </label>
              </div>
            </div>
            <div>
              {profile?.data?.display_name && (
                <div className="flex gap-2 pb-1">
                  <p className="settings-profile-name">
                    {profile?.data?.display_name}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </div>
              )}
              {profile?.data?.tech_title && (
                <div className="flex gap-2">
                  <p className="settings-profile-title">
                    {" "}
                    {profile?.data?.tech_title}
                  </p>
                  <img src={edit_line} alt="" className="cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="text-primary-gray pt-10 mt-10">
              <h2 className="text-5xl mb-20">Verification</h2>
              <p className="mb-5 mt-10">
                Enter your 4 digits code that you recieved on your email.
              </p>
              <div className="flex flex-col items-center gap-10">
                <div className="w-full flex items-center justify-center mt-10">
                  <InputOTP className="w-full flex items-center" maxLength={6}>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot className="w-[50px] h-[50px]" index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot className="w-[50px] h-[50px]" index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot className="w-[50px] h-[50px]" index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot className="w-[50px] h-[50px]" index={3} />
                    </InputOTPGroup>

                    {/* <InputOTPSeparator /> */}
                  </InputOTP>
                </div>
                <p className="text-red-600">00:30</p>
                <button
                  className={`w-full ${
                    !!code ? "setting-btn-active" : "settings-btn"
                  }`}
                  disabled={!code}
                >
                  {submitting ? (
                    <BeatLoader color="#ffffff" loading={true} />
                  ) : (
                    "Verify"
                  )}
                </button>{" "}
                <p className="text-xs">
                  If you didn't receive a code!{" "}
                  <span
                    onClick={() => requestCode()}
                    className="text-primary-bright-green cursor-pointer font-semibold"
                  >
                    Resend
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsHome;
