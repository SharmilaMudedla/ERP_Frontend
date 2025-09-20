import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getLeaves,
  changeLeaveStatus,
  getLeavesByDate,
} from "../../Services/addleaveService";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const PAGE_SIZE = 5;
const ManageLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
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
    return leaves.filter((leave) => {
      const employeeName = leave?.employeeName || "";
      const employeeId = leave?.employeeId || "";
      return (
        employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [leaves, searchTerm]);

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
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          <div class="col-xxl-9">
            <div className="d-flex align-items-center justify-content-between my-3 page-header-breadcrumb flex-wrap gap-2">
              <div>
                <p className="fw-medium fs-18 mb-0">Employees Leave Requests</p>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <path
                            d="M33.6,145.5A96,96,0,0,1,96,37.5v72Z"
                            opacity="0.2"
                          />
                          <path
                            d="M33.6,145.5A96,96,0,0,1,96,37.5v72Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M128,128.42V32A96,96,0,1,1,45.22,176.64Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </div>
                      <div className="flex-fill">
                        <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                          Number Of Sales
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-primary ">
                          12,432
                        </div>
                        <div className="d-flex align-items-center fs-11">
                          <span className="text-success fw-semibold me-1">
                            <i className="ti ti-trending-up me-1 fw-medium align-middle text-success d-inline-flex" />
                            2.5%
                          </span>
                          <span className="text-default op-6">This Month</span>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <path
                            d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z"
                            opacity="0.2"
                          />
                          <line
                            x1={112}
                            y1={112}
                            x2={144}
                            y2={112}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <rect
                            x={32}
                            y={64}
                            width={192}
                            height={144}
                            rx={8}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                          Profit By Sale
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-secondary">
                          $4,132
                        </div>
                        <div className="d-flex align-items-center fs-11">
                          <span className=" text-success fw-semibold me-1">
                            <i className="ti ti-trending-up me-1 fw-medium align-middle text-success d-inline-flex" />
                            1.5%
                          </span>
                          <span className="text-default op-6">This Month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body  ">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-success svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <path
                            d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48Z"
                            opacity="0.2"
                          />
                          <path
                            d="M204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z"
                            opacity="0.2"
                          />
                          <circle
                            cx={204}
                            cy={84}
                            r={28}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M176,85.29A28,28,0,1,1,192,58.71"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                          Total Revenue
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-success">
                          $15,482
                        </div>
                        <div className="d-flex align-items-center  fs-11">
                          <span className="text-danger fw-semibold me-1">
                            <i className="ti ti-trending-down me-1 fw-medium align-middle text-danger d-inline-flex" />
                            3.4%
                          </span>
                          <span className="text-default op-6">This Month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                <div className="card custom-card overflow-hidden">
                  <div className="card-body ">
                    <div className="d-flex gap-3">
                      <div className="avatar avatar-md bg-pink svg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <circle cx={84} cy={108} r={52} opacity="0.2" />
                          <path
                            d="M10.23,200a88,88,0,0,1,147.54,0"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M172,160a87.93,87.93,0,0,1,73.77,40"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <circle
                            cx={84}
                            cy={108}
                            r={52}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M152.69,59.7A52,52,0,1,1,172,160"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                          Total Customers
                        </div>
                        <div className="fs-22 fw-semibold mb-1 text-pink">
                          3,532
                        </div>
                        <div className="d-flex align-items-center fs-11">
                          <span className="text-danger fw-semibold me-1">
                            <i className="ti ti-trending-down me-1 fw-medium align-middle text-danger d-inline-flex" />
                            4.5%
                          </span>
                          <span className="text-default op-6">This Month</span>
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
