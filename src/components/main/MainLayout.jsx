import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  // Conditionally render the AdsSection only on the home route
  const isHomeRoute = pathname === "/";
  const isFollowRoute = pathname === "/follow";
  const isNotificationRoute = pathname === "/notifications";

  return (
    <div>
      <Nav />
      <div className="bg-[#EFF2FC]">
        <div className="flex w-full">
          <SideNav />
          <main className="flex-1">{children}</main>
          {(isHomeRoute || isNotificationRoute || isFollowRoute) && (
            <AdsSection />
          )}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
