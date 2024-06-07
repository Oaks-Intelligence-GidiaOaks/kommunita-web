import search from "../../assets/images/menu/search.svg";
import elipses from "../../assets/images/chat/elipses.svg";

function Header() {
  return (
    <>
      <div className="flex justify-between items-center p-3 w-full border-b-[1px]">
        <select
          name=""
          id=""
          className="chat-filter border-0 focus:outline-none focus:ring-0"
        >
          <option value="">All Messages</option>
          <option value="">Unread</option>
          <option value="">Starred</option>
          <option value="">Archived</option>
          <option value="">Spam</option>
        </select>
        <button>
          <img src={elipses} alt="" />
        </button>
      </div>

      <div className="p-4 bg-white border-b-[1px]">
        <div className="flex p-1 rounded-xl bg-[#F8F9FD] w-full">
          <img className="ml-3 cursor-pointer" src={search} alt="" />
          <input
            type="text"
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 message-search"
            placeholder="Search or start a new chat"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
