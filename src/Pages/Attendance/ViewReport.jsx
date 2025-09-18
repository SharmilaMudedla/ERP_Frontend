import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getEmployee } from "../../Services/employeeService";
import { getAttendanceByEmployee } from "../../Services/attendenceService";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";
import Loader from "../../loader/Loader";

const ViewReport = () => {
  const [params] = useSearchParams();
  const [employee, setEmployee] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const empId = params.get("uid");
  const [loader, setLoader] = useState(false);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="main-content app-content pt-5 mt-5">
        <div className="container-fluid">
          {/* Date selection and attendance table */}
          <div className="row">
            <div className="col-xl-12">
              <div
                className="card custom-card"
                style={{ borderRadius: "20px" }}
              >
                {/* <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title m-0">View Attendance</h4>
              </div> */}

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
                          {employee?.firstName}
                          {employee?.lastName}
                        </h5>
                        <br></br>
                        <div className="row">
                          <div className="col-md-4">
                            {" "}
                            <span>Role</span>
                            <br></br>
                            <label htmlFor="">
                              <b>{employee?.designation}</b>
                            </label>
                          </div>
                          <div className="col-md-4">
                            {" "}
                            <span>Phone Number</span>
                            <br></br>
                            <label htmlFor="">
                              <b>{employee?.phone}</b>
                            </label>
                          </div>
                          <div className="col-md-4">
                            {" "}
                            <span>Email</span>
                            <br></br>
                            <label htmlFor="">
                              <b>{employee?.email}</b>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-12">
              <div
                className="card custom-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-4">
                      <h4 className="card-title m-0">Attendance History</h4>
                    </div>
                    <div className="col-md-4" style={{ textAlign: "right" }}>
                      <input
                        type="month"
                        name="month"
                        id="month"
                        className="form-control"
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className="col-md-4" style={{ textAlign: "right" }}>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="form-control"
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                  </div>
                </div>

                <form>
                  <div className="card-body">
                    <div className="row">
                      {attendance.length > 0 ? (
                        attendance.map((att, index) => {
                          const checkIn = att.checkInTime;
                          console.log(checkIn);
                          const cutoff = new Date(att.date);
                          cutoff.setHours(9, 30, 0, 0); // 9:30 AM cutoff

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
                                      <i className="ri-calendar-2-line fs-5"></i>
                                      <p className="m-0 fw-bold">
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
                                      <label
                                        className={`btn ${
                                          isOntime
                                            ? "btn-success"
                                            : "btn-danger"
                                        } px-3`}
                                        style={{ borderRadius: "20px" }}
                                      >
                                        {statusText}
                                      </label>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-md-6">
                                      <span>Check In</span>
                                      <br />
                                      <b>{att.checkInTime}</b>
                                    </div>
                                    <div className="col-md-6">
                                      <span>Check Out</span>
                                      <br />
                                      <b>{att.checkOutTime}</b>
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
