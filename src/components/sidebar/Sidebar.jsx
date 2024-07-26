import "./style.css";
import Profile from "./Profile";
import MenuItems from "./MenuItems.jsx";
import Likes from "./Likes.jsx";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname);
  return (
    <aside className="mb-10 p-4 hidden md:block">
      <div className="main-sidebar-section">
        <Profile />
        <MenuItems />
      </div>
      {pathname != "/explore" && (
        <div className="hidden lg:block">
          <Likes />
        </div>
      )}
      {pathname == "/explore" && (
        <div className="lg:hidden block">
          <Likes />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
