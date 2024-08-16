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
  // Explore,
  Diaries,
  Settings,
  Messages,
  Live,
  Post,
  Notifications,
  PollHistory,
  FollowHome,
  ForgotPasswordPage,
  ResetPasswordPage,
  FollowerAndFollowing,
  SinglePostPage,
  PopularPost,
  Komunity_Diaries,
  Komunity_Videos,
  Komunity_Images,
  ExploreHome,
  KommunityHome,
  PollsContainer,
  SingleDiaryPage,
  StoriesHome,
  AddStories,
  // ViewStories,
} from "../pages";
import * as routes from "./routes";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PublicRoute from "../components/protected/PublicRoute";
import PollsHome from "../pages/polls/PollsHome";
import SurveyHome from "../pages/survey/SurveyHome";

const Config = () => {
  return (
    <>
      <Routes>
        <Route
          path={routes.LOGIN}
          element={<PublicRoute component={LoginPage} />}
        />

        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path={routes.INDEX}
          element={<ProtectedRoute component={Homepage} />}
        ></Route>
        <Route
          path={routes.POST + "/:id"}
          element={<ProtectedRoute component={SinglePostPage} />}
        ></Route>

        <Route
          path={routes.SWITCH}
          element={<ProtectedRoute component={Homepage} />}
        ></Route>

        <Route
          path={routes.KOMMUNITY}
          element={<ProtectedRoute component={KommunityHome} />}
        />

        {/* Explore */}
        <Route
          path={routes.EXPLORE}
          element={<ProtectedRoute component={ExploreHome} />}
        >
          <Route index element={<ProtectedRoute component={PopularPost} />} />
          <Route
            path={routes.E_DAIRIES}
            element={<ProtectedRoute component={Komunity_Diaries} />}
          />
          <Route
            path={routes.E_VIDEOS}
            element={<ProtectedRoute component={Komunity_Videos} />}
          />
          <Route
            path={routes.E_IMAGES}
            element={<ProtectedRoute component={Komunity_Images} />}
          />
        </Route>

        <Route
          path={routes.STORIES}
          element={<ProtectedRoute component={StoriesHome} />}
        >
          {/* <Route index element={<ProtectedRoute component={ViewStories} />} /> */}
          <Route
            path={routes.CREATE}
            element={<ProtectedRoute component={AddStories} />}
          />
        </Route>

        <Route
          path={routes.PROFILEDIARIES}
          element={<ProtectedRoute component={ProfileDiaries} />}
        />
        <Route
          path={routes.DIARIES}
          element={<ProtectedRoute component={Diaries} />}
        />
        <Route
          path={routes.DIARIES + "/:id"}
          element={<ProtectedRoute component={SingleDiaryPage} />}
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
          path={routes.FOLLOWERS}
          element={<ProtectedRoute component={FollowerAndFollowing} />}
        />
        <Route
          path={`${routes.PROFILE}/:user_id`}
          element={<ProtectedRoute component={ProfileHome} />}
        />
        <Route
          path={routes.BOOKMARK}
          element={<ProtectedRoute component={FavoriteHome} />}
        />
        <Route
          path={routes.FOLLOW}
          element={<ProtectedRoute component={FollowHome} />}
        />
        {/* <Route
          path={routes.EXPLORE}
          element={<ProtectedRoute component={Explore} />}
        /> */}
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
          path={routes.POLLS}
          element={<ProtectedRoute component={PollsContainer} />}
        >
          <Route index element={<ProtectedRoute component={PollsHome} />} />
          <Route
            path={routes.POLLHISTORY}
            element={<ProtectedRoute component={PollHistory} />}
          />
        </Route>

        <Route
          path={routes.SURVEY}
          element={<ProtectedRoute component={SurveyHome} />}
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
