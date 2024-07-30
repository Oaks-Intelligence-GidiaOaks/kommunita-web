import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCommentSubmit} className="flex flex-col">
        <textarea
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 self-end"
        >
          Comment
        </button>
      </form>
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-gray-300 rounded-lg p-2 my-2"
          >
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
