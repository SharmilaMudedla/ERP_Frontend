import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEmployee } from "../../Services/employeeService";
import { getAttendanceByEmployee } from "../../Services/attendenceService";
import ToasterAlert from "../../toaster/ToasterAlert";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import { getEmployeeProfileDetails } from "../../Services/employeeService";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loader, setLoader] = useState(false);

  // Fetch employee profile:

  const fetchEmployeeDetails = async () => {
    setLoader(true);
    try {
      const response = await getEmployeeProfileDetails();
      if (response?.success) {
        setProfile(response?.data || {});
      }
    } catch (error) {
      setProfile({});
      toast.error(error?.message || "Error fetching Employee");
      console.error("Error fetching employee:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content pt-5 mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="card custom-card"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${
                          profile.image
                        }`}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="rounded-circle border"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <h5 className="mt-3">
                        {profile?.firstName} {profile?.lastName}
                      </h5>
                      <span className="text-muted">
                        <b>{profile?.employeeId}</b>
                      </span>
                    </div>
                    <div className="col-md-8">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <span className="text-muted">Role</span>
                          <h6>{profile?.designation}</h6>
                        </div>
                        <div className="col-md-6">
                          <span className="text-muted">Email</span>
                          <h6>{profile?.email}</h6>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <span className="text-muted">Phone</span>
                          <h6>{profile?.phone}</h6>
                        </div>
                      </div>
                    </div>
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

export default Profile;
