import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getRoles, changeRoleStatus } from "../../Services/roleService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState(false);
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
                <div className="card-header justify-content-between">
                  {/* <div className="card-title">Basic Tables</div> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th scope="col">Role</th>
                          <th scope="col">Permissions</th>
                          <th scope="col">Descrition</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles?.length > 0 ? (
                          roles.map((role, index) => (
                            <tr key={role._id}>
                              <td>{index + 1}</td>
                              <td>{role.name}</td>
                              <td>{role.description || "-"}</td>
                              <td>
                                {role.permissions?.length > 0
                                  ? role.permissions.join(", ")
                                  : "-"}
                              </td>

                              <td>
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
