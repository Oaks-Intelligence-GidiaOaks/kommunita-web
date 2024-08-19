const StorySkeleton = () => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse overflow-hidden"></div>
          <div className="ml-4">
            <h4 className="font-semibold text-white animate-pulse">
              Parsley Montana
            </h4>
            <p className="text-gray-400 text-sm animate-pulse">
              <span className="ml-1 animate-pulse">5h</span>
            </p>
          </div>
          <div className="mx-auto w-full rounded-lg overflow-hidden animate-pulse"></div>
        </div>
        {/* <RxDotsHorizontal className="text-white text-2xl" /> */}
      </div>

      <p className="text-sm font-semibold text-center mt-2 bg-gray-200 w-16 h-4 rounded animate-pulse"></p>
    </div>
  );
};

export default StorySkeleton;
