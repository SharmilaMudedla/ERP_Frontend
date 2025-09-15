import React, { useState, useEffect } from "react";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    roleId: "",
  });

  return (
    <div className="main-content app-content">
      <div className="container-fluid">
        <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h1 className="page-title fw-medium fs-18 mb-2">Add User</h1>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0);">Users</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add User
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">User Form</div>
              </div>
              <form>
                <div className="card-body">
                  <div className="row gy-3">
                    {/* Email */}
                    <div className="col-xl-6">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        required
                        placeholder="Enter email"
                      />
                    </div>
                    {/* Username */}
                    <div className="col-xl-6">
                      <label htmlFor="userName" className="form-label">
                        Username *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        required
                        placeholder="Enter username"
                      />
                    </div>

                    {/* Password */}
                    <div className="col-xl-6">
                      <label htmlFor="password" className="form-label">
                        Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        required
                        placeholder="Enter password"
                      />
                    </div>

                    {/* Role */}
                    <div className="col-xl-6">
                      <label htmlFor="roleId" className="form-label">
                        Role *
                      </label>
                      <select
                        className="form-select"
                        id="roleId"
                        name="roleId"
                        value={formData.roleId}
                        required
                      >
                        <option value="">Select role</option>
                        {/* {roles.map((role) => (
                          <option key={role._id} value={role._id}>
                            {role.name}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card-footer border-top-0">
                  <button type="submit" className="btn btn-primary">
                    Save User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
