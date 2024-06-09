import MainLayout from "../../components/main/MainLayout";
import MessageCard from "./../../components/messages/MessageCard";
import "./style.css";
import View from "./View";
import Header from "./Header";
import Empty from "./Empty";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetConversationsQuery } from "../../service/message.service";
import { Spinner } from "flowbite-react";

const MessagesHome = () => {
  const user = useSelector((state) => state.user?.user);
  const [currentChat, setCurrentChat] = useState(null);

  const { data: chatList, isLoading } = useGetConversationsQuery();
  const list = chatList?.data;
  // console.log(list);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="loading-container flex justify-center mt-10">
          <Spinner />
        </div>
      ) : list?.length > 0 ? (
        <div className="chat-container flex min-h-screen w-full pt-4 pr-4">
          <div className="bg-white w-full max-w-[380px] message-list h-full">
            <Header />

            <div className="message-list-content h-full overflow-y-auto bg[#F8F9FD]">
              {list.map((chat) => (
                <MessageCard
                  key={chat._id}
                  message={chat?.last_message?.message || "null"}
                  timestamp={chat?.last_message?.createdAt}
                  conversationId={chat?.last_message?.conversation_id}
                  read={chat?.last_message?.read}
                  name={
                    chat?.last_message?.sender?.fullname ||
                    chat?.last_message?.sender?.display_name
                  }
                  photo={chat?.last_message?.sender?.photo_url}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                  currentUser={chat?.last_message?.sender?._id}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#EFF2FC] flex-grow flex flex-col">
            <div className="flex flex-col justify-between border h-full">
              <View chat={currentChat} currentUserId={user._id} />
            </div>
          </div>
        </div>
      ) : (
        // Display message if no chats available
        <Empty />
      )}
    </MainLayout>
  );
};

export default MessagesHome;
