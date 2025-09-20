import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, changeUserStatus } from "../../Services/userService";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const response = await getUsers();
      if (response?.success) {
        setUsers(response?.data || []);
      }
    } catch (error) {
      setUsers([]);
      toast.error(error?.message || "Error fetching users");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeUserStatus(id);
      if (response?.success) {
        toast.success(response?.message || "User status updated");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error?.message || "Error updating status");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">Manage Users</h1>
              <div>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Users
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Link to="/add-user">
                <button className="btn btn-primary btn-wave" type="button">
                  Add User
                </button>
              </Link>
            </div>
          </div>

          {/* Users Table */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email || "-"}</td>
                              <td>{user.roleId?.name || "-"}</td>
                              <td>
                                <div className="d-flex gap-2 align-items-center">
                                  <Link
                                    to={`/add-user/?uid=${user._id}`}
                                    className="btn btn-soft-primary btn-sm j"
                                  >
                                    <button className="btn btn-secondary-light btn-icon btn-sm">
                                      <i className="ti ti-pencil " />
                                    </button>
                                  </Link>

                                  {/* <Link
                                    to={`/add-user/?uid=${user._id}`}
                                    className="btn btn-soft-primary btn-sm"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link> */}
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={user.isActive}
                                      onChange={() =>
                                        handleChangeStatus(
                                          user._id,
                                          user.isActive
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
                            <td colSpan="5" className="text-center">
                              No users found
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

export default ManageUsers;
