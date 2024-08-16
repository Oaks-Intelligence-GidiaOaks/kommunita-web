import React, { useEffect, useRef } from "react";
import { LiaTimesCircle } from "react-icons/lia";
import NotificationsHome from "./NotificationsHome";
import NotificationsModalContent from "./NotificationModalContent";

const NotificationModal = ({ onClick }) => {
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return (
    <div className="fixed top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex items- justify-end">
      <div
        ref={modalRef}
        className="w-[25rem] flex flex-col min-h-[50vh] bg-white rounded-t mt-10 mr-5"
      >
        <div className="flex justify-between items-center px-5 py-4">
          <h3 className="text-lg text-[#3D7100] font-semibold">
            Notifications
          </h3>
          <button
            className="text-sm font-semibold text-gray-600"
            onClick={onClick}
          >
            <LiaTimesCircle size={30} />
          </button>
        </div>
        <div className="overflow-y-auto custom-scrollbar">
          <NotificationsModalContent />
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
