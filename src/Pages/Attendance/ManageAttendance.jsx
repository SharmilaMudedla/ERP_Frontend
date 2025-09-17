import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getEmployees } from "../../Services/employeeService";
import {
  addAttendance,
  updateAttendance,
  getAttendenceByDate,
} from "../../Services/attendenceService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const ManageAttendance = () => {
  const [loader, setLoader] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState({});

  const fetchEmployees = async () => {
    setLoader(true);
    try {
      const response = await getEmployees();
      if (response?.success) {
        setEmployees(response.data || []);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching employees");
      setEmployees([]);
    } finally {
      setLoader(false);
    }
  };

  const fetchAttendanceByDate = async (date) => {
    setLoader(true);
    try {
      const response = await getAttendenceByDate(date);
      if (response?.success) {
        const attObj = {};
        response.data.forEach((att) => {
          attObj[att.employeeId._id] = {
            id: att._id,
            checkInTime: att.checkInTime
              ? att.checkInTime.substring(11, 16)
              : "",
            checkOutTime: att.checkOutTime
              ? att.checkOutTime.substring(11, 16)
              : "",
            status: att.status.toLowerCase(),
          };
        });
        setAttendanceData(attObj);
      } else {
        setAttendanceData({});
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching attendance");
      setAttendanceData({});
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAttendanceByDate(selectedDate);
    }
  }, [selectedDate]);

  const handleAttendanceChange = (employeeId, field, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [field]: value,
      },
    }));

    if (errors[employeeId]?.[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors[employeeId]) {
          delete newErrors[employeeId][field];
          if (Object.keys(newErrors[employeeId]).length === 0) {
            delete newErrors[employeeId];
          }
        }
        return newErrors;
      });
    }
  };

  const validateAttendance = () => {
    let newErrors = {};
    employees.forEach((emp) => {
      const att = attendanceData[emp._id] || {};
      if (!att.checkInTime) {
        newErrors[emp._id] = {
          ...newErrors[emp._id],
          checkInTime: "Check-in time required",
        };
      }
      if (!att.checkOutTime) {
        newErrors[emp._id] = {
          ...newErrors[emp._id],
          checkOutTime: "Check-out time required",
        };
      }
      if (!att.status) {
        newErrors[emp._id] = {
          ...newErrors[emp._id],
          status: "Status required",
        };
      }
    });

    setErrors(newErrors);

    const firstErrEmp = Object.keys(newErrors)[0];
    if (firstErrEmp) {
      const firstErrField = Object.keys(newErrors[firstErrEmp])[0];
      toast.error(newErrors[firstErrEmp][firstErrField]);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAttendance()) return;
    setLoader(true);

    try {
      for (const emp of employees) {
        const att = attendanceData[emp._id];
        if (!att) continue;

        const payload = {
          employeeId: emp.employeeId,
          date: selectedDate,
          checkInTime: new Date(`${selectedDate}T${att.checkInTime}`),
          checkOutTime: new Date(`${selectedDate}T${att.checkOutTime}`),
          status: att.status.charAt(0).toUpperCase() + att.status.slice(1),
        };

        if (att.id) {
          await updateAttendance(att.id, payload);
        } else {
          await addAttendance(payload);
        }
      }
      toast.success("Attendance saved successfully");
      fetchAttendanceByDate(selectedDate);
    } catch (error) {
      toast.error(error?.message || "Error saving attendance");
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
                Manage Attendance
              </h1>
              <div>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Attendance
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {/* Page Header Close */}

          {/* Date selection and attendance table */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title m-0">
                    Attendance for {selectedDate}
                  </h4>
                  <input
                    type="date"
                    id="attendance-date"
                    className="form-control"
                    style={{ maxWidth: 200 }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table text-nowrap">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Gender</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Attendance Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((emp, idx) => {
                            const att = attendanceData[emp._id] || {};
                            return (
                              <tr key={emp._id}>
                                <td>{idx + 1}</td>
                                <td>{emp.employeeId}</td>
                                <td>
                                  {emp.firstName} {emp.lastName}
                                </td>
                                <td>{emp.gender}</td>
                                <td>
                                  <div className="input-group">
                                    <span className="input-group-text text-muted">
                                      <i className="ri-time-line" />
                                    </span>
                                    <input
                                      type="time"
                                      className="form-control"
                                      name="checkInTime"
                                      value={att.checkInTime || ""}
                                      onChange={(e) =>
                                        handleAttendanceChange(
                                          emp._id,
                                          "checkInTime",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  {errors[emp._id]?.checkInTime && (
                                    <small className="text-danger">
                                      {errors[emp._id].checkInTime}
                                    </small>
                                  )}
                                </td>
                                <td>
                                  <div className="input-group">
                                    <span className="input-group-text text-muted">
                                      <i className="ri-time-line" />
                                    </span>
                                    <input
                                      type="time"
                                      className="form-control"
                                      name="checkOutTime"
                                      value={att.checkOutTime || ""}
                                      onChange={(e) =>
                                        handleAttendanceChange(
                                          emp._id,
                                          "checkOutTime",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  {errors[emp._id]?.checkOutTime && (
                                    <small className="text-danger">
                                      {errors[emp._id].checkOutTime}
                                    </small>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    {["present", "absent", "leave"].map(
                                      (status) => (
                                        <label key={status}>
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`status-${emp._id}`}
                                            value={status}
                                            checked={att.status === status}
                                            onChange={(e) =>
                                              handleAttendanceChange(
                                                emp._id,
                                                "status",
                                                e.target.value
                                              )
                                            }
                                          />
                                          {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                        </label>
                                      )
                                    )}
                                  </div>
                                  {errors[emp._id]?.status && (
                                    <small className="text-danger">
                                      {errors[emp._id].status}
                                    </small>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer border-top-0 d-flex justify-content-between">
                    <h4></h4>
                    <button type="submit" className="btn btn-primary">
                      Save
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

export default ManageAttendance;
