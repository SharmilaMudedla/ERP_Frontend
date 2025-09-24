import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { getPayrolls } from "../../Services/payrollService";

const PAGE_SIZE = 5;

const ManagePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // search, sort & pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "employee",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPayrolls = async () => {
    setLoader(true);
    try {
      const response = await getPayrolls();
      if (response?.success) {
        setPayrolls(response?.data || []);
      } else {
        setPayrolls([]);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching payrolls");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  // 🔹 Search filter
  const filteredPayrolls = payrolls.filter((pay) => {
    const empName =
      `${pay?.employeeId?.firstName} ${pay?.employeeId?.lastName}`.toLowerCase();
    return (
      empName.includes(searchTerm.toLowerCase()) ||
      pay.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(pay.year).includes(searchTerm)
    );
  });

  // 🔹 Sorting
  const sortedPayrolls = [...filteredPayrolls].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal, bVal;
    switch (sortConfig.key) {
      case "employee":
        aVal = `${a?.employeeId?.firstName} ${a?.employeeId?.lastName}`;
        bVal = `${b?.employeeId?.firstName} ${b?.employeeId?.lastName}`;
        break;
      default:
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
    }
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(sortedPayrolls.length / PAGE_SIZE);
  const paginatedPayrolls = sortedPayrolls.slice(
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
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                Manage Payroll
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Payroll
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card custom-card overflow-hidden">
              {/* 🔹 Card Header with Search */}
              <div className="card-header justify-content-between">
                <div className="card-title">Manage Payroll</div>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    style={{ maxWidth: 250 }}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* 🔹 Table */}
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-nowrap table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th
                          onClick={() => handleSort("employee")}
                          style={{ cursor: "pointer" }}
                        >
                          Employee{" "}
                          {sortConfig.key === "employee" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                          onClick={() => handleSort("month")}
                          style={{ cursor: "pointer" }}
                        >
                          Month{" "}
                          {sortConfig.key === "month" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                          onClick={() => handleSort("year")}
                          style={{ cursor: "pointer" }}
                        >
                          Year{" "}
                          {sortConfig.key === "year" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Basic Salary</th>
                        <th>Allowance</th>
                        <th>Deduction</th>
                        <th>Net Salary</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayrolls.length > 0 ? (
                        paginatedPayrolls.map((payroll, index) => (
                          <tr key={payroll._id}>
                            <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>
                              {payroll?.employeeId?.firstName}{" "}
                              {payroll?.employeeId?.lastName}
                            </td>
                            <td>{payroll.month}</td>
                            <td>{payroll.year}</td>
                            <td>{payroll.basicSalary}</td>
                            <td>{payroll.allowance}</td>
                            <td>{payroll.deduction}</td>
                            <td>{payroll.netSalary}</td>
                            <td>{payroll.paymentDate}</td>
                            <td>{payroll.paymentStatus}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-sm btn-link"
                                  data-bs-toggle="modal"
                                  data-bs-target="#payrollDetailsModal"
                                  onClick={() => setSelectedPayroll(payroll)}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <Link
                                  to={`/addPayroll/?uid=${payroll._id}`}
                                  className="mx-2"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center">
                            No payroll records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 🔹 Footer Pagination */}
              <div className="card-footer py-2">
                <div className="d-flex align-items-center">
                  <div>
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                    {Math.min(currentPage * PAGE_SIZE, filteredPayrolls.length)}{" "}
                    of {filteredPayrolls.length} Entries
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

      {/* 🔹 Payroll Details Modal */}
      <div
        className="modal fade"
        id="payrollDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Payroll Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedPayroll ? (
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <b>Employee:</b> {selectedPayroll?.employeeId?.firstName}{" "}
                      {selectedPayroll?.employeeId?.lastName}
                    </p>
                    <p>
                      <b>Month:</b> {selectedPayroll.month}
                    </p>
                    <p>
                      <b>Year:</b> {selectedPayroll.year}
                    </p>
                    <p>
                      <b>Payment Date:</b> {selectedPayroll.paymentDate}
                    </p>
                    <p>
                      <b>Status:</b> {selectedPayroll.paymentStatus}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <b>Basic Salary:</b> {selectedPayroll.basicSalary}
                    </p>
                    <p>
                      <b>Allowance:</b> {selectedPayroll.allowance}
                    </p>
                    <p>
                      <b>Deduction:</b> {selectedPayroll.deduction}
                    </p>
                    <p>
                      <b>Net Salary:</b> {selectedPayroll.netSalary}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No payroll selected</p>
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

export default ManagePayroll;
