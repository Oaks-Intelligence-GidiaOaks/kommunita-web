import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  LoginPage,
  RegisterPage,
  ProfileHome,
  ProfileDiaries,
  ProfileLikes,
  ProfileMedia,
} from "../pages";
import * as routes from "./routes";

const Config = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<Homepage />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route path={routes.DIARIES} element={<ProfileDiaries />} />
        <Route path={routes.LIKES} element={<ProfileLikes />} />
        <Route path={routes.MEDIA} element={<ProfileMedia />} />
        <Route path={routes.PROFILE} element={<ProfileHome />} />
      </Routes>
    </>
  );
};

export default Config;
