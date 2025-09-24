import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getLeaves,
  changeLeaveStatus,
  getLeavesByDate,
} from "../../Services/leaveService";
import { getUserProfileDetails } from "../../Services/userService";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const PAGE_SIZE = 5;
const ManageLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const fetchUserDetails = async () => {
    setLoader(true);
    try {
      const response = await getUserProfileDetails();
      if (response?.success) {
        const employeeData = response?.data || {};
        setUsers(employeeData);
      }
      console.log("response", response);
    } catch (error) {
      setUsers([]);
      toast.error(error?.message || "Error fetching employees");
      console.error("Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
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

  const filteredLeaves = useMemo(() => {
    const roleName = localStorage.getItem("UserRole");
    const userId = users?._id;

    return leaves
      .filter((leave) => {
        if (roleName === "admin") return true;
        return leave.reportingManager === userId;
      })
      .filter((leave) => {
        const employeeName = leave?.employeeName || "";
        const employeeId = leave?.employeeId || "";
        return (
          employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employeeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [leaves, users, searchTerm]);

  const totalPages = Math.ceil(filteredLeaves.length / PAGE_SIZE);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const handleChangeStatus = async (id, status, employeeId) => {
    setLoader(true);
    try {
      const response = await changeLeaveStatus(id, status, employeeId);
      if (response?.success) {
        toast.success(response?.message || "Leave status updated");
        if (selectedDate) {
          fetchLeavesByDateHandler(selectedDate);
        } else {
          fetchLeaves();
        }
      } else {
        toast.error(response?.message || "Error updating status");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating status");
    } finally {
      setLoader(false);
    }
  };
  const fetchLeavesByDateHandler = async (date) => {
    setLoader(true);
    try {
      const response = await getLeavesByDate(date);
      if (response?.success) {
        setLeaves(response?.data || []);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching leaves by date");
      setLeaves([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchLeavesByDateHandler(selectedDate);
    } else {
      fetchLeaves();
    }
  }, [selectedDate]);
  const leaveStats = useMemo(() => {
    return {
      total: leaves.length,
      pending: leaves.filter((l) => l.status === "Pending").length,
      approved: leaves.filter((l) => l.status === "Approved").length,
      rejected: leaves.filter((l) => l.status === "Rejected").length,
    };
  }, [leaves]);

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          <div class="col-xxl-9">
            <div className="d-flex align-items-center justify-content-between my-3 page-header-breadcrumb flex-wrap gap-2">
              <div>
                <p className="fw-medium fs-18 mb-0">Employee Leave Requests</p>
                <p className="fs-13 text-muted mb-0">
                  {/* Let's make today a productive one! */}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap"></div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-primary svg-white">
                        <i className="bi bi-list-task fs-20"></i>
                      </div>
                      <div className="flex-fill">
                        <div className="fw-medium fs-13 mb-1 text-dark">
                          Total Leaves
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-primary">
                          {leaveStats.total}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-secondary svg-white">
                        <i className="bi bi-hourglass-split fs-20"></i>
                      </div>
                      <div>
                        <div className="fw-medium fs-13 mb-1 text-dark">
                          Pending
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-secondary">
                          {leaveStats.pending}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-success svg-white">
                        <i className="bi bi-check-circle fs-20"></i>
                      </div>
                      <div>
                        <div className="fw-medium fs-13 mb-1 text-dark">
                          Approved
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-success">
                          {leaveStats.approved}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-danger svg-white">
                        <i className="bi bi-x-circle fs-20"></i>
                      </div>
                      <div>
                        <div className="fw-medium fs-13 mb-1 text-dark">
                          Rejected
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-danger">
                          {leaveStats.rejected}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="card custom-card overflow-hidden">
                  <div className="card-header justify-content-between">
                    <div className="card-title">Employee Leaves</div>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      <div>
                        <input
                          type="date"
                          id="attendance-date"
                          className="form-control"
                          style={{ maxWidth: 200 }}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search Here"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                          }}
                          aria-label=".form-control-sm example"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table text-nowrap table-hover">
                        <thead>
                          <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Days</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedLeaves.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="text-center">
                                No leave records found.
                              </td>
                            </tr>
                          ) : (
                            paginatedLeaves.map((leave) => (
                              <tr key={leave._id}>
                                <td>{leave.employeeId}</td>
                                <td>{leave.employeeName}</td>
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
                                <td>
                                  <div className="btn-list">
                                    {localStorage.getItem("UserRole") ===
                                    "admin" ? (
                                      <>
                                        {leave.status === "Pending" && (
                                          <>
                                            <button
                                              className="btn btn-danger-light btn-icon btn-sm"
                                              disabled
                                            >
                                              <i className="bi bi-x-lg"></i>
                                            </button>
                                            <button
                                              className="btn btn-success-light btn-icon btn-sm"
                                              disabled
                                            >
                                              <i className="bi bi-check2"></i>
                                            </button>
                                          </>
                                        )}

                                        {leave.status === "Approved" && (
                                          <button
                                            className="btn btn-success-light btn-icon btn-sm"
                                            disabled
                                          >
                                            <i className="bi bi-check2"></i>
                                          </button>
                                        )}

                                        {leave.status === "Rejected" && (
                                          <button
                                            className="btn btn-danger-light btn-icon btn-sm"
                                            disabled
                                          >
                                            <i className="bi bi-x-lg"></i>
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {leave.status === "Pending" && (
                                          <>
                                            <button
                                              className="btn btn-danger-light btn-icon btn-sm"
                                              onClick={() =>
                                                handleChangeStatus(
                                                  leave._id,
                                                  "Rejected",
                                                  leave.employeeId
                                                )
                                              }
                                            >
                                              <i className="bi bi-x-lg"></i>
                                            </button>

                                            <button
                                              className="btn btn-success-light btn-icon btn-sm"
                                              onClick={() =>
                                                handleChangeStatus(
                                                  leave._id,
                                                  "Approved",
                                                  leave.employeeId
                                                )
                                              }
                                            >
                                              <i className="bi bi-check2"></i>
                                            </button>
                                          </>
                                        )}

                                        {leave.status === "Approved" && (
                                          <button
                                            className="btn btn-success-light btn-icon btn-sm"
                                            disabled
                                          >
                                            <i className="bi bi-check2"></i>
                                          </button>
                                        )}

                                        {leave.status === "Rejected" && (
                                          <button
                                            className="btn btn-danger-light btn-icon btn-sm"
                                            disabled
                                          >
                                            <i className="bi bi-x-lg"></i>
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer py-2">
                    <div className="d-flex align-items-center">
                      <div>
                        Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                        {Math.min(
                          currentPage * PAGE_SIZE,
                          filteredLeaves.length
                        )}{" "}
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
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
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
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
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
      </div>
    </>
  );
};

export default ManageLeave;
