import PropTypes from "prop-types";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { useLocation } from "react-router-dom";
import MobileNavbar from "../navbar/MobileNavbar";
// import "../../index.css";

const ExploreLayout = ({ children }) => {

  return (
    <div className="flex  flex-col w-full p bg-[#F7F7F7] ">
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

ExploreLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExploreLayout;
