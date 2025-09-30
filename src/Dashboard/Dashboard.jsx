import React, { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeeBirthdays,
  getEmployeeData,
  getEmployeesAssignedToManager,
} from "../Services/employeeService";
import { totalDepartments } from "../Services/departmentService";
import { totalManagers, getUserProfileDetails } from "../Services/userService";
import { getEvents } from "../Services/eventService";
import { Toast } from "bootstrap";
import ToasterAlert from "../toaster/ToasterAlert";
import Loader from "../loader/Loader";
import { toast } from "sonner";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);
  const [remainders, setRemainders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState({});
  const [managerCount, setManagerCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp?.firstName} ${emp?.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      emp?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "department") {
      valA = a?.departmentId?.name || "";
      valB = b?.departmentId?.name || "";
    }

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const fectchEmployeeCount = async () => {
    try {
      const role = localStorage.getItem("UserRole");

      let response;
      if (role === "manager") {
        response = await getEmployeesAssignedToManager(profile._id);
        if (response?.success) {
          setEmployeeCount(response?.data?.length || 0);
        }
      } else {
        response = await getEmployeeData();
        if (response?.success) {
          setEmployeeCount(response?.data || 0);
        }
      }
    } catch (error) {
      console.error(error);
      setEmployeeCount(0);
    }
  };
  const fetchDepartmentsCount = async () => {
    try {
      const response = await totalDepartments();
      if (response?.success) {
        setDepartmentCount(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchManagersCount = async () => {
    try {
      const response = await totalManagers();
      if (response?.success) {
        setManagerCount(response?.data[0].managerCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      if (response?.success) {
        setEvents(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBrithdayRemainders = async () => {
    try {
      const response = await getEmployeeBirthdays();
      if (response?.success) {
        setRemainders(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserProfileDetails = async () => {
    const role = localStorage.getItem("UserRole");
    if (role === "employee") return;
    setLoader(true);
    try {
      const response = await getUserProfileDetails();
      if (response?.success) {
        setProfile(response?.data || {});
      }
    } catch (error) {
      setProfile({});
      toast.error(error?.message || "Error fetching user");
      console.error("Error fetching user:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchEmployees = async () => {
    setLoader(true);
    try {
      let response;
      const role = localStorage.getItem("UserRole");

      if (role === "manager") {
        response = await getEmployeesAssignedToManager(profile._id);
      } else {
        response = await getEmployees();
      }

      if (response?.success) {
        setEmployees(response?.data || []);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      setEmployees([]);
      toast.error(error?.message || "Error fetching employees");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (profile?._id) {
      fetchEmployees();
      fectchEmployeeCount();
    }
  }, [profile]);
  useEffect(() => {
    fectchEmployeeCount();
    fetchEvents();
    fetchBrithdayRemainders();
    fetchDepartmentsCount();
    fetchManagersCount();
    fetchUserProfileDetails();
  }, []);
  const role = localStorage.getItem("UserRole");
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Start::page-header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">ERP</h1>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0);">Dashboards</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  ERP
                </li>
              </ol>
            </div>
          </div>
          {/* End::page-header */}
          {/* Start:: row-1 */}
          <div className="row">
            <div className="col-xxl-5 col-lg-12">
              <div className="row">
                {(role === "admin" || role === "hr") && (
                  <>
                    <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                      <div className="card custom-card hrm-cards overflow-hidden">
                        <div className="card-body p-4">
                          <span className="d-block mb-2">Total Employees</span>
                          <h4 className="fw-semibold mb-2">
                            {employeeCount || ""}
                          </h4>

                          <span className="hrm-cards-icon svg-white text-fixed-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                      <div className="card custom-card hrm-cards overflow-hidden">
                        <div className="card-body p-4">
                          <span className="d-block mb-2">Total Managers</span>
                          <h4 className="fw-semibold mb-2">
                            {managerCount || ""}
                          </h4>

                          <span className="hrm-cards-icon svg-white text-fixed-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                      <div className="card custom-card hrm-cards overflow-hidden">
                        <div className="card-body p-4">
                          <span className="d-block mb-2">
                            Total Departments
                          </span>
                          <h4 className="fw-semibold mb-2">
                            {departmentCount || ""}
                          </h4>

                          <span className="hrm-cards-icon svg-white text-fixed-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {role === "manager" && (
                  <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                    <div className="card custom-card hrm-cards overflow-hidden">
                      <div className="card-body p-4">
                        <span className="d-block mb-2">Total Employees</span>
                        <h4 className="fw-semibold mb-2">
                          {employeeCount || ""}
                        </h4>
                        <span className="hrm-cards-icon svg-white text-fixed-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* End:: row-1 */}
          {/* Start:: row-2 */}
          <div className="row">
            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card overflow-hidden">
                <div className="card-header justify-content-between">
                  <div className="card-title">Event List</div>
                  <a href="/manageEvents" className="fs-12 text-muted tag-link">
                    {" "}
                    View All
                    <i className="ti ti-arrow-narrow-right ms-1" />{" "}
                  </a>
                </div>
                <div className="card-body">
                  <ul className="list-group list-unstyled hrm-events-list mb-0">
                    {events.map((event, index) => (
                      <li key={index}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center lh-1">
                            <span className="avatar-main1 me-2">
                              <span className="avatar bg-primary-transparent svg-primary avatar-rounded avatar-md">
                                <i className="ri-calendar-line fs-14" />
                              </span>
                            </span>
                            <div className="d-flex flex-column">
                              <span className="d-block fw-medium mb-2">
                                {event.title}
                              </span>
                              <span className="d-block fw-medium text-muted fs-12 mb-1">
                                {new Date(event.startDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                  }
                                )}
                                ,{" "}
                                {new Date(event.startDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(event.startDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    weekday: "long",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="badge bg-primary-transparent">
                              {event.description}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card">
                <div className="card-header">
                  <div className="card-title">
                    Tomorrow's BirthDay Remainders
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled recruitment-pipeline-list mb-0">
                    {remainders?.thisMonthBirthdays &&
                    remainders.thisMonthBirthdays.length > 0 ? (
                      remainders.thisMonthBirthdays.map((remainder, index) => (
                        <li key={index}>
                          <div className="d-flex align-items-center gap-2">
                            <div>
                              <span className="avatar avatar-md avatar-rounded bg-primary-transparent">
                                <i className="ri-cake-2-line fs-14" />
                              </span>
                            </div>
                            <div className="flex-fill fw-semibold">
                              {`${remainder.firstName} ${remainder.lastName}`}
                            </div>
                            <div className="text-end">
                              <span className="text-primary h6 mb-0 fw-semibold">
                                {new Date(
                                  remainder.dateOfBirth
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-center text-muted">
                        No data available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {(role === "admin" || role === "hr" || role === "manager") && (
            <div className="row">
              <div className="col-xxl-12">
                <div className="card custom-card">
                  <div className="card-header justify-content-between">
                    <div className="card-title">Employee Directory</div>
                    <div className="d-flex flex-wrap">
                      <div className="me-3 my-1">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search Here"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover text-nowrap table-bordered text-center">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">
                              S.No
                            </th>
                            <th
                              onClick={() => handleSort("employeeId")}
                              scope="col"
                            >
                              Employee Id{" "}
                              {sortConfig.key === "employeeId" &&
                                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                            </th>
                            <th
                              scope="col"
                              onClick={() => handleSort("firstName")}
                            >
                              Employee Name
                              {sortConfig.key === "firstName" &&
                                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                            </th>
                            <th
                              scope="col"
                              onClick={() => handleSort("designation")}
                            >
                              Position
                              {sortConfig.key === "designation" &&
                                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                            </th>
                            <th
                              scope="col"
                              onClick={() => handleSort("department")}
                            >
                              Department
                              {sortConfig.key === "department" &&
                                (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                            </th>
                            <th scope="col">Email</th>
                            <th scope="col">Employee Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Salary</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedEmployees.length > 0 ? (
                            paginatedEmployees.map((emp, index) => (
                              <tr key={emp._id}>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                  <span className="text-primary fs-14">
                                    {emp?.employeeId || "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={`${import.meta.env.VITE_BASE_URL}/${
                                        emp.image
                                      }`}
                                      className="avatar avatar-sm"
                                      alt="Employee"
                                    />

                                    <div className="flex-1 flex-between pos-relative ms-2">
                                      <div>
                                        <a
                                          href="javascript:void(0);"
                                          className="fs-13 fw-medium"
                                        >
                                          {emp?.firstName || "N/A"}{" "}
                                          {emp?.lastName || "N/A"}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span>{emp?.designation || "N/A"}</span>
                                </td>
                                <td>
                                  <span>
                                    {emp?.departmentId?.name || "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <a href="javascript:void(0);">
                                    {emp?.email || "N/A"}
                                  </a>
                                </td>
                                <td>
                                  <a href="javascript:void(0);">
                                    {emp?.employeeType || "N/A"}
                                  </a>
                                </td>
                                <td>
                                  <span className="badge bg-success-transparent">
                                    {emp?.status || "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <span>{emp?.phone || "N/A"}</span>
                                </td>
                                <td>
                                  <span className="fw-medium">
                                    {emp?.salaryStructure?.basicSalary || "N/A"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="9"
                                className="text-center text-muted"
                              >
                                No employees found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex align-items-center">
                      <div>
                        Showing {paginatedEmployees.length} of{" "}
                        {employees.length} entries
                        <i className="bi bi-arrow-right ms-2 fw-medium" />
                      </div>
                      <div className="ms-auto">
                        <nav
                          aria-label="Page navigation"
                          className="pagination-style-4"
                        >
                          <ul className="pagination mb-0">
                            <li
                              className={`page-item ${
                                currentPage === 1 && "disabled"
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage((p) => p - 1)}
                              >
                                Prev
                              </button>
                            </li>

                            {[...Array(totalPages)].map((_, i) => (
                              <li
                                key={i}
                                className={`page-item ${
                                  currentPage === i + 1 && "active"
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </button>
                              </li>
                            ))}

                            <li
                              className={`page-item ${
                                currentPage === totalPages && "disabled"
                              }`}
                            >
                              <a
                                className="page-link"
                                onClick={() => setCurrentPage((p) => p + 1)}
                              >
                                next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End:: row-3 */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
