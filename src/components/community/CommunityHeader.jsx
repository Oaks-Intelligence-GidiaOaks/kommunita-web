import { Spinner } from "flowbite-react";
import { useGetCategoriesQuery } from "../../service/categories.service";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import KommunityTab from "./KommunityTab";

const CommunityHeader = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <div className="mt-2 px-4 flex flex-col overflow-y-auto ">
      <div className="flex items-center gap-4">
        <BiArrowBack size={25} />
        <h1 className="font-semibold text-[1.5rem]">Kommunity</h1>
      </div>
      <div className="flex mt-2 flex-col">
        <h2 className="text-[1.25rem] font-semibold">Categories</h2>

        {isLoading ? (
          <Spinner />
        ) : data?.data?.length === 0 || data?.data === undefined ? (
          <div>
            <p>No categories found</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mt-5">
            {data?.data?.map((category) => (
              <div
                key={category.id}
                className="bg-white flex gap-3 items-center min-w-[10.56rem] rounded-lg px-3 py-2"
              >
                <img
                  src={category?.photo_url}
                  alt={category?.name}
                  className="w-7 h-7 rounded-full"
                />
                <div className="flex flex-col">
                  <small className="font-semibold text-[1rem] ">
                    {category?.name.length > 12
                      ? `${category?.name.slice(0, 12)}...`
                      : category?.name}
                  </small>
                  <small className="text-[#838383] text-[calc(1rem-2px)] ">
                    {category?.postCount} posts
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-2/3">
          <KommunityTab />
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default CommunityHeader;
