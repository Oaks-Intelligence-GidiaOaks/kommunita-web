import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import close from "./close.svg";
import "./style.css";

function Modals({ openModal, modalSize, onClose, btnText, children }) {
  return (
    <Modal
      show={openModal}
      size={modalSize}
      onClose={onClose}
      style={{ borderRadius: "5.489px", background: "#FFF", padding: "0" }}
    >
      <div className="flex justify-end mr-6 py-4">
        <button className="modal-close rounded-full ring-1" onClick={onClose}>
          <img src={close} alt="" />
        </button>
      </div>

      <Modal.Body>
        <div className="pb-5 p-3">{children}</div>

        <div className="flex justify-center pb-10 p-3">
          <button className="modal-btn w-full">{btnText}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

// PropTypes definition
Modals.propTypes = {
  openModal: PropTypes.bool.isRequired,
  modalSize: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modals;
