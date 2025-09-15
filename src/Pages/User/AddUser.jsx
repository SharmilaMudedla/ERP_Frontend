import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { addUser, getUser, updateUser } from "../../Services/userService";
import { getRoles } from "../../Services/roleService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const initialStage = {
  name: "",
  email: "",
  password: "",
  roleId: "",
};

const AddUser = () => {
  const [formData, setFormData] = useState(initialStage);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const UserId = params.get("uid");
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const fetchUsers = async () => {
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
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!UserId && !formData.password.trim())
      newErrors.password = "Password is required.";
    if (!formData.roleId) newErrors.roleId = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchUser = async () => {
    setLoader(true);
    try {
      const response = await getUser(UserId);
      if (response?.success) {
        const singleUser = response?.data || {};
        setFormData(singleUser);
      }
      toast.success(response?.message || "User fetched successfully");
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error(error?.message || "Error fetching details");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchUser();
    } else {
      setFormData(initialStage);
    }
  }, [UserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (UserId) {
        response = await updateUser(UserId, formData);
      } else {
        response = await addUser(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "User saved successfully");
        navigate("/Users");
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error(error?.message || "Error in saving details");
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
                {UserId ? "Edit User" : "Add User"}
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/Users"}>Users</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {UserId ? "Edit User" : "Add User"}
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
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row gy-3">
                      {/* Name */}
                      <div className="col-xl-6">
                        <label htmlFor="name" className="form-label">
                          Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder="Enter name"
                        />
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
                        )}
                      </div>

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
                          value={formData.email || ""}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
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
                          value={formData.roleId || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select Role</option>
                          {roles.map((role) => (
                            <option key={role._id} value={role._id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                        {errors.roleId && (
                          <small className="text-danger">{errors.roleId}</small>
                        )}
                      </div>

                      {/* Password (only for new user) */}
                      {!UserId && (
                        <div className="col-xl-6">
                          <label htmlFor="password" className="form-label">
                            Password *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password || ""}
                            onChange={handleChange}
                            placeholder="Enter password"
                          />
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/Users" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {UserId ? "Edit User" : "Add User"}
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

export default AddUser;
