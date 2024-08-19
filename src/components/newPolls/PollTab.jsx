import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const PollTab = () => {
  const selecteddiv = useLocation();
  const [selected, setSelectedDiv] = useState(selecteddiv);

  const handleDivClick = (divId) => {
    setSelectedDiv(divId);
  };

  useEffect(() => {
    setSelectedDiv(selecteddiv);
  }, [selecteddiv]);
  return (
    <div className=" mt-8 px-5">
      <h2 className="font-semibold text-2xl mb-10">Polls</h2>
      <div className="flex flex-col mt-3 items-center">
        <ul className="flex items-center gap-10 w-full" role="tablist">
          <li
            className={`pb-1  ${
              selected?.pathname === "/polls"
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(1);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes()
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              } `}
              to="/polls"
            >
              Active Polls
            </Link>
          </li>
          {/* <li
            className={`pb-1  ${
              selected?.pathname?.includes("poll_history")
                ? "border-[#3D7100] text-[#3D7100] border-b-4 px-3 font-semibold"
                : "text-[#8D92AC]"
            }  `}
            onClick={() => {
              handleDivClick(2);
            }}
          >
            <Link
              className={`text-[1.25rem] font-normal${
                selected?.pathname?.includes('poll_history')
                  ? "text-[#3d7100] font-bold"
                  : "font-normal"
              }`}
              to="poll_history"
            >
              Poll History
            </Link>
          </li> */}
        </ul>
      </div>
      <hr className="divider" />
    </div>
  );
};

export default PollTab;
