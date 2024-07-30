
import React, { useState } from 'react';
import RetweetModal from './RetweetModal';
import CommentSection from './CommentSection';

const Tweet2 = ({ content, initialRetweetCount, initialLikeCount }) => {
  const [retweetCount, setRetweetCount] = useState(initialRetweetCount);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRetweetClick = () => {
    setIsModalOpen(true);
  };

  const handleRetweet = (quote) => {
    setRetweetCount(retweetCount + 1);
    setIsRetweeted(true);
    setIsModalOpen(false);
    // You can also handle quote tweets here, e.g., save them to a state or send them to an API
  };

  const handleLikeClick = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg p-4 shadow-md my-4">
      <p className="text-gray-800">{content}</p>
      <div className="flex items-center mt-4">
        <button
          onClick={handleRetweetClick}
          className={`flex items-center text-lg ${
            isRetweeted ? 'text-green-500' : 'text-blue-500'
          } focus:outline-none`}
        >
          <span className="mr-2">🔁</span>
          Retweet
        </button>
        <span className="ml-4 text-gray-600">{retweetCount}</span>
        <button
          onClick={handleLikeClick}
          className={`flex items-center text-lg ml-4 ${
            isLiked ? 'text-red-500' : 'text-gray-500'
          } focus:outline-none`}
        >
          <span className="mr-2">❤️</span>
          Like
        </button>
        <span className="ml-2 text-gray-600">{likeCount}</span>
      </div>
      <CommentSection />
      {isModalOpen && (
        <RetweetModal
          onClose={() => setIsModalOpen(false)}
          onRetweet={handleRetweet}
        />
      )}
    </div>
  );
};

export default Tweet2;
