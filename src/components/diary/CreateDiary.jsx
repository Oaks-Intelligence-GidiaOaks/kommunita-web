import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import UploadedItem from "../main/UploadedItem";
import ReactQuill from "react-quill";
import Modals from "../modals/Modal";
import { useGetCategoriesQuery } from "../../service/categories.service";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoCameraOutline, IoVideocamOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useGetFeedsQuery } from "../../service/feeds.service";


const PageButtons = ({ pages, currentPageIndex }) => {
  return (
    <Droppable droppableId="page-buttons" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-wrap"
        >
          {pages.map((_, index) => (
            <Draggable key={`page-${index}`} draggableId={`page-${index}`} index={index}>
              {(provided) => (
                <button
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`m-1 px-3 py-2 rounded ${
                    index === currentPageIndex
                      ? "bg-[#34B53A] text-white"
                      : "bg-[#EFF2FC] text-[#838383]"
                  }`}
                >
                  {index + 1}
                </button>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};



const CreateDiary = ({ openDiaryModal, onClick }) => {
  const [pages, setPages] = useState([
    { editorHtml: "", selectedDiaryMedia: [] },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const newPages = Array.from(pages);
    const [reorderedPage] = newPages.splice(result.source.index, 1);
    newPages.splice(result.destination.index, 0, reorderedPage);
  
    setPages(newPages);
    setCurrentPageIndex(result.destination.index);
  };


  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: Category } = useGetCategoriesQuery();
  const { refetch:refetchFeeds } = useGetFeedsQuery()
  const token = useSelector((state) => state.user?.token);


  const handleDiaryMediaChange = (event) => {
    const files = Array.from(event.target.files);
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        selectedDiaryMedia: [
          ...newPages[currentPageIndex].selectedDiaryMedia,
          ...files,
        ],
      };
      return newPages;
    });
  };

  const handleDiaryRemove = (item) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex].selectedDiaryMedia = newPages[
        currentPageIndex
      ].selectedDiaryMedia.filter((media) => media !== item);
      return newPages;
    });
  };

  const handleEditorChange = (value) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex].editorHtml = value;
      return newPages;
    });
  };

  const addNewPage = () => {
    setPages((prevPages) => [...prevPages, { editorHtml: "", selectedDiaryMedia: [] }]);
    setCurrentPageIndex(pages.length);
  };

  const navigatePage = (direction) => {
    setCurrentPageIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex < pages.length - 1 ? prevIndex + 1 : prevIndex;
      } else {
        return prevIndex > 0 ? prevIndex - 1 : prevIndex;
      }
    });
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDiarySubmit = async () => {
    setSubmitting(true);
  
    if (!category.trim()) {
      showAlert("", "Please select a category", "error");
      setSubmitting(false);
      return;
    }
  
    const diaryData = {
      pages: pages.map((page) => ({
        content: page.editorHtml.trim(),
        media: [],
      })),
      category: category,
    };
  
    for (let i = 0; i < pages.length; i++) {
      if (!pages[i].editorHtml.trim()) {
        showAlert("", `Diary content on page ${i + 1} cannot be empty`, "error");
        setSubmitting(false);
        return;
      }
  
      for (const mediaFile of pages[i].selectedDiaryMedia) {
        try {
          const base64 = await convertFileToBase64(mediaFile);
          diaryData.pages[i].media.push(base64);
        } catch (error) {
          console.error(`Error converting file to base64:`, error);
          showAlert("Oops!", "Error processing media files", "error");
          setSubmitting(false);
          return;
        }
      }
    }
  
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  
    try {
      const response = await axios.post(`${apiUrl}/user/diary`, diaryData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
  
      console.log(`Diary created successfully:`, response.data);
      showAlert("Great!", "Diary created successfully", "success");
      setPages([{ editorHtml: "", selectedDiaryMedia: [] }]);
      setCurrentPageIndex(0);
      setCategory("");
      setSubmitting(false);
      refetchFeeds()
      onClick(); 
    } catch (error) {
      console.error(`Error submitting Diary:`, error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
      setSubmitting(false);
    }
  };
  
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const currentPage = pages[currentPageIndex];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <Modals
      openModal={openDiaryModal}
      modalSize="4xl"
      onClose={onClick}
      title={""}
    >
      <div className="pb-5 flex flex-col gap-2 justify-start">
        <div className="flex justify-between items-center">
          <span>
            Page {currentPageIndex + 1}/{pages.length}
          </span>

          <div className="flex items-center gap-4">
            <button
              className="inline-block border rounded-full bg-[#D9D9D999] p-1"
              onClick={() => navigatePage("prev")}
              disabled={currentPageIndex === 0}
            >
              <MdKeyboardArrowLeft size={20} />
            </button>
            <button
              className="inline-block border rounded-full bg-[#D9D9D999] p-1"
              onClick={() => navigatePage("next")}
              disabled={currentPageIndex === pages?.length - 1}
            >
              <MdKeyboardArrowRight size={20} />
            </button>
            <button
              className="inline-block border rounded-full bg-[#D9D9D999] p-1"
              onClick={addNewPage}
            >
              <HiOutlinePlusSm size={20} />
            </button>
          </div>
        </div>

        <div className="border editooor p-4">
          <ReactQuill
            value={currentPage.editorHtml}
            onChange={handleEditorChange}
            className="border-none"
            theme="snow"
            placeholder="Write something amazing..."
          />
          <div className="uploaded-items-container p-4 border-gray-200 rounded-md max-h-80 overflow-y-auto mt-4 flex flex-wrap">
            {currentPage.selectedDiaryMedia.map((item, index) => (
              <UploadedItem
                key={index}
                item={item}
                onRemove={handleDiaryRemove}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <p>Add to your post</p>

            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm cursor-pointer">
                  <IoCameraOutline className="inline-block text-[#3D7100] font-semibold" /> Photo
                  <input
                    type="file"
                    onChange={handleDiaryMediaChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm cursor-pointer">
                  <IoVideocamOutline className="inline-block text-[#3D7100] font-semibold" /> Video
                  <input
                    type="file"
                    onChange={handleDiaryMediaChange}
                    accept="video/*"
                    multiple
                    className="hidden"
                  />
                </label>
              </div>

              <div className="">
                <CiLocationOn className="inline-block text-[#3D7100] font-semibold" />
                Location
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start gap-2 pb-5">
        <label htmlFor="category" className="text-sm">
          Select Category (optional)
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="focus:outline-none focus:ring-0 rounded-md bg-transparent post-input w-full border-2 border-gray-300"
        >
          <option value="">Select Category</option>
          {Category?.data?.map((data, index) => (
            <option value={data?.name} key={index}>
              {data.name}
            </option>
          ))}
        </select>
      </div>


      <PageButtons pages={pages} currentPageIndex={currentPageIndex} />

      <div className="flex justify-end pt-5">
        <button
          className="p-2 rounded-md border text-[#fff] bg-[#34B53A]"
          onClick={handleDiarySubmit}
          disabled={submitting}
        >
          {submitting ? <Spinner /> : "Post Diary"}
        </button>
      </div>
    </Modals>
    </DragDropContext>
  );
};

export default CreateDiary;
