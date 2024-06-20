import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";
// import "../../index.css";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";
  const isBookmarkRoute = pathname === "/bookmarks";

  return (
    <div className="flex flex-col h-screen w-full">
      <Nav />
      <div className="bg-[#EFF2FC] flex overflow-hidden mt-24">
        {" "}
        {/* Added pt-16 for top padding */}
        {/* Sidebar */}
        <div
          className="overflow-y-auto custom-scrollbar w-[280px]"
          style={{ height: "90vh" }}
        >
          <SideNav />
        </div>
        {/* Main Content Area */}
        <main
          className="flex-1 overflow-y-auto custom-scrollbar"
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
            className="ads-container overflow-y-auto custom-scrollbar"
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
