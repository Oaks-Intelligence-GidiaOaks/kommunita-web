import { Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PublicRoute from "../components/protected/PublicRoute";

const Config = () => {
  return (
    <>
      <Routes>
        <Route
          path={routes.LOGIN}
          element={<PublicRoute component={LoginPage} />}
        />

        <Route path={routes.REGISTER} element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path={routes.INDEX}
          element={<ProtectedRoute component={Homepage} />}
        ></Route>

        <Route
          path={routes.PROFILEDIARIES}
          element={<ProtectedRoute component={ProfileDiaries} />}
        />
        <Route
          path={routes.DIARIES}
          element={<ProtectedRoute component={Diaries} />}
        />
        <Route
          path={routes.LIKES}
          element={<ProtectedRoute component={ProfileLikes} />}
        />
        <Route
          path={routes.MEDIA}
          element={<ProtectedRoute component={ProfileMedia} />}
        />
        <Route
          path={routes.PROFILE}
          element={<ProtectedRoute component={ProfileHome} />}
        />
        <Route
          path={routes.FAVORITE}
          element={<ProtectedRoute component={FavoriteHome} />}
        />
        <Route
          path={routes.EXPLORE}
          element={<ProtectedRoute component={Explore} />}
        />
        <Route
          path={routes.SETTINGS}
          element={<ProtectedRoute component={Settings} />}
        />
        <Route
          path={routes.MESSAGES}
          element={<ProtectedRoute component={Messages} />}
        />
        <Route
          path={routes.LIVE}
          element={<ProtectedRoute component={Live} />}
        />
        <Route
          path={routes.POST}
          element={<ProtectedRoute component={Post} />}
        />
        <Route
          path={routes.NOTIFICATION}
          element={<ProtectedRoute component={Notifications} />}
        />

        {/* Redirect to home for unknown routes */}
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default Config;
