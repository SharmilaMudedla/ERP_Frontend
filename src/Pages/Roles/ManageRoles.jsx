import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getRoles, changeRoleStatus } from "../../Services/roleService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 5;
  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    let valA = a[sortColumn] || "";
    let valB = b[sortColumn] || "";
    valA = typeof valA === "string" ? valA.toLowerCase() : valA;
    valB = typeof valB === "string" ? valB.toLowerCase() : valB;
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedRoles = sortedRoles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const fetchRoles = async () => {
    setLoader(true);
    try {
      const response = await getRoles();
      if (response?.success) {
        setRoles(response?.data || []);
      }
      console.log("response", response);
    } catch (error) {
      setRoles([]);
      toast.error(error?.message || "Error fetching Roles");
      console.error(" Error fetching Roles:", error);
    } finally {
      setLoader(false);
    }
  };
  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeRoleStatus(id);
      console.log("response", response);

      if (response?.success) {
        toast.success(response?.message || "Role Status Changed successfully");
        fetchRoles();
      }
    } catch (error) {
      toast.error(error?.message || "Error in Changing Role Status");
      console.error("Error in Changing Role Status:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div class="main-content app-content">
        <div class="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">Manage Roles</h1>
              <div className>
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
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div class="d-flex gap-2">
                <div class="position-relative">
                  <Link to={"/add-role"}>
                    {" "}
                    <button
                      class="btn btn-primary btn-wave"
                      type="button"
                      id="dropdownMenuClickableInside"
                    >
                      Add Role
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Page Header Close */}

          {/* Start:: row-1 */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                {/* <div className="card-header justify-content-between"> */}
                {/* <div className="card-title">Basic Tables</div> */}
                {/* </div> */}
                <div className="card-body">
                  <div id="grid-header-fixed">
                    <div
                      role="complementary"
                      className="gridjs gridjs-container"
                    >
                      <div className="gridjs-head">
                        <div className="gridjs-search">
                          <input
                            type="search"
                            placeholder="Type a keyword..."
                            aria-label="Type a keyword..."
                            className="gridjs-input gridjs-search-input"
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                            }}
                          />
                        </div>
                      </div>
                      <div className="gridjs-wrapper">
                        <table role="grid" className="gridjs-table">
                          <thead className="gridjs-thead">
                            <tr className="gridjs-tr">
                              <th
                                data-column-id="S.No"
                                className="gridjs-th gridjs-th-sort gridjs-th-fixed"
                                tabIndex={0}
                                style={{ left: "0px", width: "100px" }}
                              >
                                <div className="gridjs-th-content">S.No</div>
                                <button
                                  tabIndex={-1}
                                  aria-label="Sort column ascending"
                                  title="Sort column ascending"
                                  className="gridjs-sort gridjs-sort-neutral"
                                ></button>
                              </th>
                              <th
                                data-column-id="Role"
                                className="gridjs-th gridjs-th-sort gridjs-th-fixed"
                                tabIndex={0}
                                style={{ left: "0px", width: "150px" }}
                              >
                                <div className="gridjs-th-content">Role</div>
                                <button
                                  tabIndex={-1}
                                  aria-label="Sort column ascending"
                                  title="Sort column ascending"
                                  className="gridjs-sort gridjs-sort-neutral"
                                ></button>
                              </th>
                              <th
                                data-column-id="Permissions"
                                className="gridjs-th gridjs-th-sort gridjs-th-fixed"
                                tabIndex={0}
                                style={{ left: "0px", width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Permissions
                                </div>
                                <button
                                  tabIndex={-1}
                                  aria-label="Sort column ascending"
                                  title="Sort column ascending"
                                  className="gridjs-sort gridjs-sort-neutral"
                                ></button>
                              </th>
                              <th
                                data-column-id="Descrition"
                                className="gridjs-th gridjs-th-sort gridjs-th-fixed"
                                tabIndex={0}
                                style={{ left: "0px", width: "150px" }}
                              >
                                <div className="gridjs-th-content">
                                  Descrition
                                </div>
                                <button
                                  tabIndex={-1}
                                  aria-label="Sort column ascending"
                                  title="Sort column ascending"
                                  className="gridjs-sort gridjs-sort-neutral"
                                ></button>
                              </th>
                              <th
                                data-column-id="Actions"
                                className="gridjs-th gridjs-th-sort gridjs-th-fixed"
                                tabIndex={0}
                                style={{ left: "0px", width: "150px" }}
                              >
                                <div className="gridjs-th-content">Actions</div>
                                <button
                                  tabIndex={-1}
                                  aria-label="Sort column ascending"
                                  title="Sort column ascending"
                                  className="gridjs-sort gridjs-sort-neutral"
                                ></button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pagedRoles.length > 0 ? (
                              pagedRoles.map((role, index) => (
                                <tr className="gridjs-tr" key={role._id}>
                                  <td
                                    data-column-id="S.No"
                                    className="gridjs-td"
                                  >
                                    {(currentPage - 1) * itemsPerPage +
                                      index +
                                      1}
                                  </td>
                                  <td
                                    data-column-id="Role"
                                    className="gridjs-td"
                                  >
                                    {role.name}
                                  </td>
                                  <td
                                    data-column-id="Descrition"
                                    className="gridjs-td"
                                  >
                                    {role.description || "-"}
                                  </td>
                                  <td
                                    data-column-id="Permissions"
                                    className="gridjs-td"
                                  >
                                    {role.permissions?.length > 0
                                      ? role.permissions.join(", ")
                                      : "-"}
                                  </td>

                                  <td
                                    data-column-id="Actions"
                                    className="gridjs-td"
                                  >
                                    <div className="d-flex gap-2 align-items-center">
                                      {/* <i class="bi bi-eye"></i> */}
                                      <Link
                                        to={`/add-role/?uid=${role._id}`}
                                        className="btn btn-soft-primary btn-sm"
                                      >
                                        <i class="bi bi-pencil-square"></i>
                                      </Link>
                                      <div className="form-check form-switch">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={role.isActive}
                                          onChange={() =>
                                            handleChangeStatus(
                                              role._id,
                                              role.isActive
                                            )
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
                      <div className="gridjs-footer">
                        <div className="gridjs-pagination">
                          <div
                            role="status"
                            aria-live="polite"
                            className="gridjs-summary"
                            title={`Page ${currentPage} of ${totalPages}`}
                          >
                            Showing <b>{startIndex + 1}</b> to{" "}
                            <b>{Math.min(endIndex, filteredRoles.length)}</b> of{" "}
                            <b>{filteredRoles.length}</b> results
                          </div>
                          <div className="gridjs-pages">
                            <button
                              tabIndex={0}
                              role="button"
                              title="Previous page"
                              aria-label="Previous"
                              className="gridjs-prev"
                              disabled={currentPage === 1}
                              onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                              }
                            >
                              Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                tabIndex={0}
                                role="button"
                                title={`Page ${i + 1}`}
                                aria-label={`Page ${i + 1}`}
                                className={
                                  currentPage === i + 1
                                    ? "gridjs-currentPage"
                                    : "gridjs-prev"
                                }
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            ))}

                            <button
                              tabIndex={0}
                              role="button"
                              title="Next page"
                              aria-label="Next page"
                              className="gridjs-prev"
                              disabled={currentPage === totalPages}
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  Math.min(prev + 1, totalPages)
                                )
                              }
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End:: row-1 */}
        </div>
      </div>
    </>
  );
};

export default ManageRoles;
