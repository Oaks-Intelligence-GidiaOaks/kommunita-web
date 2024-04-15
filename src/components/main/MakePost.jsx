import { useState, useEffect, useRef } from "react";
import Modals from "../modals/Modal";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import more_btn from "../../assets/images/main/more.svg";
import photo_btn from "../../assets/images/main/photo.svg";
import video_btn from "../../assets/images/main/video.svg";
import go_live_btn from "../../assets/images/main/go-live.svg";
import diary from "../../assets/images/main/diary.svg";
import polls from "../../assets/images/main/polls.svg";
import schedule from "../../assets/images/main/schedule.svg";
import draft from "../../assets/images/main/draft.svg";
import Date from "../../assets/images/modals/date.svg";
import time from "../../assets/images/modals/time.svg";
import globe from "../../assets/images/modals/globe.svg";
import photos from "../../assets/images/modals/photos.svg";
import videoIcon from "../../assets/images/modals/video.svg";
import location from "../../assets/images/modals/location.svg";
import left from "../../assets/images/modals/left.svg";
import right from "../../assets/images/modals/right.svg";
import { FaTimes } from "react-icons/fa";
import {
  BiGlobe,
  BiLock,
  BiGroup,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import UploadedItem from "./UploadedItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import Resizer from "react-image-file-resizer";
import { useGetCategoriesQuery } from "../../service/categories.service";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCreatePostMutation } from "../../service/post.service";
import { ClipLoader, BeatLoader } from "react-spinners";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

function MakePost() {
  const [openDiaryModal, setOpenDiaryModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("Public");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const { data: Category } = useGetCategoriesQuery();

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };

  // Handle image change
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const optimizedImages = [];

    const resizeFile = (file) =>
      new Promise((resolve) => {
        if (file.type === "image/svg+xml") {
          // If it's an SVG file, no need to resize
          resolve(file);
        } else {
          Resizer.imageFileResizer(file, 1080, 1080, "PNG", 100, 0, (uri) => {
            const resizedFile = new File([uriToFile(uri)], file.name, {
              type: file.type,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
            });
            resolve(resizedFile);
          });
        }
      });

    for (const file of files) {
      try {
        const resizedImage = await resizeFile(file);
        optimizedImages.push(resizedImage);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }

    setSelectedImages([...selectedImages, ...optimizedImages]);
  };

  // Helper function to convert base64 URI to Blob
  const uriToFile = (uri) => {
    const byteString = atob(uri.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  //video upload
  const handleVideoChange = async (event) => {
    const files = Array.from(event.target.files);
    const compressedVideos = [];

    // Map each video file to a compression promise
    const compressionPromises = files.map(async (file) => {
      const compressedData = await compressVideo(file);
      compressedVideos.push(new File([compressedData], "compressed_video.mp4"));
    });

    // Wait for all compression promises to resolve
    await Promise.all(compressionPromises);

    // Once all videos are compressed, update selectedVideos state
    setSelectedVideos([...selectedVideos, ...compressedVideos]);
  };

  const compressVideo = async (videoFile) => {
    try {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.load();

      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vf",
        "scale=w=480:h=-1",
        "-c:a",
        "copy",
        "output.mp4",
      ]);
      const compressedData = await ffmpeg.readFile("output.mp4");
      return compressedData;
    } catch (error) {
      console.error("Error compressing video:", error);
      return null;
    }
  };

  // Remove selected item
  const handleRemove = (item) => {
    if (selectedImages.includes(item)) {
      setSelectedImages(selectedImages.filter((image) => image !== item));
    } else if (selectedVideos.includes(item)) {
      setSelectedVideos(selectedVideos.filter((video) => video !== item));
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  // Handle content change
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const token = useSelector((state) => state.user?.token);

  const handleSubmit = async () => {
    setSubmitting(true);

    const formData = new FormData();
    selectedImages.forEach((image) => formData.append("media", image));
    selectedVideos.forEach((video) => formData.append("media", video));
    formData.append("content", content);
    formData.append("category", category);
    formData.append("audience", audience);

    if (!content.trim()) {
      showAlert("", "Post content cannot be empty", "error");
      setSubmitting(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Post submitted successfully:", response.data);
      setSelectedImages([]);
      setSelectedVideos([]);
      setContent("");
      setCategory("");
      showAlert("Great!", "Post created successfully", "success");
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

            <div className="flex pb-4 ">
              {/* <img src={avatar2} alt="" /> */}
              <textarea
                className="post-input focus:outline-none focus:ring-0 border-0 w-full text-wrap h-auto"
                placeholder="Start a post..."
                value={content}
                onChange={handleContentChange}
              />
            </div>

            <div className="uploaded-items-container p-4 border border-gray-200 rounded-md max-h-80 overflow-y-auto mt-4 flex flex-wrap">
              {[...selectedImages, ...selectedVideos].map((item, index) => (
                <UploadedItem
                  key={index}
                  item={item}
                  onRemove={handleRemove}
                  onItemSelect={handleItemSelect}
                />
              ))}
            </div>

            <div className="pb-5 pt-5">
              <div className="buttons flex flex-row flex-wrap items-center justify-start gap-3 pb-5">
                <label className="shadow-md hover:shadow-lg">
                  <img src={photo_btn} alt="" />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                  />
                </label>
                <label className="shadow-md hover:shadow-lg">
                  <img src={video_btn} alt="" />
                  <input
                    type="file"
                    onChange={handleVideoChange}
                    accept="video/*, audio/mpeg"
                    multiple
                    style={{ display: "none" }}
                  />
                </label>
                <button className="shadow-md hover:shadow-lg">
                  <img src={go_live_btn} alt="" />
                </button>
              </div>

              <div className="flex justify-center">
                <button className="mb-2" onClick={toggleCollapse}>
                  {isExpanded ? (
                    <div className="flex justify-center items-center">
                      See less <BiChevronUp size={20} />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      See more <BiChevronDown size={20} />
                    </div>
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="flex justify-center gap-5 items-center mt-2 mb-2">
                  <button
                    className="shadow-md hover:shadow-lg"
                    onClick={() => setOpenScheduleModal(true)}
                  >
                    <img src={schedule} alt="" />
                  </button>

                  <button
                    className="shadow-md hover:shadow-lg"
                    onClick={() => setOpenDiaryModal(true)}
                  >
                    <img src={diary} alt="" />
                  </button>

                  <button className="shadow-md hover:shadow-lg">
                    <img src={draft} alt="" />
                  </button>

                  <button className="shadow-md hover:shadow-lg">
                    <img src={polls} alt="" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end py-4 gap-4 items-center">
              <div className="bg-[#F4F4F4] h-[33px] flex justify-center items-center">
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="focus:outline-none focus:ring-0 border-0 bg-transparent"
                >
                  <option value="">Category</option>
                  {Category?.data?.map((data, index) => (
                    <option value={data?._id} key={index}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="custom-select-box bg-[#F4F4F4] h-[33px] flex justify-center items-center">
                <div className="p-3 flex justify-center items-center">
                  <div className="select-image">
                    {audience === "Public" ? (
                      <BiGlobe size={20} />
                    ) : audience === "Private" ? (
                      <BiLock size={20} />
                    ) : (
                      <BiGroup size={20} />
                    )}
                  </div>
                  <select
                    value={audience}
                    onChange={handleAudienceChange}
                    className="focus:outline-none focus:ring-0 border-0 bg-transparent"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Followers">Followers</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="text-[#fff] bg-[#2CC84A] w-[121px] h-[33px] rounded-sm"
              >
                {submitting ? (
                  <BeatLoader color="#ffffff" loading={true} />
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
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
              <img src={videoIcon} alt="" />
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
              <img src={videoIcon} alt="" />
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
