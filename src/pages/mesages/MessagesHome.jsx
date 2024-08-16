import MainLayout from "../../components/main/MainLayout";
import MessageCard from "./../../components/messages/MessageCard";
import "./style.css";
import View from "./View";
import Header from "./Header";
// import Empty from "./Empty";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  useGetConversationsQuery,
  useReadMessageMutation,
} from "../../service/message.service";
import { Spinner } from "flowbite-react";
import chat from "../../assets/images/chat.gif";
import { io } from "socket.io-client";

const MessagesHome = () => {
  const user = useSelector((state) => state.user?.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const socket = useRef(null);

  const { data: chatList, isLoading } = useGetConversationsQuery();
  const list = chatList?.data;
  // console.log(list);

  useEffect(() => {
    setMessageList(list);
  }, [list]);

  const [readMessage] = useReadMessageMutation();

  const isRead = async (id) => {
    console.log(id);
    await readMessage(id);
  };

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_DOMAIN;

  useEffect(() => {
    const socketUrl = `${BASE_URL}?userId=${user._id}`;
    socket.current = io(socketUrl);

    socket.current.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.current.on("fetch_chat_messages", (newMessageData) => {
      setMessageList((prevMessages) => [...prevMessages, newMessageData?.data]);
    });

    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off("fetch_chat_messages");
      }
    };
  }, [user, BASE_URL]);

  return (
    <MainLayout>
      <div className="chat-container w-full h-full">
        <div className="h-full w-full flex pt-4 pr-0 ">
          <div
            className={
              ("bg-white w-full flex-1 md:flex-[0.4] md:max-w-[380px] point border-r",
              currentChat
                ? "hidden md:flex md:flex-col bg-white"
                : "flex flex-col flex-1 md:flex-[0.4] md:max-w-[380px] bg-white")
            }
          >
            <Header />
            <div className="overflow-y-auto bg-transparent">
              {isLoading ? (
                <div className="loading-container flex justify-center mt-10">
                  <Spinner />
                </div>
              ) : messageList?.length > 0 ? (
                messageList.map((chat) => {
                  const otherParticipant = chat.participants.find(
                    (participant) => participant._id !== user._id
                  );
                  const isLastMessageFromCurrentUser =
                    chat.last_message?.sender._id === user._id;

                  const displayMessage = isLastMessageFromCurrentUser
                    ? `Me: ${chat.last_message?.message || ""}`
                    : `${otherParticipant?.display_name || "Unknown"}: ${
                        chat.last_message?.message || ""
                      }`;

                  return (
                    <MessageCard
                      key={chat._id}
                      message={displayMessage}
                      timestamp={chat.last_message?.createdAt}
                      conversationId={chat.last_message?.conversation_id}
                      read={chat.last_message?.read}
                      name={otherParticipant?.display_name || "Unknown"}
                      photo={otherParticipant?.photo_url}
                      onClick={() => {
                        setCurrentChat(chat);
                        isRead(chat.last_message?._id);
                      }}
                      currentUser={user._id}
                      sender={chat.last_message?.sender._id}
                      active={currentChat?._id === chat._id}
                      chatId={chat.last_message?._id}
                      lastMessageId={chat.last_message?._id}
                    />
                  );
                })
              ) : (
                <div className="message-list-content bg[#F8F9FD] h-full">
                  <div className="border-b p-3 flex justify-start">
                    You have no message
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={
              ("flex border border-l-0 chat-window relative point",
              !currentChat
                ? "hidden md:flex-col md:flex-1 md:min-w-[380px] h-full"
                : "flex-1 w-full h-full")
            }
          >
            {currentChat ? (
              <View
                chat={currentChat}
                currentUserId={user._id}
                setCurrentChat={setCurrentChat}
              />
            ) : (
              <div
                className={
                  ("items-center justify-center h-full flex-col px-4 text-center",
                  !currentChat && "hidden md:flex md:flex-1")
                }
              >
                <img src={chat} alt="chat gif" />
                <strong className="empty-strong">
                  Pick up where you left off
                </strong>
                <small className="empty-small px-4">
                  Search or select a conversation and chat away.
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesHome;
