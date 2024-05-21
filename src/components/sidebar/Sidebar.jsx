import "./style.css";
import Profile from "./Profile";
import MenuItems from "./MenuItems.jsx";
import Likes from "./Likes.jsx";

function Sidebar() {
  return (
    <aside className="pb-10 w-[280px] p-4 h-full hidden md:block">
      <div className="main-sidebar-section">
        <Profile />
        <MenuItems />
      </div>
      {window.location.href != "/explore" && (
        <div className="hidden lg:block">
          <Likes />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
