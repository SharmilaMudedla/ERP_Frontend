import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaves } from "../../Services/addleaveService";
import { toast } from "sonner";
import { getEmployeeProfileDetails } from "../../Services/employeeService";

const PAGE_SIZE = 5;

const EmployeeManageLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [employee, setEmployee] = useState({});
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchEmployeeDetails = async () => {
    setLoader(true);
    try {
      const response = await getEmployeeProfileDetails();
      if (response?.success) {
        setEmployee(response?.data || {});
      }
    } catch (error) {
      setEmployee({});
      toast.error(error?.message || "Error fetching Employee");
      console.error("Error fetching employee:", error);
    } finally {
      setLoader(false);
    }
  };
  const fetchLeaves = async () => {
    setLoader(true);
    try {
      const response = await getLeaves();
      if (response?.success) {
        setLeaves(response?.data || []);
      }
    } catch (error) {
      setLeaves([]);
      toast.error(error?.message || "Error fetching Leaves");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployeeDetails();
  }, []);
  const filteredLeaves = useMemo(() => {
    if (!employee?.employeeId) return [];
    return leaves.filter((leave) => leave.employeeId === employee.employeeId);
  }, [leaves, employee.employeeId]);

  const totalPages = Math.ceil(filteredLeaves.length / PAGE_SIZE);

  const currentLeaves = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLeaves.slice(start, start + PAGE_SIZE);
  }, [filteredLeaves, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  console.log("employeeId", employee?.employeeId);
  console.log("Leaves:", leaves);
  console.log(
    "Leave employee IDs:",
    leaves.map((l) => l.employeeId)
  );
  return (
    <>
      <div className="main-content app-content">
        <div className="container-fluid">
          <div className="col-xxl-9">
            <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <h1 className="page-title fw-medium fs-18 mb-2">
                  Manage Leaves
                </h1>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Leaves
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card custom-card overflow-hidden">
                <div className="card-header justify-content-between">
                  <div className="card-title">Leaves</div>
                </div>
                <div className="card-body p-0">
                  {loader ? (
                    <div className="text-center p-3">Loading...</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table text-nowrap table-hover">
                        <thead>
                          <tr>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Days</th>
                            <th>Reason</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentLeaves.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center">
                                No leave records found.
                              </td>
                            </tr>
                          ) : (
                            currentLeaves.map((leave) => (
                              <tr key={leave._id}>
                                <td>{leave.leaveType || "N/A"}</td>
                                <td>
                                  {new Date(
                                    leave.startDate
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  {new Date(leave.endDate).toLocaleDateString()}
                                </td>
                                <td>{leave.totalDays}</td>
                                <td>{leave.reason}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      leave.status === "Pending"
                                        ? "bg-primary"
                                        : leave.status === "Approved"
                                        ? "bg-success"
                                        : leave.status === "Rejected"
                                        ? "bg-danger"
                                        : "bg-secondary"
                                    }`}
                                  >
                                    {leave.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="card-footer py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                      {Math.min(currentPage * PAGE_SIZE, filteredLeaves.length)}{" "}
                      of {filteredLeaves.length} Entries
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
      </div>
    </>
  );
};

export default EmployeeManageLeave;
