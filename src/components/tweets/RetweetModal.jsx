import { useRepostDiaryMutation } from '../../service/diary.service';
import { useRepostPostMutation } from '../../service/post.service';
import rtkMutation from '../../utils/rtkMutation';
import React, { useState } from 'react';


const RetweetModal = ({ onClose, onRetweet, postBy, type }) => {
    const [quote, setQuote] = useState('');
    const [repostDiary, { error: errDiary, isSuccess: scsDiary }] =
    useRepostDiaryMutation();
    const [repostPost, { error: err, isSuccess: scs }] = useRepostPostMutation();

  const handleRespost = async (id) => {
    // if (type === "post") {
      const postData = { post_id: id };
      try {
        await rtkMutation(repostPost, postData);
      } catch (error) {
        console.error("Error reposting post:", error);
        showAlert(
          "Oops",
          "An error occurred while reposting the post",
          "error"
        );
      }
    } 
    // else {
    //   const diaryData = { diary_id: id };
    //   console.log("Diary repost");
    //   try {
    //     await rtkMutation(repostDiary, diaryData);
    //   } catch (error) {
    //     console.error("Error reposting diary:", error);
    //     showAlert(
    //       "Oops",
    //       "An error occurred while reposting the diary",
    //       "error"
    //     );
    //   }
    // }
//   };

  const handleSubmit = () => {
    onRetweet(quote);
  };

  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Retweet post by: @{postBy}</h2>
        {/* <textarea
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Add a comment"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        ></textarea> */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Discard
          </button>
          <button
            onClick={handleRespost}
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
