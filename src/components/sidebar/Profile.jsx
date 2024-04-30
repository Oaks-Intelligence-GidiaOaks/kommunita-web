import coverImage from "../../assets/images/sidebar/bg-image.svg";
import avatarImage from "../../assets/images/sidebar/avatar-img.svg";
import emoji from "../../assets/images/sidebar/emoji.svg";
import { useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";

function Profile() {
  const { data: profile } = useGetUserProfiileQuery();
  console.log(profile);

  const user = useSelector((state) => state.user.user);

  return (
    <div className="mt-3 flex items-center flex-col w-full">
      <img className="w-[100%] lg:w-auto " src={coverImage} alt="" />

      <div className="flex justify-center z-10 -mt-5">
        <div className="profile-avatar-img-box flex justify-center items-center">
          <img src={profile?.data?.photo_url} width={64} height={62} alt="" />
        </div>
      </div>
      <p className="text-center profile-name mt-3">{user.display_name}</p>
      <p className="text-center profile-title">{profile?.data?.tech_title}</p>
      <div className="flex justify-center">
        <p className="text-center mt-1 profile-bio p-2">
          {/* <p className="text-center mt-1 profile-bio w-[204px]"> */}
          {profile?.data?.about}{" "}
          <span className="inline-flex">
            <img src={emoji} alt="" />
          </span>
        </p>
      </div>

      <div className="stats flex gap-3 justify-center items-center mt-4">
        <div className="flex flex-col">
          <p className="stats-number">{profile?.data?.posts_count}</p>
          <p className="stats-title">Posts</p>
        </div>
        <div className="w-[1px] h-[26px] bg-[#D9D9D9]"></div>
        <div className="flex flex-col">
          <p className="stats-number">{profile?.data?.followers.length}</p>
          <p className="stats-title">Followers</p>
        </div>
        <div className="w-[1px] h-[26px] bg-[#D9D9D9]"></div>
        <div className="flex flex-col">
          <p className="stats-number">{profile?.data?.following.length}</p>
          <p className="stats-title">Following</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="w-[222px] h-[1px] bg-[#D9D9D9]"></div>
      </div>
    </div>
  );
}

export default Profile;
