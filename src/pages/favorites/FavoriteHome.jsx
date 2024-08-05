import { Nav } from "../../components/navbar";
import { SideNav } from "../../components/sidebar";
import { AdsSection } from "../../components/ads";
import { FavoriteMainSection, FavoriteNew } from "../../components/favorite";
import MainLayout from "../../components/main/MainLayout";

function FavoriteHome() {
  return (
    <>
      <MainLayout>
        <FavoriteNew />
        {/* <FavoriteMainSection /> */}
      </MainLayout>
    </>
  );
}

export default FavoriteHome;
