import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  getEmployees,
  changeEmployeeStatus,
} from "../../Services/employeeService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const PAGE_SIZE = 5;

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "firstName",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEmployees = async () => {
    setLoader(true);
    try {
      const response = await getEmployees();
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

  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeEmployeeStatus(id);
      if (response?.success) {
        toast.success(
          response?.message || "Employee Status Changed successfully"
        );
        fetchEmployees();
      }
    } catch (error) {
      toast.error(error?.message || "Error in Changing status");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone?.toString().includes(searchTerm)
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key] ?? "";
    let bVal = b[sortConfig.key] ?? "";
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedEmployees.length / PAGE_SIZE);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />

      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                Manage Employees
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Employees
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to={"/add-employee"}>
                <button className="btn btn-primary btn-wave">
                  Add New Employee
                </button>
              </Link>
            </div>
          </div>

          {/* Employees Table */}
          <div className="col-xl-12">
            <div className="card custom-card overflow-hidden">
              <div className="card-header justify-content-between">
                <div className="card-title">Employees</div>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search by name, email, phone"
                    style={{ maxWidth: 250 }}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-nowrap table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th
                          onClick={() => handleSort("firstName")}
                          style={{ cursor: "pointer" }}
                        >
                          Full Name{" "}
                          {sortConfig.key === "firstName" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                          onClick={() => handleSort("gender")}
                          style={{ cursor: "pointer" }}
                        >
                          Gender{" "}
                          {sortConfig.key === "gender" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Email</th>
                        <th
                          onClick={() => handleSort("phone")}
                          style={{ cursor: "pointer" }}
                        >
                          Phone{" "}
                          {sortConfig.key === "phone" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedEmployees.length > 0 ? (
                        paginatedEmployees.map((employee, index) => (
                          <tr key={employee._id}>
                            <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>
                              {employee.firstName} {employee.lastName}
                            </td>
                            <td>{employee.gender || "-"}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.status}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {/* 👁 View */}
                                <button
                                  className="btn btn-link btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#employeeDetailsModal"
                                  onClick={() => setSelectedEmployee(employee)}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>

                                {/* ✏ Edit */}
                                <Link to={`/add-employee/?uid=${employee._id}`}>
                                  <i className="bi bi-pencil-square"></i>
                                </Link>

                                {/* Toggle Status */}
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={employee.isActive}
                                    onChange={() =>
                                      handleChangeStatus(employee._id)
                                    }
                                    disabled={loader}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No employees found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="card-footer py-2">
                <div className="d-flex align-items-center">
                  <div>
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                    {Math.min(
                      currentPage * PAGE_SIZE,
                      filteredEmployees.length
                    )}{" "}
                    of {filteredEmployees.length} Entries
                  </div>
                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-4"
                    >
                      <ul className="pagination mb-0">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Prev
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, idx) => (
                          <li
                            key={idx}
                            className={`page-item ${
                              currentPage === idx + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(idx + 1)}
                            >
                              {idx + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Details Modal */}
      <div
        className="modal fade"
        id="employeeDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Employee Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedEmployee ? (
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <b>Full Name:</b> {selectedEmployee.firstName}{" "}
                      {selectedEmployee.lastName}
                    </p>
                    <p>
                      <b>Gender:</b> {selectedEmployee.gender}
                    </p>
                    <p>
                      <b>Email:</b> {selectedEmployee.email}
                    </p>
                    <p>
                      <b>Phone:</b> {selectedEmployee.phone}
                    </p>
                    <p>
                      <b>Address:</b> {selectedEmployee.address || "-"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <b>Department:</b>{" "}
                      {selectedEmployee?.departmentId?.name || "-"}
                    </p>
                    <p>
                      <b>Joining Date:</b> {selectedEmployee.joiningDate}
                    </p>
                    <p>
                      <b>Employee Type:</b> {selectedEmployee.employeeType}
                    </p>
                    <p>
                      <b>Salary Structure:</b>{" "}
                      {selectedEmployee.salaryStructure}
                    </p>
                    <p>
                      <b>Status:</b> {selectedEmployee.status}
                    </p>
                    <p>
                      <b>Image</b>
                      {selectedEmployee.image ? (
                        <img
                          src={`http://localhost:4000/${selectedEmployee.image}`}
                          alt="Employee"
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <span>No image available</span>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No employee selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEmployees;
