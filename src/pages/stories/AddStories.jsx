import { FaRegImage, FaTimes } from "react-icons/fa";
import Modals from "../../components/modals/Modal";
import {  useRef, useState } from "react";
import UploadStories from "./UploadStories";
import { useGetStoriesFeedQuery, useGetStoriesQuery } from "../../service/stories.service";
import { showAlert } from "../../static/alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import imageCompression from 'browser-image-compression';

const AddStories = () => {
  const [uploadPreview, setUploadPreview] = useState(false);
  const [selectedPostMedia, setSelectedPostMedia] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const { data: stories } = useGetStoriesQuery();
  const user = useSelector((state) => state.user.user);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { refetch } = useGetStoriesFeedQuery()


  // const handleSchedulePostMediaChange = async (event) => {
  //   const files = Array.from(event.target.files);
  //   setSelectedPostMedia(files);
  //   setUploadPreview((prev) => !prev);
  // };

  const handleSchedulePostMediaChange = async (event) => {
    const files = Array.from(event.target.files);
    const compressedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        compressedFiles.push(compressedFile);
      } catch (error) {
        console.error("Error compressing file:", error);
        compressedFiles.push(file);
      }
    }

    setSelectedPostMedia(compressedFiles);
    setUploadPreview((prev) => !prev);
  };

  // TODO: STORY LIST, DISPLAY STORIES ETC

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const fileInputRef = useRef(null);
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const token = useSelector((state) => state.user?.token);


  const handleSubmitStory = async () => {
    setSubmitting(true);

    if (!selectedPostMedia || selectedPostMedia.length === 0) {
      alert("Please select at least one image");
      return;
    }
  
    const formData = new FormData();
    selectedPostMedia.forEach((media) => {
      formData.append("media", media);
    });
    formData.append("caption", caption);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


    try {
      // const { data } = await addStories(formData).unwrap();
      const response = await axios.post(`${apiUrl}/user/stories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if(response.data.success === true){
        showAlert("Great!", `Story added successfully`, "success");
        setCaption("");
        setSelectedPostMedia([]);
        setViewModalOpen(false);
        setUploadPreview((prev) =>!prev);
        setSubmitting((prev) =>!prev);
        navigate("/");
        refetch()
      }else{
        showAlert("Error", `Failed to add story`, "error");
        setSubmitting((prev) =>!prev);
      }

      fileInputRef.current.value = null;
      console.log(response);
    } catch (e) {
      setSubmitting((prev) =>!prev);
      console.error("Failed to add story", e);
    }
  };


  const storiesUserIds = stories?.data?.map((user) => user?.user_id?._id);
  console.log(storiesUserIds)
  const checkIfUserHasStory = storiesUserIds === user._id;
  console.log(checkIfUserHasStory)

  return (
    <div className="bg-whit flex justify-between gap-5 item-center">
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1"></div>
    {/* {checkIfUserHasStory &&  */}
     <div
        className="bg-white rounded-lg p-4 flex-1 w-[20.27rem] cursor-pointer"
        onClick={handleUpload}
      >
        <div className="flex text-center flex-col my-auto justify-center items-center gap-2 w-24 h-32 rounded-md">
          <FaRegImage size={30} />
          <label className="text-sm cursor-pointer">
            <input
              type="file"
              onChange={handleSchedulePostMediaChange}
              accept="image/*"
              ref={fileInputRef}
              multiple
              className="hidden"
            />
          </label>
          <p>Create a story</p>
        </div>
      </div>
      {/* // } */}
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1"></div>

      <Modals
        title="Preview"
        openModal={uploadPreview && selectedPostMedia}
        onClose={() => setUploadPreview((prev) => !prev)}
      >
        <div
          className={`${
            selectedPostMedia ? "flex flex-col gap-5" : "hidden"
          } uploaded-items-container pt-2 rounded-md  overflow-y-auto flex-wrap mt-`}
        >
          {selectedPostMedia?.map((item, index) => (
          <UploadStories
            key={index}
            item={item}
            // onRemove={handleRemove}
            onItemSelect={handleItemSelect}
          />
          ))}
          <input
            type="text"
            placeholder="Caption"
            className="rounded-lg focus:ring-0 border-[#1F3900] outline-none"
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-between gap-5 mt-4 items-center">
          <button
            className="border-none bg-[#1F3900] w-full rounded-lg py-3 text-white"
            onClick={() =>{
              setCaption("");
              setSelectedPostMedia([]);
              setViewModalOpen(false);
              setUploadPreview((prev) => !prev)
            }}
          >
            Discard
          </button>
          <button
            className={`border-none ${!caption || !selectedPostMedia ? "bg-gray-200" : "bg-[#1F3900]" }  w-full rounded-lg py-3 text-white`}
            onClick={handleSubmitStory}
            disabled ={ submitting || !caption }
          >
            {
              submitting ? (
                <BeatLoader color="#ffffff" loading={true} />
              ) : "Share to Story"
            }
          
          </button>
        </div>
      </Modals>

      {viewModalOpen && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
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
    </div>
  );
};

export default AddStories;
