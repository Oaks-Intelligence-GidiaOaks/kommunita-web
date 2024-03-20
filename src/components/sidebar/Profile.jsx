import coverImage from "../../assets/images/sidebar/bg-image.svg";
import avatarImage from "../../assets/images/sidebar/avatar-img.svg";
import emoji from "../../assets/images/sidebar/emoji.svg";

function Profile() {
  return (
    <div className="mt-3">
      <img src={coverImage} alt="" />

      <div className="flex justify-center z-10 -mt-5">
        <div className="profile-avatar-img-box flex justify-center items-center">
          <img src={avatarImage} width={64} height={62} alt="" />
        </div>
      </div>
      <p className="text-center profile-name mt-3">Godspower Ogbonna</p>
      <p className="text-center profile-title">UI/UX Designer</p>
      <div className="flex justify-center">
        <p className="text-center mt-1 profile-bio w-[204px]">
          I want to redesign the world but I want everyone to go out of it for a
          while{" "}
          <span className="inline-flex">
            <img src={emoji} alt="" />
          </span>
        </p>
      </div>

      <div className="stats flex gap-3 justify-center items-center mt-4">
        <div className="flex flex-col">
          <p className="stats-number">123</p>
          <p className="stats-title">Posts</p>
        </div>
        <div className="w-[1px] h-[26px] bg-[#D9D9D9]"></div>
        <div className="flex flex-col">
          <p className="stats-number">123k</p>
          <p className="stats-title">Followers</p>
        </div>
        <div className="w-[1px] h-[26px] bg-[#D9D9D9]"></div>
        <div className="flex flex-col">
          <p className="stats-number">56</p>
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
