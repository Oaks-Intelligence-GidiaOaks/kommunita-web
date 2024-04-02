import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  LoginPage,
  RegisterPage,
  ProfileHome,
  ProfileDiaries,
  ProfileLikes,
  ProfileMedia,
  FavoriteHome,
  Explore,
  Diaries,
  Settings,
  Messages,
  Live,
  Post,
  Notifications,
} from "../pages";
import * as routes from "./routes";

const Config = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<Homepage />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route path={routes.PROFILEDIARIES} element={<ProfileDiaries />} />
        <Route path={routes.DIARIES} element={<Diaries />} />
        <Route path={routes.LIKES} element={<ProfileLikes />} />
        <Route path={routes.MEDIA} element={<ProfileMedia />} />
        <Route path={routes.PROFILE} element={<ProfileHome />} />
        <Route path={routes.FAVORITE} element={<FavoriteHome />} />
        <Route path={routes.EXPLORE} element={<Explore />} />
        <Route path={routes.SETTINGS} element={<Settings />} />
        <Route path={routes.MESSAGES} element={<Messages />} />
        <Route path={routes.LIVE} element={<Live />} />
        <Route path={routes.POST} element={<Post />} />
        <Route path={routes.NOTIFICATION} element={<Notifications />} />
      </Routes>
    </>
  );
};

export default Config;
