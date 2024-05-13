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
                <div key={id} className="category-card relative">
                  <img
                    src={cat.photo_url}
                    className="w-full h-[161px]"
                    alt=""
                  />
                  <p className="absolute bottom-0 left-0 category-text ml-6 mb-6">
                    {cat.name}
                  </p>
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
