import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";
import DiaryMain from "../../components/diary/Main";
import MainLayout from "../../components/main/MainLayout";

function DiariesHome() {
  return (
    <MainLayout>
      <DiaryMain />
    </MainLayout>
    // <>

    //   <Nav />
    //   <section className="bg-[#EFF2FC]">
    //     <div className="container flex justify-between w-full">
    //       <SideNav />

    //       <AdsSection />
    //     </div>
    //   </section>
    // </>
  );
}

export default DiariesHome;
