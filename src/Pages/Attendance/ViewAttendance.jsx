import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";
import { getEmployees } from "../../Services/employeeService";
import { getAttendenceByDate } from "../../Services/attendenceService";
import "./Attendance.css";
const ViewAttendance = () => {
  const [loader, setLoader] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchEmployees = async () => {
    setLoader(true);
    try {
      const response = await getEmployees();
      if (response?.success) {
        setEmployees(response?.data || []);
      }

      // console.log("response", response);
    } catch (error) {
      setEmployees([]);
      toast.error(error?.message || "Error fetching employees");
      console.error(" Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };

  const getEmployeeAttendance = async (date) => {
    setLoader(true);
    try {
      const response = await getAttendenceByDate(date);
      if (response?.success) {
        setAttendance(response.data || []);
      }
    } catch (error) {
      toast.error(error?.message || "Error fetching employees");
      setAttendance([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEmployeeAttendance(selectedDate);
    fetchEmployees();
  }, [selectedDate]);
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
                View Attendance
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
                  <h4 className="card-title m-0">View Attendance</h4>
                  <input
                    type="date"
                    id="attendance-date"
                    className="form-control"
                    style={{ maxWidth: 200 }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <form>
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
                          {attendance.map((att, idx) => {
                            // console.log("emp", emp);
                            const matchedEmployee = employees.find(
                              (emp) => emp.employeeId === att.employeeId
                            );
                            const firstName = matchedEmployee
                              ? matchedEmployee.firstName +
                                " " +
                                matchedEmployee.lastName
                              : "Unknown";
                            const gender = matchedEmployee
                              ? matchedEmployee.gender
                              : "Unknown";
                            return (
                              <tr key={att.employeeId}>
                                <td>{idx + 1}</td>
                                <td>{att.employeeId || ""}</td>
                                <td>{firstName || ""}</td>
                                <td>{gender || ""}</td>
                                <td>{att.checkInTime || ""}</td>
                                <td>{att.checkOutTime || ""}</td>
                                <td>
                                  <div className="d-flex gap-3">
                                    {["present", "absent", "leave"].map(
                                      (status) => (
                                        <label
                                          key={status}
                                          className="radio-label"
                                        >
                                          <input
                                            className={`radio-input ${status}`}
                                            type="radio"
                                            name={`status-${att.employeeId}`}
                                            value={status || ""}
                                            checked={
                                              att.status.toLowerCase() ===
                                              status
                                            }
                                            readOnly
                                          />
                                          {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                        </label>
                                      )
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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

export default ViewAttendance;
