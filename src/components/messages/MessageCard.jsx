import PropTypes from "prop-types";
import "./style.css";
import clock from "../../assets/images/chat/clock.svg";
import { format } from "timeago.js";
import user from "../../assets/images/user.png";
import { CgMoreAlt } from "react-icons/cg";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import {
  useReadMessageMutation,
  useDeleteMessageMutation,
} from "../../service/message.service";

const MessageCard = ({
  message,
  timestamp,
  read,
  name,
  photo,
  onClick,
  currentUser,
  sender,
  active,
  chatId,
  lastMessageId,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const controls = useAnimation();

  const cardClassName = active ? "bg-[#F8F9FD] shadow" : "bg-white";

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const [readMessage] = useReadMessageMutation();
  const [removeChat] = useDeleteMessageMutation();

  const isRead = async (id) => {
    console.log("read", id);
    await readMessage(id);
    setShowOptions(false);
  };

  const deleteChat = async (id) => {
    console.log("delete", id);
    await removeChat(id);
    setShowOptions(false);
  };

  return (
    <div key={chatId}>
      <motion.div
        className={`chat-list-container flex gap-4 items-start hover:bg-[#F8F9FD] cursor-pointer relative ${cardClassName}`}
        onClick={onClick}
        onHoverStart={() => controls.start({ opacity: 1 })}
        onHoverEnd={() => controls.start({ opacity: 0 })}
      >
        <motion.span
          className="absolute right-2 top-1 text-xs font-medium px-1.5 py-0.5 rounded-full border bg-[#fff] text-black"
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick of the card
            toggleOptions();
          }}
        >
          <CgMoreAlt size={20} />
        </motion.span>
        {photo ? (
          <img
            src={photo}
            className="h-[35px] w-[35px] rounded-full border"
            alt=""
          />
        ) : (
          <img
            src={user}
            className="h-[35px] w-[35px] rounded-full border"
            alt=""
          />
        )}

        <div>
          <h2 className="message-card-name pb-1">{name}</h2>
          <p className="mb-4 message-card-content">{message}</p>
          <div className="flex items-center gap-1 message-timestamp">
            <img src={clock} alt="" />
            {format(timestamp)}
          </div>

          {read === false && sender !== currentUser ? (
            <span className="absolute right-3 bottom-3 text-xs font-medium px-1.5 py-0.5 rounded-full border bg-[#34b53a] text-white">
              1
            </span>
          ) : null}
        </div>

        {showOptions && (
          <div className="absolute right-3 top-8 bg-white border rounded shadow-lg p-2 z-10 text-sm">
            <ul>
              <li
                className="cursor-pointer hover:bg-gray-200 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  isRead(lastMessageId);
                }}
              >
                <div className="flex gap-2 items-center">
                  <HiOutlineMailOpen size={20} /> <button>Mark as read</button>
                </div>
              </li>
              <li
                className="cursor-pointer hover:bg-gray-200 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chatId);
                }}
              >
                <div className="flex gap-2 items-center">
                  <AiOutlineDelete size={20} /> <button>Delete</button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Prop validation using PropTypes
MessageCard.propTypes = {
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
  read: PropTypes.bool,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  onClick: PropTypes.func,
  currentUser: PropTypes.string,
  sender: PropTypes.string,
  active: PropTypes.bool,
  chatId: PropTypes.string,
  lastMessageId: PropTypes.string,
};

export default MessageCard;
