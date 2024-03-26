import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { FavoriteMainSection } from "../../components/favorite";

function FavoriteHome() {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC]">
        <div className="container flex justify-between w-full">
          <SideNav />
          <FavoriteMainSection />
          <AdsSection />
        </div>
      </section>
    </>
  );
}

export default FavoriteHome;
