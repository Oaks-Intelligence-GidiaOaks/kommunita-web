import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import more_btn from "../../assets/images/main/more.svg";
import photo_btn from "../../assets/images/main/photo.svg";
import video_btn from "../../assets/images/main/video.svg";
import go_live_btn from "../../assets/images/main/go-live.svg";
import diary from "../../assets/images/main/diary.svg";
import schedule from "../../assets/images/main/schedule.svg";
import draft from "../../assets/images/main/draft.svg";
import { useState } from "react";
import Modals from "../modals/Modal";
import Date from "../../assets/images/modals/date.svg";
import time from "../../assets/images/modals/time.svg";
import globe from "../../assets/images/modals/globe.svg";
import photos from "../../assets/images/modals/photos.svg";
import video from "../../assets/images/modals/video.svg";
import location from "../../assets/images/modals/location.svg";
import left from "../../assets/images/modals/left.svg";
import right from "../../assets/images/modals/right.svg";

function MakePost() {
  const [openDiaryModal, setOpenDiaryModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);

  return (
    <>
      <div className="w-full mt-3 makepost">
        <div className="post-box p-4">
          <div className="post-content w-full">
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
                <button className="hover:shadow-md">
                  <img src={photo_btn} alt="" />
                </button>
                <button className="hover:shadow-md">
                  <img src={video_btn} alt="" />
                </button>
                <button className="hover:shadow-md">
                  <img src={go_live_btn} alt="" />
                </button>
                <button
                  className="hover:shadow-md"
                  onClick={() => setOpenDiaryModal(true)}
                >
                  <img src={diary} alt="" />
                </button>
                <button
                  className="hover:shadow-md"
                  onClick={() => setOpenScheduleModal(true)}
                >
                  <img src={schedule} alt="" />
                </button>

                <button className="hover:shadow-md btn-draft flex">
                  <img src={draft} alt="" />
                  Drafts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modals
        openModal={openDiaryModal}
        modalSize="3xl"
        onClose={() => setOpenDiaryModal(false)}
        btnText="Post Diary"
      >
        <div className="flex justify-between pb-5">
          <p className="pagination">Page 3/4</p>
          <div className="flex gap-3 items-center">
            <button>
              <img src={left} alt="" />
            </button>
            <button>
              <img src={right} alt="" />
            </button>
          </div>
        </div>
        <textarea className="post-box focus:outline-none focus:ring-0 pb-4 flex-wrap"></textarea>
        <div className="flex justify-between pb-5 pt-5">
          <div className="text-add-post">Add to your post</div>
          <div className="post-buttons-add flex gap-3">
            <button className="hover:shadow-lg">
              <img src={photos} alt="" />
            </button>
            <button className="hover:shadow-lg">
              <img src={video} alt="" />
            </button>
            <button className="hover:shadow-lg">
              <img src={location} alt="" />
            </button>
          </div>
        </div>
      </Modals>

      <Modals
        openModal={openScheduleModal}
        modalSize="3xl"
        onClose={() => setOpenScheduleModal(false)}
        btnText="Schedule"
      >
        <textarea className="post-box focus:outline-none focus:ring-0 pb-4 flex-wrap"></textarea>

        <div className="flex justify-between pb-5 pt-5">
          <div className="text-add-post">Add to your post</div>
          <div className="post-buttons-add flex gap-3">
            <button className="hover:shadow-lg">
              <img src={photos} alt="" />
            </button>
            <button className="hover:shadow-lg">
              <img src={video} alt="" />
            </button>
            <button className="hover:shadow-lg">
              <img src={location} alt="" />
            </button>
          </div>
        </div>

        <div className="flex justify-between pb-4">
          <flex className="flex-col">
            <label htmlFor="date" className="modal-label">
              Schedule date
            </label>
            <div className="input-bg-modal flex">
              <img src={Date} alt="" />
              <input
                type="text"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                placeholder="Select date"
              />
            </div>
          </flex>

          <flex className="flex-col">
            <label htmlFor="date" className="modal-label">
              Schedule time
            </label>
            <div className="input-bg-modal flex">
              <img src={time} alt="" />
              <input
                type="text"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                placeholder="Select time"
              />
            </div>
          </flex>
        </div>

        <div className="flex justify-between pb-2">
          <flex className="flex-col">
            <label htmlFor="date" className="modal-label">
              Categories
            </label>
            <div className="input-bg-modal flex">
              <img src={time} alt="" />
              <input
                type="text"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                placeholder="Select Category"
              />
            </div>
          </flex>

          <flex className="flex-col">
            <label htmlFor="date" className="modal-label">
              Choose Audience
            </label>
            <div className="input-bg-modal flex">
              <img src={globe} alt="" />
              <input
                type="text"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                placeholder="Public"
              />
            </div>
          </flex>
        </div>
      </Modals>
    </>
  );
}

export default MakePost;
