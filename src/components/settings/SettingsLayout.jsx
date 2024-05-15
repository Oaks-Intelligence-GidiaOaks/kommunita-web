import MainLayout from "./../main/MainLayout";
import SettingsNav from "./SettingsNav";

const SettingsLayout = ({ children }) => {
  return (
    <MainLayout showNav={false}>
      <div className="p-4">
        {/* <div className="font-semibold text-3xl h-[100%]">SETTINGS</div> */}
        <div className="col-span-12 lg:col-span-9 xl:col-span-10">
          {/* <div className="flex items-center justify-center ">
            <SettingsNav />
          </div> */}
          <div className="">
            <div className="mt-10">{children}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsLayout;
