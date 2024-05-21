import "./style.css";
import Profile from "./Profile";
import MenuItems from "./MenuItems.jsx";
import Likes from "./Likes.jsx";

function Sidebar() {
  return (
    <div className="pb-10 w-[280px] xl:w-[250px]">
      <div className="main-sidebar-section">
        <Profile />
        <MenuItems />
      </div>
      {window.location.href != "/explore" && (
        <div className="hidden lg:block">
          <Likes />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
