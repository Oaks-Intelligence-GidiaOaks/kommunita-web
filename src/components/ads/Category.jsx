import category1 from "../../assets/images/ads/category1.svg";
import category2 from "../../assets/images/ads/category2.svg";
import category3 from "../../assets/images/ads/category3.svg";
import category4 from "../../assets/images/ads/category4.svg";
import { useGetCategoriesQuery } from "../../service/categories.service";

function Category() {
  const { data: Category } = useGetCategoriesQuery();
  // console.log(Category);

  return (
    <div className="category-section mt-4 mb-5">
      <div className="p-4">
        <div className="flex justify-between">
          <p className="category">Categories</p>
          <button className="category-btn">See all</button>
        </div>

        <div className="flex justify-center flex-col gap-3 pt-4 pb-5">
          {Category?.data.map((cat, id) => (
            <div key={id} className="category-card relative">
              <img src={cat.photo_url} className="w-full h-[161px]" alt="" />
              <p className="absolute bottom-0 left-0 category-text ml-6 mb-6">
                {cat.name}
              </p>
            </div>
          ))}
          {/* <div className="category-card relative">
            <img src={category2} className="w-full h-[161px]" alt="" />
            <p className="absolute bottom-0 left-0 category-text ml-6 mb-6">
              Entertainment
            </p>
          </div>
          <div className="category-card relative">
            <img src={category3} className="w-full h-[161px]" alt="" />
            <p className="absolute bottom-0 left-0 category-text ml-6 mb-6">
              Tehnology
            </p>
          </div>
          <div className="category-card relative">
            <img src={category4} className="w-full h-[161px]" alt="" />
            <p className="absolute bottom-0 left-0 category-text ml-6 mb-6">
              Agriculture
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Category;
