import React from 'react';

const Retweet = ({ originalContent, quote }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md my-4">
      {quote && <p className="text-gray-800 mb-2">{quote}</p>}
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
        <p className="text-gray-800">{originalContent}</p>
      </div>
    </div>
  );
};

export default Retweet;
