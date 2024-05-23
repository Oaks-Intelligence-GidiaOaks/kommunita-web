import { useGetCategoriesQuery } from "../../service/categories.service";

function Category() {
  const { data: Category } = useGetCategoriesQuery();
  const category = Category?.data;

  return (
    <>
      {category && category.length > 0 && (
        <div className="category-section mt-4 mb-5">
          <div className="p-4">
            <div className="flex justify-between">
              <p className="category">Categories</p>
              <button className="category-btn">See all</button>
            </div>

            <div className="flex justify-center flex-col gap-3 pt-4 pb-5">
              {category.map((cat, id) => (
                <div
                  key={id}
                  className="category-card relative border shadow-lg rounded-sm"
                >
                  <img
                    src={cat.photo_url}
                    className="w-full h-[161px]"
                    alt=""
                  />

                  <div className="absolute bottom-0 left-0 p-2 w-full text-start bg-gray-800 bg-opacity-50 text-white text-sm">
                    {cat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
