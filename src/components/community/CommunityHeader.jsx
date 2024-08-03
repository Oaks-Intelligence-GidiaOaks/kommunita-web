import { useGetCategoriesQuery } from "../../service/categories.service";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const CommunityHeader = () => {
    const { data, isLoading } = useGetCategoriesQuery()
    console.log(data?.data)
    const [searchTerm, setSearchTerm] = useState("JavaScript");
  return (
    <div className="mt-4 px-4">
      <div className="flex items-center gap-4 ">
        <BiArrowBack size={25} /> <h1 className="font-semibold text-[1.5rem]">Community</h1>
      </div>

    <div className="flex mt-5 flex-col">
        <h2 className="text-[1.25rem] font-semibold ">Categories</h2>

        <div className="flex justify-between items-center flex-wrap">
              <div className="bg-white rounded-lg px-3 py-2">

                </div>  
        </div>
    </div>

    {/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label htmlFor="search" className="block text-lg font-medium text-gray-700 mb-2">
          Search:
        </label>
        <input
          list="options"
          id="search"
          name="search"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="options">
          {options.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      </div>
    </div> */}

    </div>
  );
};

export default CommunityHeader;

const options = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Django"
  ];
