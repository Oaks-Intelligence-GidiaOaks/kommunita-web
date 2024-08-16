import PropTypes from "prop-types";
import search from "../../assets/images/menu/search.svg";
import { useGetChatMessagesQuery } from "../../service/message.service";
import { format } from "timeago.js";
import { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { format as formatDate, parseISO } from "date-fns";
import like from "../../assets/images/chat/like.svg";
import add from "../../assets/images/chat/add.svg";
import microphone from "../../assets/images/chat/microphone.svg";
import sound from "../../assets/sound.mp3";
import { Spinner } from "flowbite-react";
import "./style.css";
import avatar from "../../assets/images/user.png";
import { FaUser } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";

function View({ chat, currentUserId, setCurrentChat }) {
  const socket = useRef(null);
  const conversationId = chat?.last_message?.conversation_id;
  const user = useSelector((state) => state.user?.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const audioRef = useRef(new Audio(sound));
  const [isSending, setIsSending] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  useEffect(() => {
    console.log("Chat changed:", chat);
    setIsSending(true);
  }, [chat]);

  const { data: messageList, isLoading } =
    useGetChatMessagesQuery(conversationId);

  useEffect(() => {
    if (messageList) {
      setMessages(messageList.data || []);
      setIsSending(false);
    }
  }, [messageList]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_DOMAIN;
  // const BASE_URL = "https://bdf1-41-184-162-24.ngrok-free.app/";

  useEffect(() => {
    const socketUrl = `${BASE_URL}?userId=${user._id}`;
    socket.current = io(socketUrl);

    socket.current.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.current.on("new_message", (newMessageData) => {
      const { data } = newMessageData;
      console.log("socket data", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scroll.current?.scrollIntoView({ behavior: "smooth" });

      const senderID = data?.sender?._id;
      if (senderID !== currentUserId) {
        audioRef.current.play();
      } else {
        console.log("Message sent by myself");
      }
    });

    socket.current.on("fetch_chat_messages", (newMessageData) => {
      setMessages((prevMessages) => [...prevMessages, newMessageData?.data]);
    });

    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off("new_message");
      }
    };
  }, [user, conversationId, BASE_URL, currentUserId]);

  const otherUserId = chat?.participants?.find(
    (user) => user?._id !== currentUserId
  )?._id;

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = () => {
    setSendMessage(true);
    const msg = {
      message: newMessage,
      recipient: otherUserId,
      sender: currentUserId,
      organizationId: user?.current_organization || user?.organization_id[0],
      media: [],
    };

    try {
      socket.current.emit("new_message", msg);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendMessage(false);
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      console.log(" msg", message);

      const date = formatDate(parseISO(message.createdAt), "yyyy-MM-dd");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  const renderMediaContent = (media) => {
    return media.map((mediaItem) => {
      const mediaUrl = mediaItem.media_url;
      switch (mediaItem.media_type) {
        case "jpeg":
        case "jpg":
        case "png":
          return (
            <img
              key={mediaItem._id}
              src={mediaUrl}
              alt="Chat media"
              width={200}
              height={200}
            />
          );
        case "mp4":
          return <video key={mediaItem._id} src={mediaUrl} controls />;
        default:
          return (
            <p key={mediaItem._id}>
              Unsupported media type: {mediaItem.media_type}
            </p>
          );
      }
    });
  };

  const messageContent = Object.entries(groupedMessages).map(
    ([date, messagesForDate]) => (
      <div key={date} className="">
        <div className="message-timestamp flex justify-center py-5">
          {formatDate(parseISO(date), "MMMM dd, yyyy")}
        </div>
        {messagesForDate.map((message, index) => {
          const isSender = message?.sender?._id === currentUserId;
          const messageContainerClassNames = isSender
            ? "sender-box max-w-60 w-auto self-start"
            : "recipient-box max-w-60 w-auto self-end";
          return (
            <div key={index} className="flex flex-col pb-2">
              <div
                key={message._id}
                className={`${messageContainerClassNames} flex flex-col`}
                ref={scroll}
              >
                <div
                  className={
                    isSender
                      ? "sender flex flex-wrap shadow-lg"
                      : "recipient flex flex-wrap shadow-lg"
                  }
                >
                  {message.message}
                  {renderMediaContent(message.media)}
                </div>
                <p
                  className={`message-time ${
                    isSender ? "self-start" : "self-end"
                  }`}
                >
                  {message.createdAt
                    ? format(message.createdAt)
                    : "Unknown time"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    )
  );

  if (isLoading || isSending) {
    return (
      <div className="flex justify-center items-center mt-10 flex-col">
        <Spinner />
        <p className="pt-2 text-sm">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="w-full overflow-y-auto blank relative">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-4 py-0 pt-2.5 justify-between w-full h-[74px] z-0 bg-[#D8E3CC] rounded-tr-md overflow-hidden sticky top-0 shadow-md">
            <div className="flex gap-4 items-center justify-start">
              <ArrowLeft
                onClick={() => {
                  setCurrentChat(null);
                }}
                className="cursor-pointer hover:bg-[#efece7] md:hidden rounded-full"
              />
              <div className="flex items-center gap-3">
                {chat.participants.find((user) => user._id === otherUserId)
                  ?.photo_url ? (
                  <img
                    className="h-[35px] w-[35px] rounded-full border object-cover"
                    src={
                      chat.participants.find((user) => user._id === otherUserId)
                        ?.photo_url
                    }
                    alt=""
                  />
                ) : (
                  <div className="h-[35px] w-[35px] flex justify-center items-center rounded-lg bg-[#efece7] border">
                    {/* <img
                    className="rounded-lg object-cover"
                    src={avatar}
                    alt=""
                  /> */}
                    <FaUser size={24} className="text-gray-950/40" />
                  </div>
                )}
                <p className="message-name">
                  {
                    chat.participants.find((user) => user._id === otherUserId)
                      ?.display_name
                  }
                </p>
              </div>
            </div>
            {/* <div className="flex gap-3 items-center">
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
            </div> */}
          </div>
          {/* <div className=""> */}
          <div className="overflow-y-auto px-2 pb-20">
            <div className="">{messageContent}</div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="bg-white h-auto flex items-center px-2 sm:px-4 mt-5 absolute md:bottom-0 bottom-16 left-0 w-full">
        <div className="flex w-full items-center gap-2 justify-evenly p-2 px-0">
          {/* <img src={add} alt="add" className="cursor-pointer mt-1" /> */}
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            placeholder="Type a message"
            background="#F8F9FD"
            // cleanOnEnter
            // onEnter={handleSend}
          />
          {
            newMessage ? (
              <button
                className="p-2 border bg-[#34b53a] text-white rounded-md"
                disabled={sendMessage || !newMessage}
                onClick={handleSend}
              >
                {sendMessage ? "Sending..." : "Send"}
              </button>
            ) : null
            // <div className="flex gap-4 items-center">
            //   <img src={microphone} alt="microphone" />
            //   <img src={like} alt="like" />
            // </div>
          }
        </div>
      </div>
    </div>
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
