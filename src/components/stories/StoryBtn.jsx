import { useLocation, useNavigate } from "react-router-dom";
import { create  } from "../../assets/images";
import { useGetStoriesFeedQuery } from "../../service/stories.service";
import { useSelector } from "react-redux";

const StoryBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data,  } = useGetStoriesFeedQuery();
  const user = useSelector((state) => state.user.user.username);
  const isLoggedInUserStory = data?.data?.findIndex((story)=>story.username === user)
  
  if (location.pathname === "/stories/create") {
    return null;
  }

  if (isLoggedInUserStory === -1) {
    return null;
  }

  return (
    <div className="flex flex-col absolute right-10">
    <div
      className="flex flex-col gap-0  bg-white rounded-xl cursor-pointer"
      onClick={() => {
        navigate("/stories/create");
      }}
    >
      <div>
        <img src={create} alt="" />
      </div>
      <div className="bg-white h-36 w-full flex justify-center relative items-center text-center rounded-b-xl">
        Add new story
        <div className="absolute -top-4 w- h- text-3xl flex flex-col items-center justify-center rounded-full bg-white px-2">
          +
        </div>
      </div>
    </div>
    <div className="flex text-white mt-4">
        <span>
        Viewed by 
        </span>
      </div>
    </div>
  );
};

export default StoryBtn;
