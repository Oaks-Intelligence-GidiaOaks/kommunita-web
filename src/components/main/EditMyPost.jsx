import { useState } from "react";
import PropTypes from "prop-types";
import CustomCarousel from "./CustomCarousel";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import DOMPurify from "dompurify";

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

const EditMyPost = ({ content, medias }) => {
  const [message, setMessage] = useState(content || "");
  const [media, setMedia] = useState([]);
  const [imgPreview, setImgPreview] = useState(medias || null);

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <div>
      <form>
        <Diary content={message} />
        <textarea
          className="make-post-input focus:outline-none focus:ring-0 w-full text-wrap h-auto border-0 rounded-md resize-none"
          placeholder="Share your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={adjustTextareaHeight}
        />
        {imgPreview && (
          <CustomCarousel
            media_urls={imgPreview}
            left={left}
            right={right}
            dotsinactive={dotsinactive}
            dotsactive={dotsactive}
          />
        )}
      </form>
    </div>
  );
};

export default EditMyPost;

EditMyPost.propTypes = {
  content: PropTypes.string,
  medias: PropTypes.array,
};

Diary.propTypes = {
  content: PropTypes.string,
};
