import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";
import Story from "./Story";
// import "../../index.css";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";
  const isBookmarkRoute = pathname === "/bookmarks";

  return (
    <div className="flex flex-col h-screen w-full p bg-[#F7F7F7] ">
      <Nav />
      <div className="bg-[#F7F7F7] flex md:px-10 items-center overflow-hidden mt-24">
        {" "}
        {/* Added pt-16 for top padding */}
        {/* Sidebar */}
        <div
          className="overflow-y-auto overflow-x-hidden custom-scrollbar md:w-1/3 lg:w-[20%]"
          style={{ height: "90vh" }}
        >
          <SideNav />
        </div>
        {/* Main Content Area */}
        <main
          className="overflow-y-auto overflow-x-hidden custom-scrollbar w-full md:w-2/3 lg:w-2/4"
          style={{ height: "90vh" }}
        >
          {children}
        </main>
        {/* Ads Section */}
        {(isHomeRoute ||
          isNotificationRoute ||
          isFollowRoute ||
          isBookmarkRoute) && (
          <div
            className="ads-container overflow-y-auto custom-scrollbar hidden lg:flex lg:w-[30%]"
            style={{ height: "90vh" }}
          >
            <AdsSection />
          </div>
        )}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
