import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getSalaries } from "../../Services/salaryService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const PAGE_SIZE = 5;

const ManageSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSalaries = async () => {
    setLoader(true);
    try {
      const response = await getSalaries();
      console.log(response);
      if (response?.success) {
        setSalaries(response?.data || []);
      } else {
        setSalaries([]);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching departments");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filteredSalaries = salaries.filter((dept) => {
    const search = searchTerm.toLowerCase();

    return (
      String(dept.basicSalary ?? "")
        .toLowerCase()
        .includes(search) ||
      String(dept.pf ?? "")
        .toLowerCase()
        .includes(search) ||
      String(dept.transportAllowance ?? "")
        .toLowerCase()
        .includes(search)
    );
  });

  const sortedSalaries = [...filteredSalaries].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key] ?? "";
    let bVal = b[sortConfig.key] ?? "";

    if (sortConfig.key === "managerId") {
      aVal = a.managerId?.name ?? "";
      bVal = b.managerId?.name ?? "";
    }

    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedSalaries.length / PAGE_SIZE);
  const paginatedSalaries = sortedSalaries.slice(
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
          {/* Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">Manage Salary</h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Salary
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to="/addSalary">
                <button className="btn btn-primary btn-wave">Add Salary</button>
              </Link>
            </div>
          </div>

          {/* Departments Table */}
          <div className="col-xl-12">
            <div className="card custom-card overflow-hidden">
              <div className="card-header justify-content-between">
                <div className="card-title">Salary</div>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search by name, description or manager"
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
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSort("name")}
                        >
                          Basic Salary{" "}
                          {sortConfig.key === "name" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSort("description")}
                        >
                          PF{" "}
                          {sortConfig.key === "description" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSort("managerId")}
                        >
                          Transport Allowance{" "}
                          {sortConfig.key === "managerId" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSalaries.length > 0 ? (
                        paginatedSalaries.map((dept, index) => (
                          <tr key={dept._id}>
                            <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>{dept?.basicSalary || "-"}</td>
                            <td>{dept?.pf || "-"}</td>
                            <td>{dept?.transportAllowance || "-"}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <Link
                                  to={`/addSalary/?uid=${dept._id}`}
                                  className="btn btn-sm btn-link"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Salaries found
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
                    {Math.min(currentPage * PAGE_SIZE, filteredSalaries.length)}{" "}
                    of {filteredSalaries.length} Entries
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
    </>
  );
};

export default ManageSalary;
