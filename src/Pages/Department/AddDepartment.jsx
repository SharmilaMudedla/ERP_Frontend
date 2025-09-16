import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addDepartment,
  getSingleDepartment,
  updateDepartment,
} from "../../Services/departmentService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const initialStage = {
  name: "",
  description: "",
  managerId: "",
};

const AddDepartment = () => {
  const [formData, setFormData] = useState(initialStage);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const DepartmentId = params.get("uid");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Department name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDepartment = async () => {
    setLoader(true);
    try {
      const response = await getSingleDepartment(DepartmentId);
      if (response?.success) {
        const singleDepartment = response?.data || {};
        setFormData(singleDepartment);
      }
      toast.success(response?.message || "Department fetched successfully");
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error(error?.message || "Error fetching details");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (DepartmentId) {
      fetchDepartment();
    } else {
      setFormData(initialStage);
    }
  }, [DepartmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (DepartmentId) {
        response = await updateDepartment(DepartmentId, formData);
      } else {
        response = await addDepartment(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "Department saved successfully");
        navigate("/department");
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
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                {DepartmentId ? "Edit Department" : "Add Department"}
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/department"}>Department</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {DepartmentId ? "Edit Department" : "Add Department"}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Form */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">
                    {DepartmentId ? "Edit Department" : "Add Department"}
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row gy-3">
                      {/* Name */}
                      <div className="col-xl-6">
                        <label htmlFor="name" className="form-label">
                          Department Name *
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name
                              ? "is-invalid"
                              : formData.name
                              ? "is-valid"
                              : ""
                          }`}
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder="Enter department name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="col-xl-6">
                        <label htmlFor="description" className="form-label">
                          Description *
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.description
                              ? "is-invalid"
                              : formData.description
                              ? "is-valid"
                              : ""
                          }`}
                          id="description"
                          name="description"
                          value={formData.description || ""}
                          onChange={handleChange}
                          placeholder="Enter description"
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>

                      {/* Manager ID (optional dropdown if you fetch managers) */}
                      <div className="col-xl-6">
                        <label htmlFor="managerId" className="form-label">
                          Manager
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="managerId"
                          name="managerId"
                          value={formData.managerId || ""}
                          onChange={handleChange}
                          placeholder="Enter manager ID"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/department" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {DepartmentId ? "Update Department" : "Create Department"}
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

export default AddDepartment;
