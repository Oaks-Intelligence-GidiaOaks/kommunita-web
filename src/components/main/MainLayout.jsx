import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";
import Story from "./Story";
import MobileNavbar from "../navbar/MobileNavbar";
import { KOMMUNITY } from "../../routes/routes";
// import "../../index.css";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";
  const isBookmarkRoute = pathname === "/bookmarks";
  const isMessaging = pathname === "/messages";

  return (
    <div className="flex  flex-col h-screen w-full p bg-[#F7F7F7] ">
      <Nav />

      <div className="bg-[#F7F7F7] flex xl:px-10 items-center overflow-hidden mt-24">
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
          className={
            `overflow-y-auto overflow-x-hidden custom-scrollbar w-full md:w-2/3 lg:w-2/4 ${isMessaging ? "flex-1" : "flex-1"}`
          }
          style={{ height: "90vh" }}
        >
          {children}
        </main>
        {/* Ads Section */}
        {(isHomeRoute ||
          isNotificationRoute ||
          isFollowRoute ||
          KOMMUNITY ||
          isBookmarkRoute) &&
          !isMessaging && (
            <div
              className="ads-container overflow-y-auto custom-scrollbar hidden lg:flex lg:w-[30%]"
              style={{ height: "90vh" }}
            >
              <AdsSection />
            </div>
          )}
      </div>
      <div className="sm:flex md:hidden border py-auto w-full z-40 fixed bottom-0 h-20 bg-white">
        <MobileNavbar />
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
