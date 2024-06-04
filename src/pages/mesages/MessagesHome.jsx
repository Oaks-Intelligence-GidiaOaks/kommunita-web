import MainLayout from "../../components/main/MainLayout";
import search from "../../assets/images/menu/search.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import MessageCard from "./../../components/messages/MessageCard";
import "./style.css";
import like from "../../assets/images/chat/like.svg";
import add from "../../assets/images/chat/add.svg";
import emoji from "../../assets/images/chat/emoji.svg";
import microphone from "../../assets/images/chat/microphone.svg";
import elipses from "../../assets/images/chat/elipses.svg";

const MessagesHome = () => {
  return (
    <MainLayout>
      <div className="chat-container flex justify-center gap-1 min-h-screen w-full pt-4">
        <div className="bg-white w-full max-w-[380px] message-list">
          <div className="flex justify-between items-center p-3 w-full  border-b-[1px]">
            <select
              name=""
              id=""
              className="chat-filter border-0 focus:outline-none focus:ring-0"
            >
              <option value="">All Messages</option>
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

          {[...Array(5)].map((_, index) => (
            <MessageCard key={index} />
          ))}
        </div>
        <div className="bg-[#EFF2FC] w-full">
          <div className="flex flex-col justify-between h-full">
            <div className="w-full mb-5">
              <div className="flex items-center gap-2 justify-between p-4 w-full h-[70px] border-b-[1px]">
                <div className="flex items-center gap-2">
                  <div className="h-[35px] w-[35px] justify-center items-center">
                    <img
                      className="rounded-lg object-cover"
                      src={avatar2}
                      alt=""
                    />
                  </div>
                  <p className="message-name">Jenifer Markus</p>
                </div>
                <div className="flex gap-3 items-center justify-between">
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
              <div className="flex justify-center pt-3">
                {" "}
                <div className="flex items-center mt-2 gap-2 message-timestamp pb-5">
                  <p>Today</p>
                  <p>|</p>
                  <p>05:30 PM</p>
                </div>
              </div>
              <div className="flex flex-col px-2 gap-5">
                <div className="sender-box flex flex-col gap-1">
                  <div className="sender">
                    I love jesus bcos He is GOd and Lord of ALL
                  </div>
                  <p className="message-time">04:45 PM</p>
                </div>

                <div className="sender-box flex flex-col gap-1">
                  <div className="self-end recipient">
                    I love jesus bcos He is GOd and Lord of ALL I love jesus
                    bcos He is GOd and Lord of ALL
                  </div>
                  <p className="self-end message-time">04:50 PM</p>
                </div>
              </div>
            </div>{" "}
            <div className="bg-white h-[70px] flex items-center px-4">
              <div className="flex w-full items-center gap-2 justify-evenly">
                <img src={emoji} alt="emoji" />
                <div className="bg-[#F8F9FD] flex items-center justify-center message-box gap-2 w-full">
                  <input
                    type="text"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 message-input h-auto"
                    placeholder="Type your message here"
                  />
                  <img src={add} alt="add" className="cursor-pointer mt-1" />
                </div>

                <div className="flex gap-4 items-center">
                  <img src={microphone} alt="microphone" />
                  <img src={like} alt="like" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesHome;
