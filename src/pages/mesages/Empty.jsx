import MainLayout from "../../components/main/MainLayout";
import search from "../../assets/images/menu/search.svg";
import "./style.css";
import elipses from "../../assets/images/chat/elipses.svg";
import empty from "./initial.svg";

const Empty = () => {
  return (
    <div className="chat-container flex min-h-screen w-full pt-4 pr-4">
      <div className="bg-white w-full max-w-[380px] message-list h-full">
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

        <div className="message-list-content bg[#F8F9FD] h-full">
          <div className="border-b p-3 flex justify-start">
            You have no message
          </div>
        </div>
      </div>

      <div className="bg-[#EFF2FC] flex-grow flex flex-col">
        <div className="flex flex-col justify-between border h-full">
          <div className="w-full flex-grow overflow-y-auto">
            <div className="flex flex-col justify-center items-center">
              <img
                src={empty}
                alt=""
                className="max-w-[268.54px] w-full h-[204.65]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;
