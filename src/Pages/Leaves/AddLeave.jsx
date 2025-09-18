import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addLeave,
  getSingleLeave,
  updateLeave,
  getProfileDetails,
} from "../../Services/addleaveService";
import { getUsers } from "../../Services/userService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const initialStage = {
  employeeId: "",
  employeeName: "",
  reportingManager: "",
  leavesLeft: "",
  startDate: "",
  endDate: "",
  totalDays: 0,
  reason: "",
};

const AddLeave = () => {
  const [formData, setFormData] = useState(initialStage);
  const [employees, setEmployees] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [params] = useSearchParams();
  const leaveId = params.get("uid");
  const navigate = useNavigate();
  const [leaveleft, setLeaveleft] = useState(12);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "startDate" || name === "endDate") {
        if (updated.startDate && updated.endDate) {
          const start = new Date(updated.startDate);
          const end = new Date(updated.endDate);
          if (start <= end) {
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            updated.totalDays = days;
            const defaultLeaves = 12;
            updated.leavesLeft = defaultLeaves - days;
            if (updated.leavesLeft < 0) updated.leavesLeft = 0;
          } else {
            updated.totalDays = 0;
            updated.leavesLeft = 12;
          }
        }
      }

      return updated;
    });

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

    if (!formData.employeeId) newErrors.employeeId = "Employee is required.";
    if (!formData.employeeName.trim())
      newErrors.employeeName = "Employee Name is required.";
    if (!formData.reportingManager)
      newErrors.reportingManager = "Reporting Manager is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.endDate) newErrors.endDate = "End Date is required.";
    if (!formData.totalDays || formData.totalDays <= 0)
      newErrors.totalDays = "Total Days must be greater than zero.";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
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

  const fetchEmployeeDetails = async () => {
    setLoader(true);
    try {
      const response = await getProfileDetails();
      if (response?.success) {
        const employeeData = response?.data || {};
        setEmployees(employeeData);

        setFormData((prev) => ({
          ...prev,
          employeeId: employeeData.employeeId || "",
          employeeName:
            employeeData.firstName && employeeData.lastName
              ? `${employeeData.firstName} ${employeeData.lastName}`
              : "",
        }));
      }
      console.log("response", response);
    } catch (error) {
      setEmployees([]);
      toast.error(error?.message || "Error fetching employees");
      console.error("Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployeeDetails();
  }, []);
  const fetchLeave = async () => {
    setLoader(true);
    try {
      const response = await getSingleLeave(leaveId);
      if (response?.success) {
        const singleleave = response?.data || {};
        setFormData(singleleave);
      }
      toast.success(response?.message || "Leave fetched successfully");
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
    if (leaveId) {
      fetchLeave();
    } else {
      setFormData(initialStage);
    }
  }, [leaveId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);

    try {
      let response;
      if (leaveId) {
        response = await updateLeave(leaveId, formData);
      } else {
        response = await addLeave(formData);
      }

      if (response?.success) {
        toast.success(response?.message || "User saved successfully");
        navigate("/Users");
        setLeaveleft(response.leaveleft);
      }
    } catch (error) {
      console.error("Error saving Details:", error);
      toast.error(error?.message || "Error in saving details");
    } finally {
      setLoader(false);
    }
  };

  const managers = users.filter((user) => user.roleId?.name === "manager");
  console.log("managers", managers);
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                {leaveId ? "Edit Leave" : "Add Leave"}
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={"/Users"}>Employees</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {leaveId ? "Edit Leave" : "Add Leave"}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row gy-3">
                      <div className="col-xl-6">
                        <label htmlFor="employeeId" className="form-label">
                          Employee Id
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="employeeId"
                          name="employeeId"
                          value={employees.employeeId}
                          readOnly
                        />
                      </div>
                      {/* Leave Left */}
                      <div className="col-xl-6">
                        <label htmlFor="employeeName" className="form-label">
                          Employee Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="employeeName"
                          name="employeeName"
                          value={employees.firstName + " " + employees.lastName}
                          readOnly
                        />
                      </div>
                      {/* Reporting Manager */}
                      <div className="col-xl-6">
                        <label
                          htmlFor="reportingManager"
                          className="form-label"
                        >
                          Reporting Manager
                        </label>
                        <select
                          className={`form-control${
                            errors.reportingManager ? " is-invalid" : ""
                          }`}
                          id="reportingManager"
                          name="reportingManager"
                          value={formData.reportingManager}
                          onChange={handleChange}
                        >
                          <option value="">Select Manager</option>
                          {managers &&
                            managers.map((manager) => (
                              <option key={manager._id} value={manager._id}>
                                {manager.name}
                              </option>
                            ))}
                        </select>
                        {errors.reportingManager && (
                          <div className="invalid-feedback">
                            {errors.reportingManager}
                          </div>
                        )}
                      </div>
                      {/* Leave Left */}
                      <div className="col-xl-6">
                        <label htmlFor="leavesLeft" className="form-label">
                          Leave Left
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="leavesLeft"
                          name="leavesLeft"
                          value={leaveleft}
                          readOnly
                        />
                      </div>
                      {/* Leave Type */}
                      <div className="col-xl-12">
                        <label className="form-label">Leave Type</label>
                        <div>
                          <label className="me-3">
                            <input
                              type="radio"
                              name="leaveType"
                              value="Leave"
                              checked={formData.leaveType === "Leave"}
                              onChange={handleChange}
                            />{" "}
                            Leave
                          </label>
                          <label className="me-3">
                            <input
                              type="radio"
                              name="leaveType"
                              value="Medical Leave"
                              checked={formData.leaveType === "Medical Leave"}
                              onChange={handleChange}
                            />{" "}
                            Medical Leave
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="leaveType"
                              value="Other Type Leave"
                              checked={
                                formData.leaveType === "Other Type Leave"
                              }
                              onChange={handleChange}
                            />{" "}
                            Other Type Leave
                          </label>
                        </div>
                        {errors.leaveType && (
                          <div className="invalid-feedback d-block">
                            {errors.leaveType}
                          </div>
                        )}
                      </div>

                      {/* From Date & Day Type */}
                      <div className="col-xl-6">
                        <label htmlFor="startDate" className="form-label">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className={`form-control${
                            errors.startDate ? " is-invalid" : ""
                          }`}
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                        {errors.startDate && (
                          <div className="invalid-feedback">
                            {errors.startDate}
                          </div>
                        )}
                      </div>

                      {/* To Date & Day Type */}
                      <div className="col-xl-6">
                        <label htmlFor="endDate" className="form-label">
                          End Date
                        </label>
                        <input
                          type="date"
                          className={`form-control${
                            errors.endDate ? " is-invalid" : ""
                          }`}
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                        {errors.endDate && (
                          <div className="invalid-feedback">
                            {errors.endDate}
                          </div>
                        )}
                      </div>
                      {/* Total Days  */}
                      <div className="col-xl-6">
                        <label htmlFor="totalDays" className="form-label">
                          Number of Days
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="totalDays"
                          name="totalDays"
                          value={formData.totalDays}
                          readOnly
                        />
                        {errors.totalDays && (
                          <div className="invalid-feedback">
                            {errors.totalDays}
                          </div>
                        )}
                      </div>
                      {/* Reason For Leave */}
                      <div className="col-xl-12">
                        <label className="form-label">Reason For Leave</label>
                        <textarea
                          className={`form-control${
                            errors.reason ? " is-invalid" : ""
                          }`}
                          rows={3}
                          name="reason"
                          placeholder="Type here Reason for leave"
                          value={formData.reason}
                          onChange={handleChange}
                        />
                        {errors.reason && (
                          <div className="invalid-feedback">
                            {errors.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <Link to="/Users" className="btn btn-danger">
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {leaveId ? "Edit " : "Save"}
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

export default AddLeave;
