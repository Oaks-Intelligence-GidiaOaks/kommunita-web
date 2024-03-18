import { Routes, Route } from "react-router-dom";
import { Homepage, LoginPage, RegisterPage } from "../pages";
import * as routes from "./routes";

const Config = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<Homepage />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default Config;
