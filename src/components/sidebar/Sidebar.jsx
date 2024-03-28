import "./style.css";
import Profile from "./Profile";
import MenuItems from "./MenuItems.jsx";
import Likes from "./Likes.jsx";

function Sidebar() {
  return (
    <div className="pb-10 w-full">
      <div className="main-sidebar-section">
        <Profile />
        <MenuItems />
      </div>

      <Likes />
    </div>
  );
}

export default Sidebar;
