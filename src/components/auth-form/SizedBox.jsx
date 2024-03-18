import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const SizedBox = ({ width, height }) => {
  return (
    <div
      className={twMerge(`bg-black, ${width ?? null}`, `${height ?? null}`)}
    />
  );
};

SizedBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SizedBox;