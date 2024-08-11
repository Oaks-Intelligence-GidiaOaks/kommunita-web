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
  );
}

export default DiariesHome;
