import React from "react";
import catImg from "../../assets/images/defaultcategory.png";

const CategoryCard = ({ cat, onclick }) => {
  return (
    <div
      onClick={() => onclick(cat)}
      className="cursor-pointer rounded-lg bg-white p-4 flex gap-3 items-center h-[70px] w-[210px]"
    >
      <div className="h-[32px] w-[32px]">
        <img
          src={cat?.photo_url || catImg}
          alt="icon"
          className="object-cover w-[32px] h-[32px]"
          width={32}
          height={32}
        />
      </div>
      <div>
        <h2 className="font-semibold text-lg">
          {cat?.categoryName || cat?.category || cat?.name}
        </h2>
        <p className="text-primary-dark-gray font-semibold">
          {cat?.totalPosts} posts
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
