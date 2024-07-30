import React, { useState } from 'react';

const RetweetModal = ({ onClose, onRetweet }) => {
  const [quote, setQuote] = useState('');

  const handleSubmit = () => {
    onRetweet(quote);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Retweet</h2>
        <textarea
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Add a comment"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Retweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetweetModal;
