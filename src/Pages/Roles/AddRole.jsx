import React, { useState } from "react";

const AddRole = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const allPermissions = ["CREATE", "READ", "UPDATE", "DELETE"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "permissions") {
      let updatedPermissions = [...formData.permissions];
      if (checked) {
        updatedPermissions.push(value);
      } else {
        updatedPermissions = updatedPermissions.filter((p) => p !== value);
      }
      setFormData({ ...formData, permissions: updatedPermissions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Role:", formData);
  };

  return (
    <div className="main-content app-content">
      <div className="container-fluid">
        <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h1 className="page-title fw-medium fs-18 mb-2">Add Role</h1>
            <div>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:void(0);">Roles</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Role
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">Role Form</div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row gy-3">
                    {/* Name */}
                    <div className="col-xl-12">
                      <label htmlFor="name" className="form-label">
                        Role Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter role name"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-xl-12">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                      ></textarea>
                    </div>

                    {/* Permissions */}
                    <div className="col-xl-12">
                      <label className="form-label">Permissions</label>
                      <div className="d-flex flex-wrap gap-3">
                        {allPermissions.map((perm) => (
                          <div key={perm} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={perm}
                              name="permissions"
                              value={perm}
                              checked={formData.permissions.includes(perm)}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={perm}>
                              {perm}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer border-top-0">
                  <button type="submit" className="btn btn-primary">
                    Save Role
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

export default AddRole;
