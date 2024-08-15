import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

function UploadStories({ item, onRemove, onItemSelect }) {
  // console.log(item);
  // if (!item || !item.name) {
  //   return null;
  // }
  if (!item || (!item.name && !item.type)) {
    return null;
  }

  const handleRemoveClick = () => {
    onRemove(item);
  };

  const handleItemClick = () => {
    onItemSelect(item);
  };

  return (
    <div className="relative overflow-hidden shadow-lg mr-4 mb-4 rounded-lg flex flex-grow">
      {item.type.startsWith("image") ? (
        <img
          src={URL.createObjectURL(item) || item}
          alt=""
          className="object-cover w-full h-full cursor-pointer"
          onClick={handleItemClick}
        />
      ) : (
        <div className="w-full h-full cursor-pointer" onClick={handleItemClick}>
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
  );
}

UploadStories.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default UploadStories;
