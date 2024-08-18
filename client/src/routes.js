import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ProtectedRoutes } from "./utils/protectedRoutes";
//components
import LoginPage from "./Components/loginPage";
import HomePage from "./Components/HomePage";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </>
  )
);
