import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../../Services/employeeService";
import { getDepartments } from "../../Services/departmentService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const initialStage = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  address: "",
  departmentId: "",
  designation: "",
  joiningDate: "",
  employeeType: "",
  salaryStructure: "",
  status: "",
};

const AddEmployee = () => {
  const [formData, setFormData] = useState(initialStage);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [params] = useSearchParams();
  const EmployeeId = params.get("uid");
  const navigate = useNavigate();

  const [department, setDepartment] = useState([]);
  const fetchDepartments = async () => {
    setLoader(true);
    try {
      const response = await getDepartments();
      if (response?.success) {
        setDepartment(response?.data || []);
      }
      console.log("response", response);
    } catch (error) {
      setDepartment([]);
      toast.error(error?.message || "Error fetching department");
      console.error(" Error fetching department:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);
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
    if (!formData.employeeId) newErrors.employeeId = "Employee Id is required.";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";

    if (!formData.gender || !["MALE", "FEMALE"].includes(formData.gender))
      newErrors.gender = "Gender is required and must be Male or Female.";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required.";
    else if (isNaN(new Date(formData.dateOfBirth).getTime()))
      newErrors.dateOfBirth = "Invalid Date of Birth.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";

    if (!formData.address.trim()) newErrors.address = "Address is required.";

    if (!formData.departmentId)
      newErrors.departmentId = "Department is required.";

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required.";

    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining Date is required.";
    else if (isNaN(new Date(formData.joiningDate).getTime()))
      newErrors.joiningDate = "Invalid Joining Date.";

    const allowedEmployeeTypes = [
      "Full Time",
      "Part Time",
      "Contract",
      "Intern",
    ];
    if (
      !formData.employeeType ||
      !allowedEmployeeTypes.includes(formData.employeeType)
    )
      newErrors.employeeType = "Employee Type is required and invalid.";

    if ("salaryStructure" in formData && formData.salaryStructure.trim() === "")
      newErrors.salaryStructure = "Salary Structure cannot be empty.";

    const allowedStatuses = ["Active", "Resigned", "Terminated"];
    if (!formData.status || !allowedStatuses.includes(formData.status))
      newErrors.status = "Status is required and invalid.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const fetchEmployee = async () => {
    setLoader(true);
    try {
      const response = await getEmployee(EmployeeId);
      if (response?.success) {
        const singleEmployee = response?.data || {};
        setFormData(singleEmployee);
      }
      toast.success(response?.message || "Employee fetched successfully");
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error(error?.message || "Error fetching details");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (EmployeeId) {
      fetchEmployee();
    } else {
      setFormData(initialStage);
    }
  }, [EmployeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (EmployeeId) {
        response = await updateEmployee(EmployeeId, formData);
      } else {
        response = await addEmployee(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "Employee saved successfully");
        navigate("/employees");
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
                {EmployeeId ? "Edit Emplpoyee" : "Add Employee"}
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/employees"}>Employee</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {EmployeeId ? "Edit Employee" : "Add Employee"}
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
                      {/* Last Name */}
                      <div className="col-xl-6">
                        <label htmlFor="employeeId" className="form-label">
                          Employee Id *
                        </label>
                        <input
                          type="text"
                          name="employeeId"
                          id="employeeId"
                          value={formData.employeeId || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.employeeId
                              ? "is-invalid"
                              : formData.employeeId
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter EmployeeId"
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                      <div className="col-xl-6">
                        <label htmlFor="firstName" className="form-label">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.firstName
                              ? "is-invalid"
                              : formData.firstName
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="col-xl-6">
                        <label htmlFor="lastName" className="form-label">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.lastName
                              ? "is-invalid"
                              : formData.lastName
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">
                            {errors.lastName}
                          </div>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="col-xl-6">
                        <label htmlFor="gender" className="form-label">
                          Gender *
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleChange}
                          className={`form-select ${
                            errors.gender
                              ? "is-invalid"
                              : formData.gender
                              ? "is-valid"
                              : ""
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                        {errors.gender && (
                          <div className="invalid-feedback">
                            {errors.gender}
                          </div>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div className="col-xl-6">
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.dateOfBirth
                              ? "is-invalid"
                              : formData.dateOfBirth
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.dateOfBirth && (
                          <div className="invalid-feedback">
                            {errors.dateOfBirth}
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="col-xl-6">
                        <label htmlFor="email" className="form-label">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          placeholder="Enter email"
                          className={`form-control ${
                            errors.email
                              ? "is-invalid"
                              : formData.email
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="col-xl-6">
                        <label htmlFor="phone" className="form-label">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className={`form-control ${
                            errors.phone
                              ? "is-invalid"
                              : formData.phone
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                      {/* Department */}
                      <div className="col-xl-6">
                        <label htmlFor="departmentId" className="form-label">
                          Department *
                        </label>
                        <select
                          id="departmentId"
                          name="departmentId"
                          value={formData.departmentId || ""}
                          onChange={handleChange}
                          className={`form-select ${
                            errors.departmentId
                              ? "is-invalid"
                              : formData.departmentId
                              ? "is-valid"
                              : ""
                          }`}
                        >
                          <option value="">Select Department</option>
                          {department.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                        {errors.departmentId && (
                          <div className="invalid-feedback">
                            {errors.departmentId}
                          </div>
                        )}
                      </div>

                      {/* Address */}
                      <div className="col-xl-12">
                        <label htmlFor="address" className="form-label">
                          Address *
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          rows="3"
                          className={`form-control ${
                            errors.address
                              ? "is-invalid"
                              : formData.address
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Enter address"
                        />
                        {errors.address && (
                          <div className="invalid-feedback">
                            {errors.address}
                          </div>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="col-xl-6">
                        <label htmlFor="designation" className="form-label">
                          Designation *
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          value={formData.designation || ""}
                          onChange={handleChange}
                          placeholder="Enter designation"
                          className={`form-control ${
                            errors.designation
                              ? "is-invalid"
                              : formData.designation
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.designation && (
                          <div className="invalid-feedback">
                            {errors.designation}
                          </div>
                        )}
                      </div>

                      {/* Joining Date */}
                      <div className="col-xl-6">
                        <label htmlFor="joiningDate" className="form-label">
                          Joining Date *
                        </label>
                        <input
                          type="date"
                          id="joiningDate"
                          name="joiningDate"
                          value={formData.joiningDate || ""}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.joiningDate
                              ? "is-invalid"
                              : formData.joiningDate
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        {errors.joiningDate && (
                          <div className="invalid-feedback">
                            {errors.joiningDate}
                          </div>
                        )}
                      </div>

                      {/* Employee Type */}
                      <div className="col-xl-6">
                        <label htmlFor="employeeType" className="form-label">
                          Employee Type *
                        </label>
                        <select
                          id="employeeType"
                          name="employeeType"
                          value={formData.employeeType || ""}
                          onChange={handleChange}
                          className={`form-select ${
                            errors.employeeType
                              ? "is-invalid"
                              : formData.employeeType
                              ? "is-valid"
                              : ""
                          }`}
                        >
                          <option value="">Select Employee Type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Intern">Intern</option>
                        </select>
                        {errors.employeeType && (
                          <div className="invalid-feedback">
                            {errors.employeeType}
                          </div>
                        )}
                      </div>

                      {/* Salary Structure */}
                      <div className="col-xl-6">
                        <label htmlFor="salaryStructure" className="form-label">
                          Salary Structure
                        </label>
                        <input
                          type="text"
                          id="salaryStructure"
                          name="salaryStructure"
                          value={formData.salaryStructure || ""}
                          onChange={handleChange}
                          placeholder="Enter salary structure"
                          className="form-control"
                        />
                      </div>

                      {/* Status */}
                      <div className="col-xl-6">
                        <label htmlFor="status" className="form-label">
                          Status *
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status || ""}
                          onChange={handleChange}
                          className={`form-select ${
                            errors.status
                              ? "is-invalid"
                              : formData.status
                              ? "is-valid"
                              : ""
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Resigned">Resigned</option>
                          <option value="Terminated">Terminated</option>
                        </select>
                        {errors.status && (
                          <div className="invalid-feedback">
                            {errors.status}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/Employees" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {EmployeeId ? "Edit Employee" : "Add Employee"}
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

export default AddEmployee;
