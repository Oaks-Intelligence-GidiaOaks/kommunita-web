import React from "react";
import MainLayout from "../../components/main/MainLayout";
import search from "../../assets/images/menu/search.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import MessageCard from "./../../components/messages/MessageCard";

const MessagesHome = () => {
  return (
    <div>
      <MainLayout showNav={false}>
        <div className="grid grid-cols-12 justify-between w-full mt-3">
          <div className="col-span-12 md:col-span-6 px-3 ">
            <div className="flex justify-between items-center h-[70px] bg-white p-4 w-full  border-b-[1px]">
              <div className="flex items-center gap-2">
                <p className="font-semibold">All Messages</p>
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
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
            <div className="p-4 bg-white border-b-[1px]">
              <div className="flex p-1 rounded-xl bg-gray-100 w-full">
                <img className="ml-3 cursor-pointer" src={search} alt="" />
                <input
                  type="text"
                  className="w-full bg-gray-100 border-none focus:outline-none focus:ring-0 "
                  placeholder="Search or start a new chat"
                />
              </div>
            </div>
            {/* Individual char container */}
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
          </div>
          <div className="w-full col-span-6">
            {/* Message Header */}
            <div className="flex items-center gap-2 justify-between p-4 w-full h-[70px] border-b-[1px]">
              <div className="flex  items-center gap-2">
                <div>
                  <img className="rounded-lg" src={avatar2} alt="" />
                </div>
                <p className="font-semibold text-sm">Jenifer Markus</p>
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
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mt-2 gap-2 text-xs text-gray-400">
                <p>Today</p>
                <p>|</p>
                <p>05:30 PM</p>
              </div>
              <div className="w-full mt-5 relative]">
                <div className="flex flex-col">
                  <div className="bg-red-300  w-1/2 text-sm rounded-e-full rounded-t-full p-5">
                    I love jesus bcos He is GOd and Lord of ALL
                  </div>
                  <div className="bg-gray-300  w-1/2 text-sm rounded-s-full rounded-t-full p-5 self-end">
                    I love jesus bcos He is GOd and Lord of ALL I love jesus
                    bcos He is GOd and Lord of ALL
                  </div>
                  <div className="bg-red-300  w-1/2 text-sm rounded-e-full rounded-t-full p-5">
                    I love jesus bcos He is GOd and Lord of ALL
                  </div>
                  <div className="bg-gray-300  w-1/2 text-sm rounded-s-full rounded-t-full p-5 self-end">
                    I love jesus bcos He is GOd and Lord of ALL I love jesus
                    bcos He is GOd and Lord of ALL
                  </div>
                </div>
                {/* message text Input */}
                <div className="fixed bottom-0 right-0 w-[700px] bg-white h-[70px] flex items-center ">
                  <div className="flex px-2 w-full items-center justify-evenly">
                    <div className="rounded-full flex items-center cursor-pointer justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#2CC84A"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#fff"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                        />
                      </svg>
                    </div>
                    <div className="bg-gray-100 w-3/4 flex items-center rounded-2xl px-2">
                      <input
                        type="text"
                        className="w-full bg-gray-100 border-none focus:outline-none focus:ring-0 "
                        placeholder="Type your message here"
                      />
                      <div className="rounded-full flex items-center cursor-pointer bg-primary--bright-green justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#ffffff"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="rounded-full flex items-center cursor-pointer justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#2CC84A"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                        />
                      </svg>
                    </div>
                    <div className="rounded-full flex items-center cursor-pointer justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#2cc84a"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MessagesHome;
