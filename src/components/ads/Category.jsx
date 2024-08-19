import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../service/categories.service";
import { useDispatch } from "react-redux";
import { setFilterParams } from "../../redux/slices/filter.slice";

function Category() {
  const { data: Category } = useGetCategoriesQuery();
  const category = Category?.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams();


  const location = useLocation()
  if(location.pathname.includes('/explore') || location.pathname.includes('/profile')){
    return null
  }

  console.log(category)


  const handleCategoryClick = (category) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.append('category', category);
    dispatch(setFilterParams(newParams.toString()));
   navigate('/explore')
console.log(category)
  };

  return (
    <>
      {category && category.length > 0 && (
        <div className="category-section mb-5">
          <div className="p-4">
            <div className="flex justify-between">
              <p className="category">Categories</p>
              <button className="category-btn">
                <Link to={'/explore'}>
                See all
                </Link>
              </button>
            </div>

            <div className="flex justify-center flex-col gap-3 pt-4 pb-5">
              {category?.slice(0,3).map((cat, id) => (
                <div
                  key={id}
                  className="category-card relative border shadow-lg rounded-sm"
                  onClick={()=>handleCategoryClick(cat?.name)}
                >
                  <img
                    src={cat?.photo_url}
                    className="w-full h-[161px] rounded-md"
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
