import Diary from '../../components/diary/Diary';
import { useGetExploreDiaryQuery } from '../../service/explore.service';
import { Spinner } from 'flowbite-react';
import React from 'react'

const Explore_Dairies = () => {
  const { data: diaries, isLoading: diariesLoading } =   useGetExploreDiaryQuery();


  return (
    <div
      className={``}
    >
      {diariesLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        diaries?.data.map((post) => {
          return <Diary key={post?._id} post={post} />;
        })
      )}
    </div>
  )
}

export default Explore_Dairies
