import { Spinner } from "flowbite-react";
import React, { useState, useEffect } from "react";
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

const EditDiary2 = ({ openDiaryModal, onClick, existingDiary }) => {
    const initialPages = existingDiary.pages
    ? existingDiary.pages.map((page) => ({ ...page })) 
    : [{ content: "", media_urls: [] }];
  const [pages, setPages] = useState(initialPages);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newPages = Array.from(pages);
    const [reorderedPage] = newPages.splice(result.source.index, 1);
    newPages.splice(result.destination.index, 0, reorderedPage);

    setPages(newPages);
    setCurrentPageIndex(result.destination.index);
  };


  const [category, setCategory] = useState(existingDiary.category || "");
  const [submitting, setSubmitting] = useState(false);
  const { data: Category } = useGetCategoriesQuery();
  const { refetch: refetchFeeds } = useGetFeedsQuery();
  const token = useSelector((state) => state.user?.token);

  const handleDiaryMediaChange = (event) => {
    const files = Array.from(event.target.files);
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        media_urls: [
          ...newPages[currentPageIndex].media_urls,
          ...files,
        ],
      };
      return newPages;
    });
  };

  const handleDiaryRemove = (item) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex].media_urls = newPages[
        currentPageIndex
      ].media_urls.filter((media) => media !== item);
      return newPages;
    });
  };

  const handleEditorChange = (value) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPageIndex].content = value;
      return newPages;
    });
  };

  const addNewPage = () => {
    setPages((prevPages) => [...prevPages, { content: "", media_urls: [] }]);
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
        content: page.content.trim(),
        media: [],
      })),
      category: category,
    };

    for (let i = 0; i < pages.length; i++) {
      if (!pages[i].content.trim()) {
        showAlert("", `Diary content on page ${i + 1} cannot be empty`, "error");
        setSubmitting(false);
        return;
      }

      for (const mediaFile of pages[i].media_urls) {
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
      const response = await axios.put(`${apiUrl}/user/diary/${existingDiary.id}`, diaryData, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log(`Diary updated successfully:`, response.data);
      showAlert("Great!", "Diary updated successfully", "success");
      setPages([{ content: "", media_urls: [] }]);
      setCurrentPageIndex(0);
      setCategory("");
      setSubmitting(false);
      refetchFeeds();
      onClick();
    } catch (error) {
      console.error(`Error updating Diary:`, error);
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
  console.log(currentPage)

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
              value={currentPage?.content}
              onChange={handleEditorChange}
              className="border-none"
              theme="snow"
              placeholder="Write something amazing..."
            />
            <div className="uploaded-items-container p-4 border-gray-200 rounded-md max-h-80 overflow-y-auto mt-4 flex flex-wrap">
              {currentPage?.media_urls?.map((item, index) => (
                <UploadedItem
                  key={index}
                  item={item}
                  onRemove={handleDiaryRemove}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
            <p>Add to your post</p>
            <div className="flex flex-wrap items-center gap-2 text-[#3F3E3E] mt-3">
              <label
                htmlFor="uploadImage"
                className="flex items-center gap-1 cursor-pointer"
              >
                <IoCameraOutline size={20} />
                <span>Upload Image</span>
              </label>
              <input
                id="uploadImage"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleDiaryMediaChange}
              />
              <label
                htmlFor="uploadVideo"
                className="flex items-center gap-1 cursor-pointer"
              >
                <IoVideocamOutline size={20} />
                <span>Upload Video</span>
              </label>
              <input
                id="uploadVideo"
                type="file"
                className="hidden"
                accept="video/*"
                multiple
                onChange={handleDiaryMediaChange}
              />
              <label
                htmlFor="tagLocation"
                className="flex items-center gap-1 cursor-pointer"
              >
                <CiLocationOn size={20} />
                <span>Tag Location</span>
              </label>
            </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between md:flex-row mt-2 items-center">
            <div className="flex flex-col w-full">
              <label className="inline-flex justify-start mb-2 text-[#838383]">
                Select Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {Category?.data.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4 w-full">
              <button
                className="btn primary-button min-w-[200px] p-2 rounded-xl bg-[#34B53A] text-white font-semibold shadow-lg hover:bg-[#2c9e33] transition-all duration-150 ease-in-out flex justify-center items-center"
                onClick={handleDiarySubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <Spinner aria-label="Spinner button example" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>

          <div className="w-full">
            <PageButtons
              pages={pages}
              currentPageIndex={currentPageIndex}
            />
          </div>
        </div>
      </Modals>
    </DragDropContext>
  );
};

export default EditDiary2;
