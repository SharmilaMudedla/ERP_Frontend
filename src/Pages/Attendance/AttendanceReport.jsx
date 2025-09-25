import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../../Services/employeeService";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";

const AttendanceReport = () => {
  const [employee, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      console.log("response", response);
      if (response?.success) {
        setEmployees(response?.data || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error(error?.message || "Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  });
  return (
    <>
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                Manage Attendance Report
              </h1>
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

          {/* Employee Table */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Employee ID</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee?.length > 0 ? (
                          employee.map((employee, index) => (
                            <tr key={employee._id}>
                              <td>{index + 1}</td>
                              <td>
                                <b>{employee.employeeId}</b>
                              </td>
                              <td>
                                {employee.firstName} {employee.lastName}
                              </td>
                              <td>{employee.email}</td>
                              <td>{employee.status}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Link
                                    to={`/view-report/?uid=${employee._id}`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    <i class="bi bi-eye"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">
                              No employees found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceReport;
