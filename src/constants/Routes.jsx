import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicLinks, privateLinks } from "./links";
import PrivateRoute from "../middleware/PrivateRoute";
import Navbar from "../layouts/Navbar";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Employee = React.lazy(() => import("../pages/Employee"));
const Admin = React.lazy(() => import("../pages/Admin"));

function BaseRouter() {
  return (
    <Router>
      <Suspense
        fallback={
          <>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        }
      >
        <Navbar />
        <Routes>
          <Route path={publicLinks?.Login} element={<Login />} />
          <Route path={publicLinks?.Register} element={<Register />} />
          <Route path={publicLinks?.Employee} element={<Employee />} />
          <Route path={publicLinks?.Admin} element={<Admin />} />

          <Route element={<PrivateRoute />}>
            <Route path={privateLinks?.Dashboard} element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default BaseRouter;
