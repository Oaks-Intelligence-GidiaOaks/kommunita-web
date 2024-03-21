import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";

function Homepage() {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC]">
        <div className="container flex justify-between w-full">
          <SideNav />
          <MainSection />
          <AdsSection />
        </div>
      </section>
    </>
  );
}

export default Homepage;
