import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { FavoriteMainSection } from "../../components/favorite";
import MainLayout from "../../components/main/MainLayout";

function FavoriteHome() {
  return (
    <>
      <MainLayout>
        <FavoriteMainSection />
      </MainLayout>

      {/* <section className="bg-[#EFF2FC]">
        <div className="mx-auto px-8 flex justify-between w-full">
          <SideNav />
          <section className="hidden lg:block w-full">
            <AdsSection />
          </section>
       
        </div>
      </section> */}
    </>
  );
}

export default FavoriteHome;
