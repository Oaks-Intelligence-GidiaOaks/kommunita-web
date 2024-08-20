import { useState, useRef, useEffect } from "react";
import Modals from "../modals/Modal";
import Date from "../../assets/images/modals/date.svg";
import time from "../../assets/images/modals/time.svg";
import globe from "../../assets/images/modals/globe.svg";
import { FaTimes } from "react-icons/fa";

import { BiWorld, BiLock, BiGroup } from "react-icons/bi";
import UploadedItem from "./UploadedItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import { useGetCategoriesQuery } from "../../service/categories.service";
import { BeatLoader } from "react-spinners";
import { useGetFeedsQuery } from "../../service/feeds.service";
import PollSchedule from "../polls/PollSchedule";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { MdAddAPhoto } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { BiPoll } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DropdownMenu from "../ui/DropdownMenu";
import { LuCalendarClock } from "react-icons/lu";
import { GiBlackBook } from "react-icons/gi";
import { CgPoll } from "react-icons/cg";
import { media, profile_placeholder } from "../../assets/images";
import { useGetUserProfiileQuery } from "../../service/user.service";
import CreateDiary from "../diary/CreateDiary";

function MakePost({ onPostContent, socket, onNewPost }) {
  const [openDiaryModal, setOpenDiaryModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [selectedPostMedia, setSelectedPostMedia] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("Public");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { refetch } = useGetFeedsQuery();
  const viewMoreRef = useRef(null);
  const { data: profile } = useGetUserProfiileQuery();
  const [viewMore, setIsViewMore] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const { data: Category } = useGetCategoriesQuery();

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };

  const [openPoll, setOpenPoll] = useState(false);

  const handleClosePoll = () => {
    setOpenPoll(false);
  };

  const handleSchedulePostMediaChange = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedPostMedia([...selectedPostMedia, ...files]);
  };

  // Remove selected item
  const handleRemove = (item) => {
    if (selectedPostMedia.includes(item)) {
      setSelectedPostMedia(selectedPostMedia.filter((media) => media !== item));
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  // Handle content change
  const handleContentChange = (event) => {
    if (event.target.value.length <= 500) {
      setContent(event.target.value);
    }
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleScheduleDateChange = (event) => {
    setScheduleDate(event.target.value);
  };

  const handleScheduleTimeChange = (event) => {
    setScheduleTime(event.target.value);
  };

  const token = useSelector((state) => state.user?.token);

  const user = useSelector((state) => state.user?.user);

  const handleSubmit = async () => {
    setSubmitting(true);

    const formData = new FormData();
    selectedPostMedia.forEach((media) => formData.append("media", media));
    formData.append("content", content);
    formData.append("category", category);
    formData.append("audience", audience);
    formData.append("schedule_date", scheduleDate);
    formData.append("schedule_time", scheduleTime);

    if (!content.trim()) {
      showAlert("", "Post content cannot be empty", "error");
      setSubmitting(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      await axios.post(`${apiUrl}/user/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      setSelectedPostMedia([]);
      setContent("");
      setCategory("");
      setScheduleDate("");
      setScheduleTime("");
      showAlert("Great!", "Post created successfully", "success");
      refetch();

      const msg = {
        organizationId: user?.current_organization || user?.organization_id[0]
      };
      socket.emit("fetch_feed", msg);
    } catch (error) {
      console.error("Error submitting post:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("new_post", (newPost) => {
        onNewPost(newPost); // Pass the new post to the Main component
      });
    }

    return () => {
      if (socket) {
        socket.off("new_post");
      }
    };
  }, [socket, onNewPost]);

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  return (
    <>
      <div>
        <div className="w-full bg-white rounded-md border-b-0 border-0 h-auto">
          <div
            className={`flex p-2 gap-4 justify-start px-7 ${
              isVisible ? "items-start" : "items-center"
            } w-full py-5`}
          >
            <div>
              <div className="flex items-center justify-center h-[40px] w-[40px] rounded-full border-4">
                <img
                  src={profile?.data?.photo_url || profile_placeholder}
                  className="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full">
              {isVisible ? (
                <textarea
                  className="make-post-input focus:outline-none focus:ring-0 w-full text-wrap h-auto border-0 rounded-md p-2 resize-none"
                  placeholder="Share your thoughts..."
                  value={content}
                  onChange={handleContentChange}
                  onInput={adjustTextareaHeight}
                />
              ) : (
                <label
                  onClick={toggleVisibility}
                  className="bg-white make-post-input  cursor-pointer"
                >
                  Share your thoughts...
                </label>
              )}
              {isVisible && (
                <div className="flex pr-10 justify-end text-[7px]">
                  {" "}
                  <span>{content.length}/500</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white fle justify-between items-center px-5 md:px-7 pb-1 md:pb-5 pt-7">
            <div className="bg-white fle justify-between items-center px-5 md:px-7 pb-1 md:pb-5 pt-7">
              {/* upload picture or video */}
              <div className="flex items-center justify-between md:gap-10">
                <div className="rounded-md pb- flex justify-between make-post-input">
                  <div className=" flex rounded-md">
                    <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
                      {/* <IoCameraOutline className="text-[#3D7100]" size={20} /> */}
                      <img src={media} alt="" />
                      <p className="make-post-input text-xs xl:text-sm">
                        Media
                      </p>
                      <input
                        type="file"
                        onChange={handleSchedulePostMediaChange}
                        accept="image/*,video/*"
                        multiple
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
                {/* Categories */}
                <div className="bg-gray-100 rounded-full py- flex items-center px-2">
                  <div className="flex items-center space-x-2 w-35">
                    <div className="text-gray-600 text-xs xl:text-sm ">
                      {audience === "Public" ? (
                        <BiWorld size={20} className="text-[#3D7100]" />
                      ) : audience === "Private" ? (
                        <BiLock
                          size={20}
                          className="text-xs xl:text-sm text-[#3D7100]"
                        />
                      ) : (
                        <BiGroup
                          size={20}
                          className="text-xs xl:text-sm text-[#3D7100]"
                        />
                      )}
                    </div>
                    <select
                      value={audience}
                      onChange={handleAudienceChange}
                      className="focus:outline-none focus:ring-0 border-0 text-xs xl:text-sm bg-transparent w-full h-full make-post-input"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Followers">Followers</option>
                    </select>
                  </div>
                </div>

                {/* view more */}

                <div className="text-center py-[6px] px-4 rounded-full bg-gray-100">
                  <DropdownMenu
                    aria_label={"viewMore"}
                    dropdownRef={viewMoreRef}
                    onClick={() => {
                      setIsViewMore(!viewMore);
                    }}
                    display_value={
                      <>
                        <small className="text-xs xl:text-sm">View More</small>
                        <MdOutlineKeyboardArrowRight
                          className="inline-block"
                          size={20}
                        />
                      </>
                    }
                    isDropdownOpen={viewMore}
                    listItem={
                      <div className="px-4 py-2">
                        <button
                          className="block px-1 py-3 text-[1rem] text-black font-Inter hover:bg-gray-100 w-full text-left"
                          onClick={() => setOpenScheduleModal(true)}
                        >
                          <LuCalendarClock className="w-4 h-4 mr-2 inline" />
                          <span className="font-semibold">Schedule Post</span>
                        </button>

                        {features.includes("Diary") && (
                          <button
                            className="block px-1 py-3 text-[1rem] text-black font-Inter hover:bg-gray-100 w-full text-left"
                            onClick={() => setOpenDiaryModal(true)}
                          >
                            <GiBlackBook className="w-4 h-4 mr-2 inline" />
                            <span className="font-semibold">Diary</span>
                          </button>
                        )}

                        {/* <button
                        className="block px-1 py-3 text-[1rem] text-black font-Inter hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setIsProfileOpen(false);
                        }}
                      >
                        <HiOutlineDocumentDuplicate className="w-4 h-4 mr-2 inline" />
                        <span className="font-semibold">Draft</span>
                      </button> */}

                        {features.includes("Poll") && (
                          <button
                            className="block px-1 py-3 text-[1rem] text-black font-Inter hover:bg-gray-100 w-full text-left"
                            onClick={() => setOpenPoll(true)}
                          >
                            <CgPoll className="w-4 h-4 mr-2 inline" />
                            <span className="font-semibold">Polls</span>
                          </button>
                        )}
                      </div>
                    }
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !content}
                  className={`${
                    !content
                      ? "bg-gray-100 text-gray-600"
                      : "bg-[#3D7100] text-white"
                  } hidden md:block px-8 h-10 rounded-3xl`}
                >
                  {submitting ? (
                    <BeatLoader color="#ffffff" loading={true} />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="flex w-full justify-center h-[120px] rounded-[4px] gap-5 items-center mb-2 bg-[#EDFFF0]">
                <button
                  className="hover:bg-[#2CC84A] hover:text-white w-[66.58px] h-[50.66px] flex flex-col justify-center items-center schedule-btn gap-2"
                  onClick={() => setOpenScheduleModal(true)}
                >
                  {/* <img src={schedule} alt="" /> */}
                  <CiCalendarDate size={20} />

                  <p>Schedule Post</p>
                </button>

                <button
                  className="hover:bg-[#2CC84A] hover:text-white w-[66.58px] h-[50.66px] flex flex-col justify-center items-center schedule-btn gap-2"
                  onClick={() => setOpenDiaryModal(true)}
                >
                  {/* <img src={diary} alt="" /> */}
                  <SlNotebook size={16} />

                  <p>Diary</p>
                </button>

                <button className="hover:bg-[#2CC84A] hover:text-white w-[66.58px] h-[50.66px] flex flex-col justify-center items-center schedule-btn gap-2">
                  {/* <img src={draft} alt="" /> */}
                  <IoMdCopy size={20} />
                  <p>Draft</p>
                </button>

                <button
                  className="hover:bg-[#2CC84A] hover:text-white w-[66.58px] h-[50.66px] flex flex-col justify-center items-center schedule-btn gap-2"
                  onClick={() => setOpenPoll(true)}
                >
                  {/* <img src={polls} alt="" />
                   */}
                  <BiPoll size={20} />

                  <p>Polls</p>
                </button>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting || !content}
              className={`${
                !content
                  ? "bg-gray-200 text-gray-600"
                  : "bg-[#3D7100] text-white"
              } md:hidden mx-6 px-8 py-1 mb-3 rounded-3xl`}
            >
              {submitting ? (
                <BeatLoader color="#ffffff" loading={true} />
              ) : (
                "Post"
              )}
            </button>
            {selectedPostMedia && (
              <div
                className={`${
                  selectedPostMedia ? "flex" : "hidden"
                } uploaded-items-container pt-2 rounded-md max-h-80 overflow-y-auto flex-wrap mt-`}
              >
                {[...selectedPostMedia].map((item, index) => (
                  <UploadedItem
                    key={index}
                    item={item}
                    onRemove={handleRemove}
                    onItemSelect={handleItemSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {viewModalOpen && selectedItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20">
            <div className="max-w-screen-lg w-full max-h-full p-4">
              {selectedItem.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(selectedItem)}
                  alt=""
                  className="max-w-full max-h-screen mx-auto"
                />
              ) : (
                <video
                  src={URL.createObjectURL(selectedItem)}
                  controls
                  className="max-w-full max-h-screen mx-auto"
                />
              )}
              <button
                onClick={() => setViewModalOpen(false)}
                className="absolute top-0 right-0 m-4 p-2 bg-white rounded-full hover:bg-gray-200"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {openDiaryModal && (
          <CreateDiary
            openDiaryModal={openDiaryModal}
            onClick={() => setOpenDiaryModal(!openDiaryModal)}
          />
        )}

        <Modals
          openModal={openScheduleModal}
          modalSize="3xl"
          onClose={() => setOpenScheduleModal(false)}
          // btnText="Schedule"
        >
          <textarea
            className="make-post-input focus:outline-none focus:ring-0 pb-4 flex-wrap border-0"
            placeholder="Share your thoughts..."
            value={content}
            onChange={handleContentChange}
          ></textarea>

          <div className="uploaded-items-container p-4 border border-white rounded-md max-h-80 overflow-y-auto mt-4 flex flex-wrap">
            {[...selectedPostMedia].map((item, index) => (
              <UploadedItem
                key={index}
                item={item}
                onRemove={handleRemove}
                onItemSelect={handleItemSelect}
              />
            ))}
          </div>

          <div className="flex justify-between pb-5 pt-5">
            <div className="text-add-post">Add to your post</div>

            <div className="border flex w-[130px] rounded-md ml-3">
              <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
                <MdAddAPhoto className="text-[#34B53A]" size={20} />
                <p className="font-Inte">Photo/Video</p>
                <input
                  type="file"
                  onChange={handleSchedulePostMediaChange}
                  accept="image/*,video/*"
                  multiple
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between pb-4">
            <div className="flex-col">
              <label htmlFor="date" className="modal-label">
                Schedule date
              </label>
              <div className="input-bg-modal flex">
                <img src={Date} alt="" />
                <input
                  type="Date"
                  className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                  onChange={handleScheduleDateChange}
                  placeholder="Select date"
                />
              </div>
            </div>

            <div className="flex-col">
              <label htmlFor="date" className="modal-label">
                Schedule time
              </label>
              <div className="input-bg-modal flex">
                <img src={time} alt="" />
                <input
                  type="time"
                  className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                  onChange={handleScheduleTimeChange}
                  placeholder="Select time"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-10 pb-2">
            <div className="flex flex-col w-full">
              <label htmlFor="date" className="modal-label pb-1">
                Select Category
              </label>
              <div className="input-bg-modal flex">
                <img src={time} alt="" />
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full"
                >
                  <option value="">select category</option>
                  {Category?.data?.map((data, index) => (
                    <option value={data?.name} key={index}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="date" className="modal-label pb-1">
                Choose Audience
              </label>
              <div className="input-bg-modal flex justify-between">
                <img src={globe} alt="" />
                <select
                  value={audience}
                  onChange={handleAudienceChange}
                  className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Followers">Followers</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <button onClick={handleSubmit} className="modal-btn w-full">
              {submitting ? (
                <BeatLoader color="#ffffff" loading={true} />
              ) : (
                "Schedule"
              )}
            </button>
          </div>
        </Modals>
        {openPoll && (
          <div className="fixed z-50 bg-gray-300 bg-opacity-50 top-0 left-0 w-screen h-screen">
            <PollSchedule onclick={handleClosePoll} />
          </div>
        )}
      </div>
    </>
  );
}

export default MakePost;
