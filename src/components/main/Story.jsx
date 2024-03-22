import liveText from "../../assets/images/main/live.svg";
import liveBtn from "../../assets/images/main/live-btn.svg";
import story1 from "../../assets/images/main/story1.svg";
import story2 from "../../assets/images/main/story2.svg";
import story3 from "../../assets/images/main/story3.svg";
import story4 from "../../assets/images/main/story4.svg";

function Story() {
  return (
    <div className="stories flex justify-start gap-2 items-center w-full">
      <div className="go-live flex flex-col justify-center items-center">
        <p className="go-live-text pb-1">Go live</p>
        <button className="w-[26.753px] h-[26.753px]">
          <img src={liveBtn} alt="liveBtn" />
        </button>
      </div>
      <div className="story-cards relative">
        <img src={story1} alt="story" className="w-[91.276px] h-[110px]" />
        <div className="absolute top-0 right-0 z-20 mr-1 -mt-3">
          <img src={liveText} />
        </div>
        <p className="story-name absolute bottom-0 left-0 z-20 ml-2 mb-1">
          Sherrilyn Kenyon
        </p>
      </div>

      <div className="story-cards relative">
        <img src={story2} alt="story" className="w-[91.276px] h-[110px]" />
        <div className="absolute top-0 right-0 z-20 mr-1 -mt-3">
          <img src={liveText} />
        </div>
        <p className="story-name absolute bottom-0 left-0 z-20 ml-2 mb-1">
          Edgar Poe
        </p>
      </div>

      <div className="story-cards relative">
        <img src={story3} alt="story" className="w-[91.276px] h-[110px]" />
        <div className="absolute top-0 right-0 z-20 mr-1 -mt-3">
          <img src={liveText} />
        </div>
        <p className="story-name absolute bottom-0 left-0 z-20 ml-2 mb-1">
          Nora Roberts
        </p>
      </div>

      <div className="story-cards relative">
        <img src={story4} alt="story" className="w-[91.276px] h-[110px]" />
        <div className="absolute top-0 right-0 z-20 mr-1 -mt-3">
          <img src={liveText} />
        </div>
        <p className="story-name absolute bottom-0 left-0 z-20 ml-2 mb-1">
          Charles Dickens
        </p>
      </div>
    </div>
  );
}

export default Story;
