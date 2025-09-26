import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  addSalary,
  getSingleSalarystructure,
  updateSalarystructure,
} from "../../Services/salaryService";
import { toast } from "sonner";

const initialState = {
  basicSalary: "",
  HRA: "",
  transportAllowance: "",
  otherAllowance: "",
  taxPercentage: "",
  pf: "",
  esi: "",
};

const AddSalary = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [params] = useSearchParams();
  const salaryId = params.get("uid");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.basicSalary)
      newErrors.basicSalary = "Basic Salary is required.";
    if (!formData.HRA) newErrors.HRA = "HRA is required.";
    if (!formData.transportAllowance)
      newErrors.transportAllowance = "Transport Allowance is required.";
    if (!formData.otherAllowance)
      newErrors.otherAllowance = "Other Allowance is required.";
    if (!formData.taxPercentage)
      newErrors.taxPercentage = "Tax Percentage is required.";
    if (!formData.pf) newErrors.pf = "PF is required.";
    if (!formData.esi) newErrors.esi = "ESI is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchSalary = async () => {
    try {
      const response = await getSingleSalarystructure(salaryId);
      if (response?.success) {
        setFormData(response?.data);
      } else {
        toast.error(response?.message || "Failed to get salary structure");
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader(true);
    try {
      let response;
      if (salaryId) {
        response = await updateSalarystructure(salaryId, formData);
      } else {
        response = await addSalary(formData);
      }
      if (response?.success) {
        toast.success(response?.message || "Salary saved successfully");
        navigate("/salary");
      } else {
        toast.error(response?.message || "Failed to save salary");
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (salaryId) {
      fetchSalary();
    } else {
      setFormData(initialState);
    }
  }, [salaryId]);

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">Add Salary</h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/department"}>Salary</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Salary
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
                    <h4 className="mb-0">
                      {salaryId ? "Update Salary" : "Add Salary"}
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row gy-3">
                      {/* Basic Salary */}
                      <div className="col-xl-6">
                        <label htmlFor="basicSalary" className="form-label">
                          Basic Salary *
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.basicSalary
                              ? "is-invalid"
                              : formData.basicSalary
                              ? "is-valid"
                              : ""
                          }`}
                          id="basicSalary"
                          name="basicSalary"
                          value={formData.basicSalary}
                          onChange={handleChange}
                          placeholder="Enter Basic Salary"
                        />
                        {errors.basicSalary && (
                          <div className="invalid-feedback">
                            {errors.basicSalary}
                          </div>
                        )}
                      </div>

                      {/* HRA */}
                      <div className="col-xl-6">
                        <label htmlFor="HRA" className="form-label">
                          HRA *
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.HRA
                              ? "is-invalid"
                              : formData.HRA
                              ? "is-valid"
                              : ""
                          }`}
                          id="HRA"
                          name="HRA"
                          value={formData.HRA}
                          onChange={handleChange}
                          placeholder="Enter HRA"
                        />
                        {errors.HRA && (
                          <div className="invalid-feedback">{errors.HRA}</div>
                        )}
                      </div>

                      {/* Transport Allowance */}
                      <div className="col-xl-6">
                        <label
                          htmlFor="transportAllowance"
                          className="form-label"
                        >
                          Transport Allowance
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.transportAllowance
                              ? "is-invalid"
                              : formData.transportAllowance
                              ? "is-valid"
                              : ""
                          }`}
                          id="transportAllowance"
                          name="transportAllowance"
                          value={formData.transportAllowance}
                          onChange={handleChange}
                          placeholder="Enter Transport Allowance"
                        />
                        {errors.transportAllowance && (
                          <div className="invalid-feedback">
                            {errors.transportAllowance}
                          </div>
                        )}
                      </div>

                      {/* Other Allowance */}
                      <div className="col-xl-6">
                        <label htmlFor="otherAllowance" className="form-label">
                          Other Allowance
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.otherAllowance
                              ? "is-invalid"
                              : formData.otherAllowance
                              ? "is-valid"
                              : ""
                          }`}
                          id="otherAllowance"
                          name="otherAllowance"
                          value={formData.otherAllowance}
                          onChange={handleChange}
                          placeholder="Enter Other Allowance"
                        />
                        {errors.otherAllowance && (
                          <div className="invalid-feedback">
                            {errors.otherAllowance}
                          </div>
                        )}
                      </div>

                      {/* Tax Percentage */}
                      <div className="col-xl-6">
                        <label htmlFor="taxPercentage" className="form-label">
                          Tax Percentage
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.taxPercentage
                              ? "is-invalid"
                              : formData.taxPercentage
                              ? "is-valid"
                              : ""
                          }`}
                          id="taxPercentage"
                          name="taxPercentage"
                          value={formData.taxPercentage}
                          onChange={handleChange}
                          placeholder="Enter Tax Percentage"
                        />
                        {errors.taxPercentage && (
                          <div className="invalid-feedback">
                            {errors.taxPercentage}
                          </div>
                        )}
                      </div>

                      {/* PF */}
                      <div className="col-xl-6">
                        <label htmlFor="pf" className="form-label">
                          PF
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.pf
                              ? "is-invalid"
                              : formData.pf
                              ? "is-valid"
                              : ""
                          }`}
                          id="pf"
                          name="pf"
                          value={formData.pf}
                          onChange={handleChange}
                          placeholder="Enter PF"
                        />
                        {errors.pf && (
                          <div className="invalid-feedback">{errors.pf}</div>
                        )}
                      </div>

                      {/* ESI */}
                      <div className="col-xl-6">
                        <label htmlFor="esi" className="form-label">
                          ESI
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.esi
                              ? "is-invalid"
                              : formData.esi
                              ? "is-valid"
                              : ""
                          }`}
                          id="esi"
                          name="esi"
                          value={formData.esi}
                          onChange={handleChange}
                          placeholder="Enter ESI"
                        />
                        {errors.esi && (
                          <div className="invalid-feedback">{errors.esi}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/department" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {salaryId ? "Update Salary" : "Add Salary"}
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

export default AddSalary;
