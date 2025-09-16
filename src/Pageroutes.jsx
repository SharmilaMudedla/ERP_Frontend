import React from "react";
import Login from "./Authentication/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AddUser from "./Pages/User/AddUser";
import AddRole from "./Pages/Roles/AddRole";
import Loader from "./loader/Loader";
import ManageRoles from "./Pages/Roles/ManageRoles";
import ManageUsers from "./Pages/User/ManageUsers";
import ManageDepartment from "./Pages/Department/ManageDepartment";
import AddDepartment from "./Pages/Department/AddDepartment";

const Pageroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Roles" element={<ManageRoles />} />
        <Route path="/Users" element={<ManageUsers />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/department" element={<ManageDepartment />} />
        <Route path="/add-department" element={<AddDepartment />} />
      </Routes>
    </>
  );
};

export default Pageroutes;
