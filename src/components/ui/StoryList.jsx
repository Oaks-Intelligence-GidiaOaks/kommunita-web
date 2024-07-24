import React from 'react';

const storiesData = [
  {
    id: 1,
    username: 'john_doe',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    username: 'jane_smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    username: 'mike_jones',
    image: 'https://randomuser.me/api/portraits/men/58.jpg',
  },
  {
    id: 4,
    username: 'anna_karen',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 5,
    username: 'bob_lee',
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
  },
];

const StoryList = () => {
  return (
    <div className="flex w-full justify-between space-x-4 p-4 overflow-x-auto custom-scrollbar">
         <div  className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full p-[2px]">
          <div className="w-full h-full text-3xl flex flex-col items-center justify-center rounded-full bg-white p-1">
          +
          </div>
        </div>
        <p className="text-sm font-semibold text-center mt-2">Post Story</p>
      </div>
    {storiesData.map((story) => (
      <div key={story.id} className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-r from-[#34B53A] via-[#2CC84A] to-[#A6B953CC]">
          <div className="w-full h-full rounded-full bg-white p-1">
            <img
              className="w-full h-full rounded-full"
              src={story.image}
              alt={story.username}
            />
          </div>
        </div>
        <p className="text-sm font-semibold text-center mt-2">{story.username}</p>
      </div>
    ))}
  </div>
  );
};

export default StoryList;
