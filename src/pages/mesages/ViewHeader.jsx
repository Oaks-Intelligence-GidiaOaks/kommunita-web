import search from "../../assets/images/menu/search.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";

function ViewHeader() {
  return (
    <div className="flex items-center gap-2 justify-between p-4 w-full h-[70px] border-b-[1px]">
      <div className="flex items-center gap-2">
        <div className="h-[35px] w-[35px] flex justify-center items-center">
          <img className="rounded-lg object-cover" src={avatar2} alt="" />
        </div>
        <p className="message-name">Jenifer Markus</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="cursor-pointer flex items-center justify-center bg-white rounded-lg p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#FDC73D"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
        <div className="cursor-pointer flex items-center justify-center bg-white rounded-lg p-2">
          <img className="" src={search} alt="" />
        </div>
        <div className="cursor-pointer flex items-center justify-center bg-white rounded-lg p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ViewHeader;
