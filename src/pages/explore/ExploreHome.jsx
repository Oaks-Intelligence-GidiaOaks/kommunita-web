import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { data } from "../../components/explore/category";
import search from "../../assets/images/menu/search.svg";
import ExploreMain from "../../components/explore/Main";
import Likes from "./../../components/sidebar/Likes";
import Posts from "../../components/main/Posts";
import ExploreNav from "../../components/explore/ExploreNav";
import CategoryCard from "../../components/explore/CategoryCard";
// import ScrollAdds from './../../components/ads/ScrollAdds';
import { AdsOnly } from "./../../components/ads/Ads";
import MainLayout from "../../components/main/MainLayout";
import MobileProfile from "./../../components/mobile/MobileProfile";
import {
  useGetCategoriesQuery,
  useGetCategoriesWithStatQuery,
} from "../../service/categories.service";
import { BeatLoader } from "react-spinners";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import Modals from "../../components/modals/Modal";
import GeneralSearch from "../../components/search/GeneralSearch";
import { useSearchGeneralMutation } from "../../service/search.service";
import {
  useGetExploreDiaryQuery,
  useGetExplorePostImagesQuery,
  useGetExplorePostQuery,
  useGetExplorePostVideosQuery,
} from "../../service/explore.service";
import { Spinner } from "flowbite-react";
import getTimeAgoString from "../../utils/getTimeAgoString";

const ExploreHome = () => {
  const { data: Category } = useGetCategoriesWithStatQuery();
  // const { data: Category } = useGetCategoriesQuery();
  const { data: postData, isLoading: postLoading } = useGetExplorePostQuery();
  const { data: imagesData, isLoading: imagesLoading } =
    useGetExplorePostImagesQuery();
  console.log(imagesData?.data);
  const { data: videosData, isLoading: videosLoading } =
    useGetExplorePostVideosQuery();
  const { data: diaryData, isLoading: diaryLoading } =
    useGetExploreDiaryQuery();
  // console.log("ExploreData: ", diaryData?.data);

  const [flPopular, setFlPopular] = useState(null);
  const [flDiaries, setFlDiaries] = useState(null);
  const [flVideos, setFlVideos] = useState(null);
  const [flImages, setFlImages] = useState(null);
  const [newCat, setNewCat] = useState("");

  // console.log("Categories: ", Category?.data);
  const [selectedCategory, setCategory] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
  const [searchedData, setSearchedData] = useState(null);

  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [filterString, setFilterString] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  // Handle tab
  const [activeTab, setActiveTab] = useState("popular");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-5 px-4";

  useEffect(() => {
    if (filterString) {
      setFilteredCategory(
        Category?.data.filter((ct) =>
          // ct.categoryName.toLowerCase().includes(filterString.toLowerCase())
          ct.category.toLowerCase().includes(filterString.toLowerCase())
        )
      );
    } else {
      setFilteredCategory(Category?.data);
    }
  }, [filterString, Category]);

  useEffect(() => {
    if (newCat) {
      // console.log(newCat);
      // console.log(diaryData?.data[1].category);
      setFlDiaries(diaryData?.data?.filter((dt) => dt.category == newCat));
      setFlPopular(postData?.data?.filter((dt) => dt.category == newCat));
      setFlImages(imagesData?.data?.filter((dt) => dt.category == newCat));
      setFlVideos(videosData?.data?.filter((dt) => dt.category == newCat));
    } else {
      console.log("No category selected");
      setFlPopular(postData?.data);
      setFlDiaries(diaryData?.data);
      setFlVideos(videosData?.data);
      setFlImages(imagesData?.data);
    }
    // console.log("Diaries: ", flDiaries);
  }, [newCat, postData, activeTab]);

  // Select category
  const selectCategory = (cat) => {
    // console.log(cat._id);
    setCategory(cat.category);
    setNewCat(cat.category);
  };

  const unSelectCategory = () => {
    setCategory("");
    setNewCat("");
  };

  // handle Search function
  const handleSearch = async () => {
    console.log(filterString);
    // setSearching(true);
    // // console.log(searchString);
    // if (searchString) {
    //   const postData = {
    //     search_term: searchString,
    //   };
    //   try {
    //     const res = await rtkMutation(searchGeneral, { ...postData });
    //     console.log(res.data);
    //     setSearchedData(res.data);
    //     setOpenSearchModal(true);
    //   } catch (error) {
    //     console.error("Error making search: ", error);
    //     showAlert("Oops", "An error occurred while searching content", "error");
    //   }
    // }
    // setSearching(false);
  };

  return (
    <MainLayout showNav={false}>
      <div className="flex flex-col w-full pt-4 pr-4">
        <div
          onClick={() => unSelectCategory()}
          className="flex gap-2 items-center cursor-pointer"
        >
          {/* {selectedCategory && ( */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <p className="text-2xl font-bold text-[#2d2b2b]">
            {selectedCategory || <span>Explore</span>}
          </p>
        </div>
        <div className="mt-16">
          {!selectedCategory && (
            <div className="">
              <div className="flex items-center justify-between">
                <p className="font-semibold mb-5 text-[#2d2b2b] text-[20px]">
                  Categories
                </p>
                <div className="search">
                  <div className="flex search-box">
                    <input
                      type="text"
                      className="search-input w-[331px] focus:outline-none focus:ring-0 "
                      placeholder="Search"
                      value={filterString}
                      onChange={(e) => setFilterString(e.target.value)}
                    />
                    <div className="cursor-pointer" onClick={handleSearch}>
                      {searching ? (
                        <BeatLoader color="#ffffff" loading={true} />
                      ) : (
                        <img src={search} alt="" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-4 gap-5 items-center w-full mb-10"> */}
              {filteredCategory && (
                <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-10 items-center w-full mb-10">
                  {filteredCategory?.map((dt, index) => (
                    <CategoryCard
                      key={index}
                      cat={dt}
                      onclick={selectCategory}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="mt-7">
            {/* NAVIGATION BAR */}
            {/* <ExploreNav /> */}
            <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px sm:text-xl sm:font-semibold text-gray-400 text-center gap-2 md:gap-5 lg:gap-10"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 rounded-t-lg  ${
                      activeTab === "popular"
                        ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                        : "text-[#8D92AC]"
                    }`}
                    onClick={() => handleTabClick("popular")}
                    role="tab"
                    aria-controls="popular"
                    aria-selected={activeTab === "popular"}
                  >
                    Popular Posts
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 rounded-t-lg  ${
                      activeTab === "diaries"
                        ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                        : "text-[#8D92AC]"
                    }`}
                    onClick={() => handleTabClick("diaries")}
                    role="tab"
                    aria-controls="diaries"
                    aria-selected={activeTab === "diaries"}
                  >
                    Diaries
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 rounded-t-lg ${
                      activeTab === "videos"
                        ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                        : "text-[#8D92AC]"
                    }`}
                    onClick={() => handleTabClick("videos")}
                    role="tab"
                    aria-controls="videos"
                    aria-selected={activeTab === "videos"}
                  >
                    Videos
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 rounded-t-lg  ${
                      activeTab === "images"
                        ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                        : "text-[#8D92AC]"
                    }`}
                    onClick={() => handleTabClick("images")}
                    role="tab"
                    aria-controls="images"
                    aria-selected={activeTab === "images"}
                  >
                    Images
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Page */}
        <div className="overflow-x-hidden">
          <div className="grid grid-cols-12 justify-between w-full">
            <div className="-ml-3 col-span-12 lg:col-span-9">
              {/* Popular section */}
              <div
                className={`${activeTab === "popular" ? "" : "hidden"}`}
                id="popular"
                role="tabpanel"
                aria-labelledby="popular-tab"
              >
                {postLoading ? (
                  <div className="flex items-center justify-center mt-10">
                    <Spinner />
                  </div>
                ) : (
                  <ExploreMain exploreData={flPopular} />
                )}
              </div>

              {/* Diaries Section */}
              <div
                className={`${activeTab === "diaries" ? "" : "hidden"}`}
                id="diaries"
                role="tabpanel"
                aria-labelledby="diaries-tab"
              >
                {diaryLoading ? (
                  <div className="flex items-center justify-center mt-10">
                    <Spinner />
                  </div>
                ) : (
                  <ExploreMain exploreData={flDiaries} />
                )}
                {/* {diaryData?.data && (
                <div className="mt-3 px-3 main-wrapper w-full pb-10">
                  {[...diaryData?.data]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ) // Sort posts by latest first
                    .map(
                      (post, index) =>
                        post.user_id && (
                          <Posts
                            key={index}
                            fullname={post.user_id.display_name}
                            username={post.user_id.username}
                            verifiedUser={false} // You need to adjust this based on your data
                            postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
                            // postTime={moment(post.createdAt).fromNow()} // Assuming createdAt is the post time
                            content={post.content}
                            media_urls={post.media_urls}
                            post_id={post._id}
                            comment={post.comment}
                            repost={post.repost}
                            share={post.share}
                            reaction={post.reaction}
                            avatar={post.user_id.photo_url || avatar2} // You need to provide the avatar source
                          />
                        )
                    )}
                </div>
              )} */}
              </div>

              {/* Videos Section */}
              <div
                className={`${activeTab === "videos" ? "" : "hidden"}`}
                id="videos"
                role="tabpanel"
                aria-labelledby="videos-tab"
              >
                {videosLoading ? (
                  <div className="flex items-center justify-center mt-10">
                    <Spinner />
                  </div>
                ) : (
                  <ExploreMain exploreData={flVideos} />
                )}
              </div>

              {/* Images Section */}
              <div
                className={`${activeTab === "images" ? "" : "hidden"}`}
                id="images"
                role="tabpanel"
                aria-labelledby="images-tab"
              >
                {imagesLoading ? (
                  <div className="flex items-center justify-center mt-10">
                    <Spinner />
                  </div>
                ) : (
                  <ExploreMain exploreData={flImages} />
                )}
              </div>
            </div>

            {/* sidebar */}
            <div className="hidden lg:block col-span-3 -mt-2">
              <Likes />
              <div className="mt-3">
                <AdsOnly />
              </div>
            </div>
          </div>
        </div>
        {openSearchModal && (
          <Modals
            title={searchString}
            openModal={openSearchModal}
            modalSize="2xl"
            onClose={() => setOpenSearchModal(false)}
          >
            <GeneralSearch data={searchedData} />
          </Modals>
        )}
      </div>
    </MainLayout>
  );
};

export default ExploreHome;
