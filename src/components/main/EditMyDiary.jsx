import { useState } from "react";
import PropTypes from "prop-types";
import CustomCarousel from "./CustomCarousel";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import catIcon from "../../assets/images/category.svg";
import audience from "../../assets/images/audience.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
// import { MdAddAPhoto } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { useGetCategoriesQuery } from "../../service/categories.service";
import UploadedItem from "./UploadedItem";
import { FaTimes } from "react-icons/fa";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { BeatLoader } from "react-spinners";
import ReactQuill from "react-quill";

const Diary = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const maxLength = 177;

  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const toggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <div className="pt-3 pb-2 w-full h-auto overflow-hidden">
      {sanitizedContent && (
        <div
          className="post-content text-justify flex flex-row flex-wrap"
          dangerouslySetInnerHTML={{
            __html: isContentExpanded
              ? sanitizedContent
              : sanitizedContent.length > maxLength
              ? sanitizedContent.slice(0, maxLength) + "..."
              : sanitizedContent,
          }}
        />
      )}
      {sanitizedContent.length > maxLength && (
        <div className="flex justify-end items-center py-3">
          <p
            className="text-sm cursor-pointer hover:text-blue-600 text-gray-400"
            onClick={toggleContent}
          >
            {isContentExpanded ? "see less" : "see more"}
          </p>
        </div>
      )}
    </div>
  );
};

const EditMyDiary = ({
  content,
  medias,
  avatar,
  userId,
  badgeColor,
  postId,
  onClose,
}) => {
  const { data: Category } = useGetCategoriesQuery();

  const [message, setMessage] = useState(content || "");
  // const [media, setMedia] = useState([]);
  const [selectedPostMedia, setSelectedPostMedia] = useState([]);
  const [imgPreview, setImgPreview] = useState(medias || null);
  // const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { refetch } = useGetFeedsQuery();

  const token = useSelector((state) => state.user?.token);

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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

  // const handleDiaryRemove = (item) => {
  //   if (selectedDiaryMedia.includes(item)) {
  //     setSelectedDiaryMedia(
  //       selectedDiaryMedia.filter((media) => media !== item)
  //     );
  //   }
  // };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Submitting");

    const formData = new FormData();
    if (selectedPostMedia.length > 0) {
      selectedPostMedia.forEach((media) => formData.append("media", media));
    }

    if (category) {
      formData.append("category", category);
    }

    formData.append("content", message);
    // formData.append("audience", audience);

    if (!content.trim()) {
      showAlert("", "Post content cannot be empty", "error");
      setSubmitting(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.patch(
        `${apiUrl}/user/diary/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Diary Updated successfully:", response.data);
      setSelectedPostMedia([]);
      setMessage("");
      setCategory("");
      showAlert("Great!", "Diary Updated successfully", "success");
      refetch();
    } catch (error) {
      console.error("Error Updating diary:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <Diary content={message} /> */}

        <div className="flex-1 w-full mb-5">
          <ReactQuill
            value={message}
            onChange={setMessage}
            theme="snow"
            placeholder="Write something amazing..."
          />
        </div>

        {selectedPostMedia?.length > 0 ? (
          <div className="uploaded-items-container p-2 rounded-md max-h-[400px] overflow-y-auto flex flex-wrap mt-3">
            {[...selectedPostMedia].map((item, index) => (
              <UploadedItem
                key={index}
                item={item}
                onRemove={handleRemove}
                onItemSelect={handleItemSelect}
              />
            ))}
          </div>
        ) : (
          <CustomCarousel
            media_urls={imgPreview}
            left={left}
            right={right}
            dotsinactive={dotsinactive}
            dotsactive={dotsactive}
          />
        )}

        <div className="mt-5 flex justify-between items-center">
          <p className="font-[600] text-[16.74px] text-[#838383]">
            Add to your post
          </p>

          <div className="flex items-center gap-2">
            <div className="border mb-10 flex bg-[#EFF2FC] rounded-md">
              <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
                <IoMdPhotos className="text-[#34B53A]" size={20} />
                <p className="make-post-input text-sm text-[#838383]">Photo</p>
                <input
                  type="file"
                  onChange={handleSchedulePostMediaChange}
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="border mb-10 flex bg-[#EFF2FC] rounded-md">
              <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
                <IoVideocam className="text-red-600" size={20} />
                <p className="make-post-input text-sm text-[#838383]">Video</p>
                <input
                  type="file"
                  onChange={handleSchedulePostMediaChange}
                  accept="video/*"
                  multiple
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className=" mt-5">
          <p className="text-[9.61px] font-[500]">Choose Audience</p>
          <div className="w-[169px] h-[33px] flex">
            <img src={audience} width={24} alt="" />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full h-full px-2 make-post-input text-[#6B6B6B] text-[9.21px]"
            >
              <option className="w-full" value="public">
                Public
              </option>
              <option className="w-full" value="private">
                Private
              </option>
              {/* {Category?.data?.map((data, index) => (
                <option value={data?.name} key={index}>
                  {data.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>
        <div className="w-full" onClick={handleSubmit}>
          <button className="mt-5 flex font-[600] items-center justify-center text-[22.32px] w-full h-[54px] p-[10px] rounded-[3.48px] bg-[#34b53a] text-white">
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Update Diary"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyDiary;

EditMyDiary.propTypes = {
  content: PropTypes.string,
  medias: PropTypes.array,
  avatar: PropTypes.string,
  userId: PropTypes.string.isRequired,
  badgeColor: PropTypes.string,
  postId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

Diary.propTypes = {
  content: PropTypes.string,
};
