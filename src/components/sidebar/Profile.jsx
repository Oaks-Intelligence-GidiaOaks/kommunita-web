import coverImage from "../../assets/images/sidebar/bg-image.svg";
import avatarImage from "../../assets/images/sidebar/avatar-img.svg";
import emoji from "../../assets/images/sidebar/emoji.svg";
import { useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";

function Profile() {
  const { data: profile } = useGetUserProfiileQuery();
  // console.log(profile);

  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center flex-col w-full">
        <img className="w-full " src={coverImage} alt="" />

        <div className="flex justify-center z-10 -mt-5">
          <div className="profile-avatar-img-box flex justify-center items-center] border rounded-full">
            <img
              src={profile?.data?.photo_url}
              width={64}
              height={62}
              alt=""
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <p className="text-center profile-name mt-3">{user?.display_name}</p>
        <p className="text-center profile-title">{profile?.data?.tech_title}</p>
        <div className="flex justify-center">
          <p className="text-center mt-1 profile-bio p-2">
            {/* <p className="text-center mt-1 profile-bio w-[204px]"> */}
            {profile?.data?.about}
            {/* <span className="inline-flex">
            <img src={emoji} alt="" />
          </span> */}
          </p>
        </div>

        <div className="stats flex gap-3 justify-between items-center mt-4">
          <div className="flex flex-col text-center">
            <p className="stats-number text-sm font-semibold">
              {profile?.data?.posts_count}
            </p>
            <p className="stats-title text-sm">Posts</p>
          </div>
          <div className="w-1 h-1 bg-[#3D7100] rounded-full"></div>
          <div className="flex flex-col text-center">
            <p className="stats-number text-sm font-semibold">
              {profile?.data?.followers.length}
            </p>
            <p className="stats-title text-sm">Followers</p>
          </div>
          <div className="w-1 h-1 bg-[#3D7100] rounded-full"></div>

          <div className="flex flex-col text-center">
            <p className="stats-number text-sm font-semibold">
              {profile?.data?.following.length}
            </p>
            <p className="stats-title text-sm">Following</p>
          </div>
        </div>
      </div>
      <div className="px-5 pt-2">
        <p className="text-start flex font-semibold text-[#707070] text-[calc(1rem-6px)] justify-start">ABOUT</p>
        <p className="text-center mt-1 profile-bio p-2">
            {profile?.data?.about}
          </p>
      </div>
    </div>
  );
}

export default Profile;
