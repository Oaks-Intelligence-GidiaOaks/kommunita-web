import React, { useState } from "react";
import SettingsLayout from "../../components/settings/SettingsLayout";
import { useGetUserProfiileQuery } from "../../service/user.service";

const SettingsHome = () => {
  const { data: profile } = useGetUserProfiileQuery();
  console.log(profile);
  const [username, setUsername] = useState(profile?.data?.username || "");
  const [email, setEmail] = useState(profile?.data?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(profile?.data?.phone || "");
  const [location, setLocation] = useState(profile?.data?.location || "");
  const [bio, setBio] = useState(profile?.data?.bio || "");

  return (
    <SettingsLayout>
      <div className="bg-white p-4">
        <div className="flex gap-2 items-center mb-5">
          <div>
            <div className="rounded-lg w-[100px] h-[100px] overflow-hidden">
              <img
                className="object-cover w-[100px]"
                src={profile?.data?.photo_url}
                alt=""
              />
            </div>
            <p className="cursor-pointer">
              Change
              <input style={{ display: "none" }} type="file" name="" id="" />
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {profile?.data?.display_name}
            </h2>
            <p className="text-sm font-semibold">{profile?.data?.tech_title}</p>
          </div>
        </div>
        <div>
          <form>
            <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between">
              <div className="flex flex-col mb-5 w-full">
                <label className="text-[#4C535F] mb-2 font-semibold text-lg">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none"
                  type="text"
                  placeholder={"Please enter your username"}
                />
              </div>
              <div className="flex flex-col mb-5 w-full">
                <label className="text-[#4C535F] mb-2 font-semibold text-lg">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none"
                  type="text"
                  placeholder={"Please enter your email"}
                />
              </div>
            </div>
            <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between">
              <div className="flex flex-col mb-5 w-full">
                <label className="text-[#4C535F] mb-2 font-semibold text-lg">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none"
                >
                  <option value="" disabled>
                    Please select your location
                  </option>
                  <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                </select>
              </div>
              <div className="flex flex-col mb-5 w-full">
                <label className="text-[#4C535F] mb-2 font-semibold text-lg">
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none"
                  type="text"
                  placeholder={"Please enter your phone number"}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5 w-full">
              <label className="text-[#4C535F] mb-2 font-semibold text-lg">
                Bio
              </label>
              <textarea
                placeholder=""
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none"
                cols="30"
                rows="7"
              ></textarea>
            </div>
            <button className="w-full rounded-lg p-2 bg-[#4C535F] bg-opacity-50 outline-none border-none">
              Save
            </button>
          </form>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsHome;
