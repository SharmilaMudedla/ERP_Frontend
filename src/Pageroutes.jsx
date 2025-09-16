import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./loader/Loader";

const Login = lazy(() => import("./Authentication/Login"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const AddUser = lazy(() => import("./Pages/User/AddUser"));
const AddRole = lazy(() => import("./Pages/Roles/AddRole"));
const ManageRoles = lazy(() => import("./Pages/Roles/ManageRoles"));
const ManageUsers = lazy(() => import("./Pages/User/ManageUsers"));
const ManageDepartment = lazy(() =>
  import("./Pages/Department/ManageDepartment")
);
const AddDepartment = lazy(() => import("./Pages/Department/AddDepartment"));
const ManageEmployees = lazy(() => import("./Pages/Employees/ManageEmployees"));
const AddEmployee = lazy(() => import("./Pages/Employees/AddEmployee"));

const Pageroutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Roles" element={<ManageRoles />} />
      <Route path="/Users" element={<ManageUsers />} />
      <Route path="/add-role" element={<AddRole />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/department" element={<ManageDepartment />} />
      <Route path="/add-department" element={<AddDepartment />} />
      <Route path="/employees" element={<ManageEmployees />} />
      <Route path="/add-employee" element={<AddEmployee />} />
    </Routes>
  </Suspense>
);

export default Pageroutes;
