import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";
import Story from "./Story";
import MobileNavbar from "../navbar/MobileNavbar";
// import "../../index.css";

const CommunityLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";
  const isBookmarkRoute = pathname === "/bookmarks";

  return (
    <div className="flex  flex-col h-screen w-full p bg-[#F7F7F7] ">
      <Nav />
      <div className="bg-[#F7F7F7] flex xl:px-10 items-center overflow-hidden mt-24">
        <div
          className="overflow-y-auto overflow-x-hidden custom-scrollbar md:w-1/3 lg:w-[25%]"
          style={{ height: "90vh" }}
        >
          <SideNav />
        </div>
        <main
          className="overflow-y-auto overflow-x-hidden custom-scrollbar w-full md:w-2/3 lg:w-[75%]"
          style={{ height: "90vh" }}
        >
          {children}
    
        </main>
      </div>
      <div className="sm:flex md:hidden border py-auto w-full z-40 fixed bottom-0 h-20 bg-white">
        <MobileNavbar />
      </div>
    </div>
  );
};

CommunityLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommunityLayout;
