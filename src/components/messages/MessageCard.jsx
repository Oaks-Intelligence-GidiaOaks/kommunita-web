import PropTypes from "prop-types";
import "./style.css";
import clock from "../../assets/images/chat/clock.svg";
import { FaRegUser } from "react-icons/fa";
import { format } from "timeago.js";

const MessageCard = ({
  message,
  timestamp,
  conversationId,
  read,
  name,
  photo,
  onClick,
}) => {
  return (
    <div
      className="chat-list-container flex gap-4 items-start bg-white hover:bg-[#F8F9FD] cursor-pointer relative"
      onClick={onClick} // Add onClick handler to the container
    >
      {photo ? (
        <img src={photo} className="h-[35px] w-[35px]" alt="" />
      ) : (
        <FaRegUser size={23} />
      )}

      <div>
        <h2 className="message-card-name pb-1">{name}</h2>
        <p className="mb-4 message-card-content">{message}</p>
        <div className="flex items-center gap-1 message-timestamp">
          <img src={clock} alt="" />
          {format(timestamp)}
        </div>
      </div>
    </div>
  );
};

// Prop validation using PropTypes
MessageCard.propTypes = {
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired,
  read: PropTypes.bool,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  onClick: PropTypes.func,
};

export default MessageCard;
