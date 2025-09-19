import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getEmployee } from "../../Services/employeeService";
import {
  getAttendanceByEmployee,
  getAttendanceByDateAndEmployee,
  getAttendanceByMonthAndEmployee,
} from "../../Services/attendenceService";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import parseTimeToDate from "../../Utils/changeTime";

const ViewReport = () => {
  const [params] = useSearchParams();
  const [employee, setEmployee] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const empId = params.get("uid");
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchEmployees = async () => {
    const id = empId || "";
    setLoader(true);
    try {
      const response = await getEmployee(id);
      if (response?.success) {
        setEmployee(response?.data || []);
      }
      const employeeId = response.data.employeeId || "";
      const attendanceResponse = await getAttendanceByEmployee(employeeId);
      const totalDays = attendanceResponse?.data?.filter(
        (item) => item.status === "Present"
      ).length;
      const absentDays = attendanceResponse?.data?.filter(
        (item) => item.status === "Leave"
      ).length;
      setAbsentDays(absentDays);
      setTotalDays(totalDays);

      if (attendanceResponse?.success) {
        setAttendance(attendanceResponse?.data || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error(error?.message || "Error fetching employees");
    } finally {
      setLoader(false);
    }
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const employeeId = employee.employeeId || "";
    setLoader(true);
    try {
      const response = await getAttendanceByDateAndEmployee(date, employeeId);
      if (response?.success) {
        toast.success(response?.message || "Attendance fetched successfully");
        setAttendance(response?.data || []);
        setCurrentPage(1);
      } else {
        setAttendance([]);
        toast.error("No attendance found for this date");
      }
    } catch (error) {
      console.error("Error fetching attendance by date:", error);
      toast.error(error?.message || "Error fetching attendance");
    } finally {
      setLoader(false);
    }
  };

  const handleMonthChange = async (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    const employeeId = employee.employeeId || "";
    setLoader(true);
    try {
      const response = await getAttendanceByMonthAndEmployee(month, employeeId);
      if (response?.success) {
        toast.success(response?.message || "Attendance fetched successfully");
        setAttendance(response?.data || []);
        setCurrentPage(1);
      } else {
        setAttendance([]);
        toast.error("No attendance found for this month");
      }
    } catch (error) {
      console.error("Error fetching attendance by month:", error);
      toast.error(error?.message || "Error fetching attendance");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendance.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendance.length / itemsPerPage);

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content pt-5 mt-5">
        <div className="container-fluid">
          <div className="row">
            {/* Employee Card */}
            <div className="col-xl-12">
              <div
                className="card custom-card"
                style={{ borderRadius: "20px" }}
              >
                <form>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <img
                          src={`http://localhost:4000/${employee.image}`}
                          alt="employee"
                          className="rounded-circle border"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5>
                          {employee?.firstName} {employee?.lastName}
                          <br />
                          <span>
                            <b>{employee?.employeeId}</b>
                          </span>
                        </h5>
                        <br />
                        <div className="row">
                          <div className="col-md-4">
                            <span>Role</span>
                            <br />
                            <label>
                              <b>{employee?.designation}</b>
                            </label>
                          </div>
                          <div className="col-md-4">
                            <span>Phone Number</span>
                            <br />
                            <label>
                              <b>{employee?.phone}</b>
                            </label>
                          </div>
                          <div className="col-md-4">
                            <span>Email</span>
                            <br />
                            <label>
                              <b>{employee?.email}</b>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <div className="card" style={{ borderRadius: "15px" }}>
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div
                                className="col-md-5 rounded-circle border d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              >
                                <i
                                  className="ri-login-circle-line"
                                  style={{ fontSize: "28px" }} // increase icon size
                                ></i>
                              </div>
                              <div className="col-md-7">
                                <h5>{totalDays}</h5>
                                <label>Total Attendance</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card" style={{ borderRadius: "15px" }}>
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div
                                className="col-md-5 rounded-circle border d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              >
                                <i
                                  className="ri-logout-circle-line"
                                  style={{ fontSize: "28px" }}
                                ></i>
                              </div>
                              <div className="col-md-7">
                                <h5>{absentDays}</h5>
                                <label>Total Leaves</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Attendance Cards */}
            <div className="col-xl-12">
              <div
                className="card custom-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4
                    className="card-title m-0"
                    style={{ position: "relative", paddingLeft: "20px" }}
                  >
                    Attendance History
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "100%",
                        background:
                          "linear-gradient(180deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 35%, rgba(2,0,36,1) 100%)",
                        borderRadius: "999px",
                      }}
                    ></span>
                  </h4>
                  <div className="d-flex gap-2">
                    <input
                      type="month"
                      name="month"
                      id="month"
                      value={selectedMonth || ""}
                      onChange={handleMonthChange}
                      className="form-control"
                      style={{ borderRadius: "20px" }}
                    />
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="form-control"
                      value={selectedDate || ""}
                      onChange={handleDateChange}
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                </div>

                <form>
                  <div className="card-body">
                    <div className="row">
                      {currentItems.length > 0 ? (
                        currentItems.map((att, index) => {
                          const dateStr = att.date;
                          const checkInStr = att.checkInTime;
                          const checkIn = parseTimeToDate(dateStr, checkInStr);
                          const cutoff = new Date(dateStr);
                          cutoff.setHours(9, 30, 0, 0);
                          const isOntime = checkIn <= cutoff;
                          const statusText = isOntime ? "Ontime" : "Late";

                          return (
                            <div key={index} className="col-md-4">
                              <div
                                className="card"
                                style={{ borderRadius: "20px" }}
                              >
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-6 d-flex align-items-center gap-2">
                                      <i className="ri-time-line fs-5"></i>
                                      <p
                                        className="m-0 fw-bold"
                                        style={{
                                          position: "absolute",
                                          left: "40px",
                                        }}
                                      >
                                        {new Date(att.date).toLocaleDateString(
                                          "en-US",
                                          {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                          }
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-md-6 text-end">
                                      <span
                                        className="btn btn-sm"
                                        style={{
                                          borderRadius: "20px",
                                          backgroundColor: isOntime
                                            ? "rgba(0, 255, 0, 0.2)"
                                            : "rgba(255, 0, 0, 0.2)",
                                          color: "black",
                                          border: "1px solid transparent",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {statusText}
                                      </span>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-md-6">
                                      <span>Check In</span>
                                      <br />
                                      <b>{att.checkInTime || "-"}</b>
                                    </div>
                                    <div className="col-md-6">
                                      <span>Check Out</span>
                                      <br />
                                      <b>{att.checkOutTime || "-"}</b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>No attendance records found.</p>
                      )}
                    </div>

                    {attendance.length > itemsPerPage && (
                      <div className="d-flex justify-content-center mt-3">
                        <nav>
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <button
                                type="button"
                                className="page-link"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                  )
                                }
                              >
                                Prev
                              </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                              <li
                                key={i}
                                className={`page-item ${
                                  currentPage === i + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </button>
                              </li>
                            ))}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <button
                                type="button"
                                className="page-link"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                  )
                                }
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
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

export default ViewReport;
