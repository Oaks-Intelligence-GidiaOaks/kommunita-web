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
  const conversationId = chat?.last_message?.conversation_id;
  const socket = useRef(null);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_DOMAIN;
  const user = useSelector((state) => state.user?.user);

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
    });

    // Listen for 'onboard' event
    socket.current.on("onboard", (data) => {
      console.log("Onboard event received:", data);
    });

    // Listen for 'error' event
    socket.current.on("error", (error) => {
      console.error("Error event received:", error);
    });

    socket.current.on("new_message", (newMessageData) => {
      // setMessages((prevMessages) => [...prevMessages, newMessageData]);
      console.log("msg", newMessageData);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, BASE_URL]);

  const otherUserId = chat?.participants?.find(
    (user) => user?._id !== currentUserId
  )?._id;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { data: messageList, isLoading } =
    useGetChatMessagesQuery(conversationId);
  // console.log(messageList);

  useEffect(() => {
    setMessages(messageList);
  }, [messageList]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const [sendMessage, { error, isSuccess }] = useSendMessageMutation();

  const handleSend = async (e) => {
    e.preventDefault();
    const data = { message: newMessage, recipient: otherUserId };
    const { newData } = await rtkMutation(sendMessage, data);
    setMessages((prevMessages) => [...prevMessages, newData.data]);
    // setMessages([...messages, newData.data]);
  };

  useEffect(() => {
    if (isSuccess) {
      setNewMessage("");
      console.log("message sent successfully!");
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    } else if (error) {
      console.error(error.data.message);
    }
  }, [isSuccess, error]);

  const scroll = useRef();

  // Handle potential missing chat data
  if (!chat) {
    return (
      <div className="flex justify-center mt-3">
        Tap on a chat to start conversation...
      </div>
    );
  }

  // Check if messages are loading
  if (isLoading) {
    return <div className="flex justify-center mt-3">Loading messages...</div>;
  }

  const messageContent = messages?.data?.map((message) => {
    const isSender = message.sender._id === currentUserId; // Check for recipient using currentUserId
    const messageContainerClassNames = `
      ${isSender ? "sender-box" : "recipient-box"}
      flex flex-col gap-1
    `;
    const mediaContent = message.media?.map((mediaItem) => {
      const mediaUrl = mediaItem.media_url;
      if (
        mediaItem.media_type === "jpeg" ||
        mediaItem.media_type === "jpg" ||
        mediaItem.media_type === "png"
      ) {
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
        // Handle video example
        return <video key={mediaItem._id} src={mediaUrl} controls />;
      } else {
        return (
          <p key={mediaItem._id}>
            Unsupported media type: {mediaItem.media_type}
          </p>
        );
      }
    });

    return (
      <div
        key={message._id}
        className={messageContainerClassNames}
        ref={scroll}
      >
        <div className={isSender ? "sender" : "recipient"}>
          {message.message} {/* Use message.message for clarity */}
        </div>
        <p className={`message-time ${isSender ? "self-end" : ""}`}>
          {message.createdAt ? format(message.createdAt) : "Unknown time"}{" "}
          {/* Handle missing timestamp */}
        </p>
        {/* {mediaContent} */}
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
                        .photo_url
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
  }),
  currentUserId: PropTypes.string,
};

export default View;
