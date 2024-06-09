import PropTypes from "prop-types";
import search from "../../assets/images/menu/search.svg";
import { FaRegUser } from "react-icons/fa";
import { useGetChatMessagesQuery } from "../../service/message.service";
import { format } from "timeago.js";
import { useState, useEffect, useRef } from "react";
import { useSendMessageMutation } from "../../service/message.service";
import rtkMutation from "../../utils/rtkMutation";
import like from "../../assets/images/chat/like.svg";
import add from "../../assets/images/chat/add.svg";
import microphone from "../../assets/images/chat/microphone.svg";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

function View({ chat, currentUserId }) {
  const socket = useRef(null);
  const conversationId = chat?.last_message?.conversation_id;
  const user = useSelector((state) => state.user?.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const scroll = useRef();

  const { data: messageList, isLoading } =
    useGetChatMessagesQuery(conversationId);

  useEffect(() => {
    if (messageList) {
      setMessages(messageList.data || []);
    }
  }, [messageList]);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_DOMAIN;

  useEffect(() => {
    const socketUrl = `${BASE_URL}?userId=${user._id}`;
    socket.current = io(socketUrl);

    socket.current.on("connect", () => {
      console.log("Connected to the socket server");
      const request = {
        organizationId: user?.current_organization || user?.organization_id[0],
      };
      socket.current.emit("online_org_users", request);
      socket.current.on("online_org_users", (data) => {
        console.log("Received online users:", data);
        setActiveUsers(data?.data);
      });
    });

    // Listen for 'onboard' event
    socket.current.on("onboard", (data) => {
      console.log("Onboard event received:", data);
    });

    socket.current.on("new_message", (newMessageData) => {
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    });

    socket.current.on("fetch_chat_messages", (newMessageData) => {
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
    });

    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, conversationId, BASE_URL]);

  const otherUserId = chat?.participants?.find(
    (user) => user?._id !== currentUserId
  )?._id;

  const [sendMessage, { error, isSuccess }] = useSendMessageMutation();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const data = { message: newMessage, recipient: otherUserId };
    const msg = {
      ...data,
      sender: currentUserId,
      organizationId: user?.current_organization || user?.organization_id[0],
      media: [],
    };

    try {
      await rtkMutation(sendMessage, data);
      setNewMessage("");
      socket.current.emit("new_message", msg);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setNewMessage("");
    } else if (error) {
      console.error(error.data.message);
    }
  }, [isSuccess, error]);

  if (!chat) {
    return (
      <div className="flex justify-center mt-3">
        Tap on a chat to start conversation...
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex justify-center mt-3">Loading messages...</div>;
  }

  const renderMediaContent = (media) => {
    return media.map((mediaItem) => {
      const mediaUrl = mediaItem.media_url;
      if (["jpeg", "jpg", "png"].includes(mediaItem.media_type)) {
        return (
          <img
            key={mediaItem._id}
            src={mediaUrl}
            alt="Chat media"
            width={200}
            height={200}
          />
        );
      } else if (mediaItem.media_type === "mp4") {
        return <video key={mediaItem._id} src={mediaUrl} controls />;
      } else {
        return (
          <p key={mediaItem._id}>
            Unsupported media type: {mediaItem.media_type}
          </p>
        );
      }
    });
  };

  const messageContent = messages.map((message) => {
    const isSender = message.sender._id === currentUserId;
    const messageContainerClassNames = isSender
      ? "sender-box max-w-60 w-auto self-start"
      : "recipient-box max-w-60 w-auto self-end";

    return (
      <div
        key={message._id}
        className={`${messageContainerClassNames} flex flex-col`}
        ref={scroll}
      >
        <div
          className={
            isSender ? "sender flex flex-wrap" : "recipient flex flex-wrap"
          }
        >
          {message.message}
          {renderMediaContent(message.media)}
        </div>
        <p className={`message-time ${isSender ? "self-start" : "self-end"}`}>
          {message.createdAt ? format(message.createdAt) : "Unknown time"}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="w-full flex-grow overflow-y-auto">
        <div className="flex flex-col px-2 gap-5 h-full overflow-y-auto">
          <div className="flex items-center gap-2 justify-between p-4 w-full h-[70px] border-b-[1px]">
            <div className="flex items-center gap-3">
              {chat.participants.find((user) => user._id === otherUserId)
                ?.photo_url ? (
                <div className="h-[35px] w-[35px] flex justify-center items-center">
                  <img
                    className="rounded-lg object-cover"
                    src={
                      chat.participants.find((user) => user._id === otherUserId)
                        ?.photo_url
                    }
                    alt=""
                  />
                </div>
              ) : (
                <FaRegUser size={23} />
              )}
              <p className="message-name">
                {
                  chat.participants.find((user) => user._id === otherUserId)
                    ?.display_name
                }
              </p>
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
                <img src={search} alt="search" />
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
          {messageContent}
        </div>
      </div>
      <div className="bg-white h-auto flex items-center px-4 mt-5">
        <div className="flex w-full items-center gap-2 justify-evenly p-2 px-2">
          <img src={add} alt="add" className="cursor-pointer mt-1" />
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            placeholder="Type a message"
            background="#F8F9FD"
          />
          {newMessage ? (
            <button
              className="p-2 border bg-[#34b53a] text-white rounded-md"
              onClick={handleSend}
            >
              Send
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <img src={microphone} alt="microphone" />
              <img src={like} alt="like" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

View.propTypes = {
  chat: PropTypes.shape({
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        display_name: PropTypes.string,
        photo_url: PropTypes.string,
      })
    ),
    last_message: PropTypes.shape({
      conversation_id: PropTypes.string,
    }),
  }),
  currentUserId: PropTypes.string.isRequired,
};

export default View;
