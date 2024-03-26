import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar3 from "../../assets/images/sidebar/avatar3.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import actions from "../../assets/images/sidebar/action.svg";
import actionPlus from "../../assets/images/sidebar/action-plus.svg";

function Likes() {
  return (
    <div className="main-sidebar-section mt-8 pb-5 w-80">
      <div className="py-3 px-4">
        <p className="text-like mb-4">You might like</p>

        <div className="lists mb-5 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-4">
              <img
                src={avatar1}
                className="w-[33.782px] h-[32.726px]"
                alt="avatar"
              />
              <div className="flex flex-col">
                <p className="names">Ava Gregoraci</p>
                <p className="usernames">@ava_gregoraci</p>
              </div>
            </div>

            <button>
              <img src={actions} alt="" />
            </button>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-4">
              <img
                src={avatar2}
                className="w-[33.782px] h-[32.726px]"
                alt="avatar"
              />
              <div className="flex flex-col">
                <p className="names">Ava Gregoraci</p>
                <p className="usernames">@ava_gregoraci</p>
              </div>
            </div>

            <button>
              <img src={actions} alt="" />
            </button>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-4">
              <img
                src={avatar3}
                className="w-[33.782px] h-[32.726px]"
                alt="avatar"
              />
              <div className="flex flex-col">
                <p className="names">Ava Gregoraci</p>
                <p className="usernames">@ava_gregoraci</p>
              </div>
            </div>

            <button>
              <img src={actionPlus} alt="" />
            </button>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-4">
              <img
                src={avatar4}
                className="w-[33.782px] h-[32.726px]"
                alt="avatar"
              />
              <div className="flex flex-col">
                <p className="names">Ava Gregoraci</p>
                <p className="usernames">@ava_gregoraci</p>
              </div>
            </div>

            <button>
              <img src={actions} alt="" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="view-likes">View more</button>
        </div>
      </div>
    </div>
  );
}

export default Likes;
