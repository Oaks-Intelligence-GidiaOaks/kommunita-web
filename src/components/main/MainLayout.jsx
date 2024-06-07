import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  // Conditionally render the AdsSection only on specific routes
  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";
  const isBookmarkRoute = pathname === "/bookmarks";

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="bg-[#EFF2FC] flex-1">
        <div className="flex w-full">
          <SideNav />
          <main className="flex-1">{children}</main>
          {(isHomeRoute ||
            isNotificationRoute ||
            isFollowRoute ||
            isBookmarkRoute) && <AdsSection />}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
