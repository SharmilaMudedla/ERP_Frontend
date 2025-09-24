import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addPayroll,
  getSinglePayroll,
  updatePayroll,
} from "../../Services/payrollService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { getEmployees } from "../../Services/employeeService";
const initialStage = {
  employeeId: "",
  month: "",
  year: "",
  basicSalary: "",
  allowance: "",
  deduction: "",
  netSalary: "",
  paymentDate: "",
  paymentStatus: "",
};

const AddPayroll = () => {
  const [formData, setFormData] = useState(initialStage);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const PayrollId = params.get("uid");
  const navigate = useNavigate();
  const fetchEmployees = async () => {
    setLoader(true);
    try {
      const response = await getEmployees();
      if (response?.success) {
        setEmployees(response?.data || []);
      }
      console.log("response", response);
    } catch (error) {
      setEmployees([]);
      toast.error(error?.message || "Error fetching employees");
      console.error(" Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };
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
    let newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = "Employee Id is required.";
    if (!formData.month) newErrors.month = "Month is required.";
    if (!formData.year) newErrors.year = "Year is required.";
    if (!formData.basicSalary)
      newErrors.basicSalary = "Basic Salary is required.";
    if (!formData.allowance) newErrors.allowance = "Allowance is required.";
    if (!formData.deduction) newErrors.deduction = "Deduction is required.";
    if (!formData.netSalary) newErrors.netSalary = "Net Salary is required.";
    if (!formData.paymentDate)
      newErrors.paymentDate = "Payment Date is required.";
    if (!formData.paymentStatus)
      newErrors.paymentStatus = "Payment Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const fetchPayroll = async () => {
    setLoader(true);
    try {
      const response = await getSinglePayroll(PayrollId);
      if (response?.success) {
        const singlePayroll = response?.data || {};
        setFormData(singlePayroll);
      }
      toast.success(response?.message || "Details fetched successfully");
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
    if (PayrollId) {
      fetchPayroll();
    } else {
      setFormData(initialStage);
    }
  }, [PayrollId]);
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (PayrollId) {
        response = await updatePayroll(PayrollId, formData);
      } else {
        response = await addPayroll(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "Role saved successfully");
        navigate("/payroll");
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
              <h1 className="page-title fw-medium fs-18 mb-2">Add Payroll</h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/payroll"}>Payroll</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {PayrollId ? "Edit Payroll" : "Add Payroll"}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">Payroll Form</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row gy-3">
                      {/* Employee Id */}
                      <div className="col-xl-6">
                        <label htmlFor="employeeId" className="form-label">
                          Employee Name *
                        </label>
                        <select
                          className={`form-control ${
                            errors.employeeId
                              ? "is-invalid"
                              : formData.employeeId
                              ? "is-valid"
                              : ""
                          }`}
                          id="employeeId"
                          name="employeeId"
                          value={formData.employeeId || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select Employee</option>
                          {employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                              {employee.firstName} {employee.lastName}
                            </option>
                          ))}
                        </select>
                        {errors.employeeId && (
                          <div className="invalid-feedback">
                            {errors.employeeId}
                          </div>
                        )}
                      </div>

                      {/* Month */}
                      <div className="col-xl-6">
                        <label htmlFor="month" className="form-label">
                          Month *
                        </label>
                        <input
                          type="text"
                          id="month"
                          name="month"
                          value={formData.month || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.month
                              ? "is-invalid"
                              : formData.month
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Month "
                        />
                        {errors.month && (
                          <div className="invalid-feedback">{errors.month}</div>
                        )}
                      </div>

                      {/* Year */}
                      <div className="col-xl-6">
                        <label htmlFor="year" className="form-label">
                          Year *
                        </label>
                        <input
                          type="number"
                          id="year"
                          name="year"
                          value={formData.year || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.year
                              ? "is-invalid"
                              : formData.year
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Year"
                        />
                        {errors.year && (
                          <div className="invalid-feedback">{errors.year}</div>
                        )}
                      </div>

                      {/* Basic Salary */}
                      <div className="col-xl-6">
                        <label htmlFor="basicSalary" className="form-label">
                          Basic Salary *
                        </label>
                        <input
                          type="number"
                          id="basicSalary"
                          name="basicSalary"
                          value={formData.basicSalary || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.basicSalary
                              ? "is-invalid"
                              : formData.basicSalary
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Basic Salary"
                        />
                        {errors.basicSalary && (
                          <div className="invalid-feedback">
                            {errors.basicSalary}
                          </div>
                        )}
                      </div>

                      {/* Allowance */}
                      <div className="col-xl-6">
                        <label htmlFor="allowance" className="form-label">
                          Allowance *
                        </label>
                        <input
                          type="number"
                          id="allowance"
                          name="allowance"
                          value={formData.allowance || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.allowance
                              ? "is-invalid"
                              : formData.allowance
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Allowance"
                        />
                        {errors.allowance && (
                          <div className="invalid-feedback">
                            {errors.allowance}
                          </div>
                        )}
                      </div>

                      {/* Deduction */}
                      <div className="col-xl-6">
                        <label htmlFor="deduction" className="form-label">
                          Deduction *
                        </label>
                        <input
                          type="number"
                          id="deduction"
                          name="deduction"
                          value={formData.deduction || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.deduction
                              ? "is-invalid"
                              : formData.deduction
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Deduction"
                        />
                        {errors.deduction && (
                          <div className="invalid-feedback">
                            {errors.deduction}
                          </div>
                        )}
                      </div>

                      {/* Net Salary */}
                      <div className="col-xl-6">
                        <label htmlFor="netSalary" className="form-label">
                          Net Salary *
                        </label>
                        <input
                          type="number"
                          id="netSalary"
                          name="netSalary"
                          value={formData.netSalary || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.netSalary
                              ? "is-invalid"
                              : formData.netSalary
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter Net Salary"
                        />
                        {errors.netSalary && (
                          <div className="invalid-feedback">
                            {errors.netSalary}
                          </div>
                        )}
                      </div>

                      {/* Payment Date */}
                      <div className="col-xl-6">
                        <label htmlFor="paymentDate" className="form-label">
                          Payment Date *
                        </label>
                        <input
                          type="date"
                          id="paymentDate"
                          name="paymentDate"
                          value={formData.paymentDate || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.paymentDate
                              ? "is-invalid"
                              : formData.paymentDate
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.paymentDate && (
                          <div className="invalid-feedback">
                            {errors.paymentDate}
                          </div>
                        )}
                      </div>

                      {/* Payment Status */}
                      <div className="col-xl-6">
                        <label htmlFor="paymentStatus" className="form-label">
                          Payment Status *
                        </label>
                        <select
                          id="paymentStatus"
                          name="paymentStatus"
                          value={formData.paymentStatus || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.paymentStatus
                              ? "is-invalid"
                              : formData.paymentStatus
                              ? "is-valid"
                              : ""
                          }`}
                        >
                          <option value="">Select Status</option>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                        {errors.paymentStatus && (
                          <div className="invalid-feedback">
                            {errors.paymentStatus}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/payroll" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {PayrollId ? "Edit " : "Save"}
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

export default AddPayroll;
