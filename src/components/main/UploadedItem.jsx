import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

function UploadedItem({ item, onRemove, onItemSelect }) {
  if (!item) {
    return null;
  }

  const handleRemoveClick = () => {
    onRemove(item);
  };

  const handleItemClick = () => {
    onItemSelect(item);
  };

  return (
    <div className="relative">
      <div className="w-40 h-40 relative overflow-hidden shadow-md mr-4 mb-4 rounded-lg">
        {item.type.startsWith("image") ? (
          <img
            src={URL.createObjectURL(item)}
            alt=""
            className="object-cover w-full h-full cursor-pointer"
            onClick={handleItemClick}
          />
        ) : (
          <div
            className="w-full h-full cursor-pointer"
            onClick={handleItemClick}
          >
            <video
              src={URL.createObjectURL(item)}
              className="w-full h-full object-cover"
              controls={true}
            />
          </div>
        )}
        <button
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

UploadedItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default UploadedItem;
