import { Spinner } from "flowbite-react";
import { useGetCategoriesWithStatQuery } from "../../service/categories.service";
import { BiArrowBack } from "react-icons/bi";
import ExploreTab from "./ExploreTab";
import { resetParams, setFilterParams } from "../../redux/slices/filter.slice";
import { useDispatch } from "react-redux";
import { all } from "../../assets/images";
import { useState } from "react";

const ExploreHeader = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams();
  const { data, isLoading } = useGetCategoriesWithStatQuery();

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      dispatch(resetParams());
    } else {
      const newParams = new URLSearchParams(params.toString());
      newParams.append('category', category);
      dispatch(setFilterParams(newParams.toString()));
    }
    // Set the active category
    setActiveCategory(category);
  };

  return (
    <div className="mt-2 px-4 flex flex-col overflow-y-auto">
      <div className="flex items-center gap-4">
        <BiArrowBack size={25} />
        <h1 className="font-semibold text-[1.5rem]">Explore</h1>
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
            <div
              className={`bg-white cursor-pointer flex gap-3 items-center min-w-[10.56rem] rounded-lg px-3 py-2 ${
                activeCategory === 'all' ? 'border-2 border-green-500' : ''
              }`}
              onClick={() => handleCategoryClick('all')}
            >
              <img src={all} alt={'all posts'} className="w-7 h-7 rounded-full" />
              <div className="flex flex-col">
                <small className="font-semibold text-[1rem]">All post</small>
                <small className="text-[#838383] text-[calc(1rem-2px)]"></small>
              </div>
            </div>

            {data?.data?.map((category) => (
              <div
                key={category?.category_id}
                className={`bg-white flex cursor-pointer gap-3 items-center min-w-[10.56rem] rounded-lg px-3 py-2 ${
                  activeCategory === category.category ? 'border-2 border-green-500' : ''
                }`}
                onClick={() => handleCategoryClick(category.category)}
              >
                <img
                  src={category?.photo_url}
                  alt={category?.category}
                  className="w-7 h-7 rounded-full"
                />
                <div className="flex flex-col">
                  <small className="font-semibold text-[1rem]">
                    {category?.category?.length > 12
                      ? `${category?.category.slice(0, 12)}...`
                      : category?.category}
                  </small>
                  <small className="text-[#838383] text-[calc(1rem-2px)]">
                    {category?.totalPosts} posts
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-2/3">
          <ExploreTab />
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default ExploreHeader;
