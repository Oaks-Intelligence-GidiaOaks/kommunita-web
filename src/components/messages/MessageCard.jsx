import React from "react";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import "./style.css";
import clock from "../../assets/images/chat/clock.svg";

const MessageCard = ({ message }) => {
  return (
    <div className="chat-list-container flex gap-4 items-start bg-white hover:bg-[#F8F9FD] cursor-pointer">
      <img src={avatar2} className="h-[35px] w-[35px]" alt="" />

      <div>
        <h2 className="message-card-name pb-1">Jennifer Markus</h2>
        <p className="mb-4 message-card-content">
          Hey! were you able to hit the shores of valhala or your couldn't cross
          the four walls of cantata
        </p>
        <div className="flex items-center gap-1 message-timestamp">
          <img src={clock} alt="" />
          <p>Today</p>
          <p>|</p>
          <p>05:30 PM</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
