import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  getDepartments,
  changeDepartmentStatus,
} from "../../Services/departmentService";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchdepartments = async () => {
    setLoader(true);
    try {
      const response = await getDepartments();
      if (response?.success) {
        setDepartments(response?.data || []);
      }
      console.log("response", response);
    } catch (error) {
      setDepartments([]);
      toast.error(error?.message || "Error fetching departments");
      console.error(" Error fetching departments:", error);
    } finally {
      setLoader(false);
    }
  };
  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeDepartmentStatus(id);
      console.log("response", response);

      if (response?.success) {
        toast.success(
          response?.message || "Department Status Changed successfully"
        );
        fetchdepartments();
      }
    } catch (error) {
      toast.error(error?.message || "Error in ChangingS tatus");
      console.error("Error in Changing Status:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchdepartments();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div class="main-content app-content">
        <div class="container-fluid">
          {/* Page Header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">
                Manage departments
              </h1>
              <div className>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Departments
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div class="d-flex gap-2">
                <div class="position-relative">
                  <Link to={"/add-department"}>
                    {" "}
                    <button
                      class="btn btn-primary btn-wave"
                      type="button"
                      id="dropdownMenuClickableInside"
                    >
                      Add New Department
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Page Header Close */}

          {/* Start:: row-1 */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  {/* <div className="card-title">Basic Tables</div> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th scope="col">Department Name</th>
                          <th scope="col">Description</th>
                          <th scope="col">Manager Id</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments?.length > 0 ? (
                          departments.map((department, index) => (
                            <tr key={department._id}>
                              <td>{index + 1}</td>
                              <td>{department.name}</td>
                              <td>{department.description || "-"}</td>
                              <td>{department.managerId}</td>

                              <td>
                                <div className="d-flex gap-2 align-items-center">
                                  {/* <i class="bi bi-eye"></i> */}
                                  <Link
                                    to={`/add-department/?uid=${department._id}`}
                                    className="btn btn-soft-primary btn-sm"
                                  >
                                    <i class="bi bi-pencil-square"></i>
                                  </Link>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={department.isActive}
                                      onChange={() =>
                                        handleChangeStatus(
                                          department._id,
                                          department.isActive
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No departments found
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
          {/* End:: row-1 */}
        </div>
      </div>
    </>
  );
};

export default ManageDepartment;
