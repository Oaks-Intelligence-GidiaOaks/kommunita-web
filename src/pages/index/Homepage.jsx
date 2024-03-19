import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";

function Homepage() {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC]">
        <div className="container mx-auto px-2 flex justify-between items-center w-full">
          <SideNav />
          <MainSection />
          <AdsSection />
        </div>
      </section>
    </>
  );
}

export default Homepage;
