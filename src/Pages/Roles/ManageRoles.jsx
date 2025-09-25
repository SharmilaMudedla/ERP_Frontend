import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { getRoles, changeRoleStatus } from "../../Services/roleService";

const PAGE_SIZE = 5;

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRoles = async () => {
    setLoader(true);
    try {
      const response = await getRoles();
      if (response?.success) {
        setRoles(response?.data || []);
      } else {
        setRoles([]);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching roles");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeRoleStatus(id);
      if (response?.success) {
        toast.success(response?.message || "Role status updated");
        fetchRoles();
      }
    } catch (error) {
      toast.error(error?.message || "Error updating status");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key] ?? "";
    let bVal = b[sortConfig.key] ?? "";
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedRoles.length / PAGE_SIZE);
  const paginatedRoles = sortedRoles.slice(
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
              <h1 className="page-title fw-medium fs-18 mb-2">Manage Roles</h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Roles
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to="/add-role">
                <button className="btn btn-primary btn-wave">Add Role</button>
              </Link>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card custom-card overflow-hidden">
              <div className="card-header justify-content-between">
                <div className="card-title">Roles</div>
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

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-nowrap table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th
                          onClick={() => handleSort("name")}
                          style={{ cursor: "pointer" }}
                        >
                          Role{" "}
                          {sortConfig.key === "name" &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Description</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRoles.length > 0 ? (
                        paginatedRoles.map((role, index) => (
                          <tr key={role._id}>
                            <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                            <td>{role.name}</td>
                            <td>{role.description || "-"}</td>
                            <td>
                              {role.permissions?.length
                                ? role.permissions.join(", ")
                                : "-"}
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div>
                                  <Link
                                    to={`/add-role/?uid=${role._id}`}
                                    className="btn btn-sm btn-link"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>
                                </div>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={role.isActive}
                                    onChange={() =>
                                      handleChangeStatus(role._id)
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No roles found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card-footer py-2">
                <div className="d-flex align-items-center">
                  <div>
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                    {Math.min(currentPage * PAGE_SIZE, filteredRoles.length)} of{" "}
                    {filteredRoles.length} Entries
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

export default ManageRoles;
