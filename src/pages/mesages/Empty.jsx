import search from "../../assets/images/menu/search.svg";
import "./style.css";
import elipses from "../../assets/images/chat/elipses.svg";
import empty from "./initial.svg";
import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import { Modal } from "flowbite-react";
import InputEmoji from "react-input-emoji";
import rtkMutation from "../../utils/rtkMutation";
import { useSendInitialMessageMutation } from "../../service/message.service";
import { useState, useEffect } from "react";

const Empty = () => {
  const { data } = useGetWhoToFollowQuery();
  const users = data?.data || [];
  const [openModal, setOpenModal] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const filteredUsers = users.filter((user) =>
    user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeModal = () => {
    setNewMessage("");
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
    setSearchTerm("");
    console.log("Selected User ID:", user._id);
  };

  const [sendMessage, { error, isSuccess, isLoading: sendloading }] =
    useSendInitialMessageMutation();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
    console.log("user", selectedUser);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const data = { message: newMessage, recipient: selectedUser?._id };

    try {
      await rtkMutation(sendMessage, data);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setNewMessage("");
      setOpenModal(false);
      setSelectedUser(null);
    } else if (error) {
      console.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="chat-container flex min-h-screen w-full pt-4 pr-4">
        <div className="bg-white w-full max-w-[380px] message-list h-full">
          <div className="flex justify-between items-center p-3 w-full border-b-[1px]">
            <select
              name=""
              id=""
              className="chat-filter border-0 focus:outline-none focus:ring-0"
            >
              <option value="">All Messages</option>
              {/* <option value="">Unread</option>
              <option value="">Starred</option>
              <option value="">Archived</option>
              <option value="">Spam</option> */}
            </select>
            <button>
              <img src={elipses} alt="" />
            </button>
          </div>

          <div className="p-4 bg-white border-b-[1px]">
            <div className="flex p-1 rounded-xl bg-[#F8F9FD] w-full">
              <img className="ml-3 cursor-pointer" src={search} alt="" />
              <input
                type="text"
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 message-search"
                placeholder="Search and tap to start a new chat"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {searchTerm && (
              <div className="bg-white shadow border rounded mt-2 max-h-60 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 border-b"
                    onClick={() => handleUserSelect(user)}
                  >
                    <span className="text-sm">{user.display_name}</span>
                    <button
                      className="message-search p-2 border bg-[#34b53a] text-white rounded-md w-auto"
                      onClick={() => handleUserSelect(user)}
                    >
                      tap to chat
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="message-list-content bg[#F8F9FD] h-full">
            <div className="border-b p-3 flex justify-start">
              You have no message
            </div>
          </div>
        </div>

        <div className="bg-[#EFF2FC] flex-grow flex flex-col">
          <div className="flex flex-col justify-between border h-full">
            <div className="w-full flex-grow overflow-y-auto">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={empty}
                  alt=""
                  className="max-w-[268.54px] w-full h-[204.65]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && openModal && (
        <Modal dismissible show={openModal} onClose={closeModal}>
          <Modal.Body>
            <div className="flex justify-center pt-3">
              Say hi to {selectedUser?.display_name} with a wave 👋
            </div>
            <div className="bg-white h-auto flex items-center">
              <div className="flex w-full items-center gap-2 justify-evenly p-2 px-2">
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                  placeholder="Type a message"
                  background="#F8F9FD"
                />
                {newMessage ? (
                  <button
                    className="p-2 border bg-[#34b53a] text-white rounded-md"
                    disabled={sendloading}
                    onClick={handleSend}
                  >
                    {sendloading ? "Sending..." : "Send"}
                  </button>
                ) : null}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Empty;
