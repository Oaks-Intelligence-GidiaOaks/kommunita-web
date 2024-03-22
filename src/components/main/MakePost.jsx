import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import more_btn from "../../assets/images/main/more.svg";
import photo_btn from "../../assets/images/main/photo.svg";
import video_btn from "../../assets/images/main/video.svg";
import go_live_btn from "../../assets/images/main/go-live.svg";
import diary from "../../assets/images/main/diary.svg";
import schedule from "../../assets/images/main/schedule.svg";
import draft from "../../assets/images/main/draft.svg";

function MakePost() {
  return (
    <div className="w-full mt-3 makepost">
      <div className="post-box p-4">
        <div className="post-content">
          <div className="more flex justify-end">
            <button>
              <img src={more_btn} alt="" />
            </button>
          </div>

          <div className="flex pb-4">
            <img src={avatar2} alt="" />
            <input
              type="text"
              className="post-input focus:outline-none focus:ring-0 border-0 w-full text-wrap"
              placeholder="Start a post..."
            />
          </div>
          <div className="flex justify-between pb-2 pt-2">
            <div className="buttons flex flex-row flex-wrap items-center justify-start gap-3">
              <button>
                <img src={photo_btn} alt="" />
              </button>
              <button>
                <img src={video_btn} alt="" />
              </button>
              <button>
                <img src={go_live_btn} alt="" />
              </button>
              <button>
                <img src={diary} alt="" />
              </button>
              <button>
                <img src={schedule} alt="" />
              </button>
              <button className="btn-draft flex">
                <img src={draft} alt="" />
                Drafts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakePost;
