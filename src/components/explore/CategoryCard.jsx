import React from "react";

const CategoryCard = ({ cat, onclick }) => {
  return (
    <div
      onClick={() => onclick(cat.title)}
      className="cursor-pointer rounded-lg bg-white p-2 flex gap-3 items-center"
    >
      <div className="h-[32px] w-[32px]">
        <img src={cat.icon} alt="icon" width={32} height={32} />
      </div>
      <div>
        <h2 className="font-semibold text-lg">{cat.title}</h2>
        <p className="text-primary-dark-gray">{cat.count}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
