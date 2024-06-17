// import { Nav } from "../../components/navbar";
// import { SideNav } from "../../components/sidebar";
// import { AdsSection } from "../../components/ads";
import { MainSection } from "../../components/main";
import MainLayout from "../../components/main/MainLayout";
// import PollSchedule from "../../components/polls/PollSchedule";
// import PollDisplay from "../../components/polls/PollDisplay";
// import SurveySchedule from "../../components/polls/SurveySchedule";
// import SurveyDisplay from "../../components/polls/SurveyDisplay";

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
