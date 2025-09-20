import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./loader/Loader";
import ProtectedRoute from "./ProtectedRoute";

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
const ManageAttendance = lazy(() =>
  import("./Pages/Attendance/ManageAttendance")
);
const ViewAttendance = lazy(() => import("./Pages/Attendance/ViewAttendance"));
const AddLeave = lazy(() => import("./Pages/Leaves/AddLeave"));
const AttendanceReport = lazy(() =>
  import("./Pages/Attendance/AttendanceReport")
);
const AttendenceView = lazy(() => import("./Pages/Attendance/ViewReport"));
const ManageEvents = lazy(() => import("./Pages/Events/ManageEvents"));

const Pageroutes = () => {
  const token = localStorage.getItem("SpondiasAuthToken");
  const role = localStorage.getItem("UserRole") || "";

  const isAdminOrManager = token && (role === "admin" || role === "manager");
  const isAuthenticated = !!token;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />
        {/* Dashboard accessible to all authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addleave"
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/">
              <AddLeave />
            </ProtectedRoute>
          }
        />
        {/* Protected routes only for admin/manager */}
        <Route
          path="/Roles"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ManageRoles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Users"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-role"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AddRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ManageDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AddDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ManageEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ManageAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewAttendance"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <ViewAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendanceReport"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AttendanceReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-report"
          element={
            <ProtectedRoute
              isAllowed={isAdminOrManager}
              redirectPath="/dashboard"
            >
              <AttendenceView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageEvents"
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              redirectPath="/dashboard"
            >
              <ManageEvents />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Pageroutes;
