import noimage from "../../assets/images/sidebar/avatar4.svg";
import { BeatLoader } from "react-spinners";

const FollowCard = ({follow, following, submitting, onClick}) => {


  return (
    <div className="flex flex-col justify-between overflow-y-auto ">
    <div className="flex justify-between overflow-y-auto items-center gap-3 mb-3 bg-white/50 p-2">
      <div className="flex gap-4">
        <img
          src={follow?.profile_image || noimage}
          className="w-[50.782px] h-[50.726px]"
          alt="avatar"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{follow?.display_name || "Display Name"}</p>
          <p className="text-sm">@{follow?.username || "Username"}</p>
        </div>
      </div>

      {following ? (
        <button
          onClick={onClick}
          className="p-2 border-2 border-primary-bright-green text-primary-bright-green rounded-lg w-[100px] text-center font-semibold px-5"
        >
          {submitting ? (
            <BeatLoader color="#ffffff" loading={true} />
          ) : (
            "Following"
          )}
        </button>
      ) : (
        <button
          onClick={onClick}
          className="p-2 bg-primary--bright-green text-white rounded-lg w-[100px] text-center font-semibold px-5"
        >
          {submitting ? (
            <BeatLoader color="#ffffff" loading={true} />
          ) : (
            "Follow"
          )}
        </button>
      )}
    </div>
    </div>
  );
};

export default FollowCard;
