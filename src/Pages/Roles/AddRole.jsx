import React, { useEffect, useState } from "react";
import { addRole, getRole, updateRole } from "../../Services/roleService";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";

const initialStage = {
  name: "",
  description: "",
  permissions: [],
};

const AddRole = () => {
  const [formData, setFormData] = useState(initialStage);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const RoleId = params.get("uid");
  const navigate = useNavigate();

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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Role name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.permissions.length)
      newErrors.permissions = "At least one permission is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchRole = async () => {
    setLoader(true);
    try {
      const response = await getRole(RoleId);
      if (response?.success) {
        const singleRole = response?.data || {};
        setFormData(singleRole);
      }
      toast.success(response?.message || "Role fetched successfully");
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching details"
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (RoleId) {
      fetchRole();
    } else {
      setFormData(initialStage);
    }
  }, [RoleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (RoleId) {
        response = await updateRole(RoleId, formData);
      } else {
        response = await addRole(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "Role saved successfully");
        navigate("/Roles");
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error in saving details"
      );
    } finally {
      setLoader(false);
    }
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
                {RoleId ? "Edit Role" : "Add Role"}
              </h1>
              <div>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/Roles">Roles</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {RoleId ? "Edit Role" : "Add Role"}
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
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder="Enter role name"
                          disabled={loader}
                        />
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
                        )}
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
                          value={formData.description || ""}
                          onChange={handleChange}
                          placeholder="Enter description"
                          disabled={loader}
                        ></textarea>
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        )}
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
                                value={perm || ""}
                                checked={formData.permissions.includes(perm)}
                                onChange={handleChange}
                                disabled={loader}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={perm}
                              >
                                {perm}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.permissions && (
                          <small className="text-danger">
                            {errors.permissions}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/Roles" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {RoleId ? "Update Role" : "Create Role"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
