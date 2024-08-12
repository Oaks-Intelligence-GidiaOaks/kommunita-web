import React from "react";
import "../main/style.css";
import Story from "../main/Story";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetDiaryQuery } from "../../service/diary.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import search from "../../assets/images/Home/Search.png";
import { Spinner } from "flowbite-react";
import StoryList from "../ui/StoryList";
import NewPost2 from "../posts/NewPost2";
import Diary from "./Diary";

function DiaryMain() {
  const { data, isLoading } = useGetDiaryQuery();

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  const posts = data?.data || [];


  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <StoryList />

      {
        !posts?.length ? (
          <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" />
          <h2 className="font-semibold text-3xl mt-5 ml-5">No Diaries feeds</h2>
        </div>
        ) : ( 
          posts?.map((diary)=>(
            <Diary key={diary?._id} post={diary} />
          ))
        )
        }
    </div>
  );
}

export default DiaryMain;
