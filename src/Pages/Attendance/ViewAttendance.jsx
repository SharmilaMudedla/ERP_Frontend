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
                            <th>Employee Name</th>
                            <th>Check-In & Out</th>
                            <th>Overtime</th>
                            <th>Attendance Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance && attendance.length > 0 ? (
                            attendance.map((att, idx) => {
                              const matchedEmployee = employees.find(
                                (emp) => emp.employeeId === att.employeeId
                              );
                              const firstName = matchedEmployee
                                ? `${matchedEmployee.firstName} ${matchedEmployee.lastName}`
                                : "Unknown";

                              return (
                                <tr key={att.employeeId}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    {firstName || ""}
                                    <br></br>
                                    <span>
                                      <b>{att.employeeId || ""}</b>
                                    </span>
                                  </td>

                                  <td>
                                    <div
                                      className="d-flex align-items-center"
                                      style={{ minWidth: "220px" }}
                                    >
                                      <span className="check-inColor fw-bold">
                                        {att.checkInTime || "--"}
                                      </span>

                                      <div
                                        className="mx-2 position-relative timeline"
                                        style={{ width: "120px" }}
                                      >
                                        <hr className="m-0" />
                                        <span
                                          className="position-absolute top-50 start-50 translate-middle text-muted small"
                                          style={{
                                            background: "#fff",
                                            padding: "0 4px",
                                          }}
                                        >
                                          {att.checkInTime && att.checkOutTime
                                            ? (() => {
                                                const parseTime = (timeStr) => {
                                                  if (!timeStr) return null;
                                                  const [time, modifier] =
                                                    timeStr.split(" ");
                                                  let [hours, minutes] = time
                                                    .split(":")
                                                    .map(Number);

                                                  if (
                                                    modifier === "PM" &&
                                                    hours < 12
                                                  )
                                                    hours += 12;
                                                  if (
                                                    modifier === "AM" &&
                                                    hours === 12
                                                  )
                                                    hours = 0;

                                                  const date = new Date();
                                                  date.setHours(
                                                    hours,
                                                    minutes,
                                                    0,
                                                    0
                                                  );
                                                  return date;
                                                };

                                                const inTime = parseTime(
                                                  att.checkInTime
                                                );
                                                const outTime = parseTime(
                                                  att.checkOutTime
                                                );

                                                if (!inTime || !outTime)
                                                  return "";

                                                const diffMs = outTime - inTime;
                                                const hours = Math.floor(
                                                  diffMs / (1000 * 60 * 60)
                                                );
                                                const mins = Math.floor(
                                                  (diffMs % (1000 * 60 * 60)) /
                                                    (1000 * 60)
                                                );

                                                return `${hours}h ${mins}m`;
                                              })()
                                            : ""}
                                        </span>
                                      </div>
                                      <span className="check-OutColor fw-bold">
                                        {att.checkOutTime || "--"}
                                      </span>
                                    </div>
                                  </td>

                                  <td>
                                    {att.checkInTime && att.checkOutTime
                                      ? (() => {
                                          const parseTime = (timeStr) => {
                                            if (!timeStr) return null;
                                            const [time, modifier] =
                                              timeStr.split(" ");
                                            let [hours, minutes] = time
                                              .split(":")
                                              .map(Number);

                                            if (modifier === "PM" && hours < 12)
                                              hours += 12;
                                            if (
                                              modifier === "AM" &&
                                              hours === 12
                                            )
                                              hours = 0;

                                            const date = new Date();
                                            date.setHours(hours, minutes, 0, 0);
                                            return date;
                                          };

                                          const inTime = parseTime(
                                            att.checkInTime
                                          );
                                          const outTime = parseTime(
                                            att.checkOutTime
                                          );

                                          if (!inTime || !outTime) return "";

                                          const diffMs = outTime - inTime;
                                          const totalHours = Math.floor(
                                            diffMs / (1000 * 60 * 60)
                                          );
                                          const totalMins = Math.floor(
                                            (diffMs % (1000 * 60 * 60)) /
                                              (1000 * 60)
                                          );

                                          // Calculate overtime (above 9 hours)
                                          let overtimeHours = totalHours - 9;
                                          let overtimeMins = totalMins;

                                          if (overtimeHours < 0) {
                                            overtimeHours = 0;
                                            overtimeMins = 0;
                                          }

                                          return `${overtimeHours}h ${overtimeMins}m`;
                                        })()
                                      : "--"}
                                  </td>

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
                                              value={status}
                                              checked={
                                                att.status?.toLowerCase() ===
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
                            })
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Data Avaiable
                              </td>
                            </tr>
                          )}
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
