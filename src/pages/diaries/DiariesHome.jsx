import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";
import DiaryMain from "../../components/diary/Main";

function DiariesHome() {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC]">
        <div className="container flex justify-between w-full">
          <SideNav />
          <DiaryMain />
          <AdsSection />
        </div>
      </section>
    </>
  );
}

export default DiariesHome;
