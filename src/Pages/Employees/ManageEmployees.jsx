import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  getEmployees,
  changeEmployeeStatus,
} from "../../Services/employeeService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeEmployeeStatus(id);
      console.log("response", response);

      if (response?.success) {
        toast.success(
          response?.message || "Employee Status Changed successfully"
        );
        fetchEmployees();
      }
    } catch (error) {
      toast.error(error?.message || "Error in Changing status");
      console.error("Error in Changing Status:", error);
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
      <ToasterAlert />

      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                Manage Employee
              </h1>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Employee
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <Link to={"/add-employee"}>
                <button className="btn btn-primary btn-wave">
                  Add New Employee
                </button>
              </Link>
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
                          <th>Full Name</th>
                          <th>Gender</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees?.length > 0 ? (
                          employees.map((employee, index) => (
                            <tr key={employee._id}>
                              <td>{index + 1}</td>
                              <td>
                                {employee.firstName} {employee.lastName}
                              </td>
                              <td>{employee.gender || "-"}</td>
                              <td>{employee.email}</td>
                              <td>{employee.phone}</td>
                              <td>{employee.status}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <button
                                    className="btn btn-lg btn-link"
                                    data-bs-toggle="modal"
                                    data-bs-target="#employeeDetailsModal"
                                    onClick={() =>
                                      setSelectedEmployee(employee)
                                    }
                                  >
                                    <i className="bi bi-eye"></i>
                                  </button>

                                  {/* ✏ Edit */}
                                  <Link
                                    to={`/add-employee/?uid=${employee._id}`}
                                    className="mx-2"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </Link>

                                  {/* Toggle Status */}
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={employee.isActive}
                                      onChange={() =>
                                        handleChangeStatus(employee._id)
                                      }
                                      disabled={loader}
                                    />
                                  </div>
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

      {/* Employee Details Modal */}
      <div
        className="modal fade"
        id="employeeDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Employee Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedEmployee ? (
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <p>
                      <b>Full Name:</b> {selectedEmployee.firstName}{" "}
                      {selectedEmployee.lastName}
                    </p>
                    <p>
                      <b>Gender:</b> {selectedEmployee.gender}
                    </p>
                    <p>
                      <b>Email:</b> {selectedEmployee.email}
                    </p>
                    <p>
                      <b>Phone:</b> {selectedEmployee.phone}
                    </p>
                    <p>
                      <b>Address:</b> {selectedEmployee.address || "-"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <b>Department:</b>{" "}
                      {selectedEmployee?.departmentId?.name || "-"}
                    </p>
                    <p>
                      <b>Joining Date:</b> {selectedEmployee.joiningDate}
                    </p>
                    <p>
                      <b>Employee Type:</b> {selectedEmployee.employeeType}
                    </p>
                    <p>
                      <b>Salary Structure:</b>{" "}
                      {selectedEmployee.salaryStructure}
                    </p>

                    <p>
                      <b>Status:</b> {selectedEmployee.status}
                    </p>
                    <p>
                      <b>Image</b>
                      {selectedEmployee.image ? (
                        <img
                          src={`http://localhost:4000/${selectedEmployee.image}`}
                          alt="Employee Image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No employee selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEmployees;
