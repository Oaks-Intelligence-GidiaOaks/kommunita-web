import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";
import MainLayout from "../../components/main/MainLayout";

function Homepage() {
  return (
    <MainLayout>
      <MainSection />
    </MainLayout>
  );
}

export default Homepage;
{
  /* <Nav />
    <section className="bg-[#EFF2FC]">
      <div className="container flex justify-between w-full">
        <SideNav />
        <MainSection />
        <AdsSection />
      </div>
    </section> */
}
