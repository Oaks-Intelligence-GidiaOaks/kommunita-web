import MainLayout from "../../components/main/MainLayout";
import MessageCard from "./../../components/messages/MessageCard";
import "./style.css";
import View from "./View";
import Header from "./Header";
import Empty from "./Empty";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useGetConversationsQuery } from "../../service/message.service";
import { Spinner } from "flowbite-react";

const MessagesHome = () => {
  const user = useSelector((state) => state.user?.user);

  // call socket
  const socket = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const { data: chatList, isLoading } = useGetConversationsQuery();
  const list = chatList?.data;
  // console.log(list);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_DOMAIN;

  // Connect to Socket.io
  useEffect(() => {
    const socketUrl = `${BASE_URL}?userId=${user._id}`;
    socket.current = io(socketUrl);

    // Listen for the 'connect' event to know when the connection is established
    socket.current.on("connect", () => {
      console.log("Connected to the socket server");

      // Send the organizationId to the server
      const request = {
        organizationId: user?.current_organization || user?.organization_id[0],
      };
      socket.current.emit("online_org_users", request);

      socket.current.on("online_org_users", (data) => {
        console.log("Received online users:", data);
        setOnlineUsers(data?.data);
      });
    });

    // Listen for 'onboard' event
    socket.current.on("onboard", (data) => {
      console.log("Onboard event received:", data);
    });

    // Listen for 'error' event
    socket.current.on("error", (error) => {
      console.error("Error event received:", error);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, BASE_URL]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.participants.find(
      (participants) => participants?._id !== user._id
    );
    const online = onlineUsers.find((user) => user.user_id === chatMember);
    return online ? true : false;
  };

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
                  online={checkOnlineStatus(chat)}
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
