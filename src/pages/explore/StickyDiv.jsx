import { useState, useEffect } from "react";
import "./StickyDiv.css"; // Import your CSS file for styling
// import { PropTypes } from "prop-types";

const StickyDiv = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this value based on where you want the div to become sticky
      if (scrollPosition >= 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-div ${isSticky ? "sticky" : ""}`}>{children}</div>
  );
};

// StickyDiv.propTypes = {
//   children: PropTypes.children.isRequired,
// };

export default StickyDiv;
