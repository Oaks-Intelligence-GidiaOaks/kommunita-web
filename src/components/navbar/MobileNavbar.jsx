import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { RiHome5Line } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { LuSquareStack } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";

const NavItem = ({ to, icon: Icon, label, exact }) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#3D7100]";

  return (
    <Link to={to}>
      <div className="items flex flex-col justify-center items-center w-[70px]">
        <div
          className={`flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full ${
            isActive ? "text-[#3D7100]" : ""
          }`}
        >
          <Icon size={20} />
        </div>
        <p className={isActive ? aL : nAL}>{label}</p>
        {isActive && <div className="active-border"></div>}
      </div>
    </Link>
  );
};

const MobileNavbar = () => {
  return (
    <nav className="w-full mx-auto flex items-center py-auto">
      <div className=" flex items-center space-y-1 space-x-10">
        <NavItem to="/" icon={RiHome5Line} label="My Feed" exact={true} />
        <NavItem
          to="/community"
          icon={TbUsersGroup}
          label="Community"
          exact={true}
        />
        <NavItem
          to="/explore"
          icon={LuSquareStack}
          label="Explore"
          exact={true}
        />
        <NavItem
          to="/diary"
          icon={MdOutlineLibraryBooks}
          label="Diaries"
          exact={true}
        />
      </div>
    </nav>
  );
};

export default MobileNavbar;
