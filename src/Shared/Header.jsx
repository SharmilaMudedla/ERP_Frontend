import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import ToasterAlert from "../toaster/ToasterAlert";
import { toast } from "sonner";
import { getUserProfileDetails } from "../Services/userService";
import { getEmployeeProfileDetails } from "../Services/employeeService";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const fetchUserDetails = async () => {
    setLoader(true);
    try {
      const response = await getUserProfileDetails();
      if (response?.success) {
        setProfile(response?.data || {});
      }
    } catch (error) {
      setProfile({});
      toast.error(error?.message || "Error fetching User");
      console.error("Error fetching user:", error);
    } finally {
      setLoader(false);
    }
  };

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
    const role = localStorage.getItem("UserRole");
    if (role === "employee") {
      fetchEmployeeDetails();
    } else {
      fetchUserDetails();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("SpondiasAuthToken");
    localStorage.removeItem("UserRole");
    navigate("/");
  };
  const role = localStorage.getItem("UserRole");
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      {/* Start::main-header */}
      <header className="app-header sticky" id="header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <a href="" className="header-logo">
                  <img
                    src="assets/images/brand-logos/Spondias-logo.png"
                    alt="logo"
                    className="desktop-logo"
                    style={{ height: "4.0rem" }}
                  />
                  {/* <img
              src="assets/images/brand-logos/toggle-dark.png"
              alt="logo"
              className="toggle-dark"
            /> */}
                  <img
                    src="assets/images/brand-logos/desktop-dark.png"
                    alt="logo"
                    className="desktop-dark"
                  />
                  <img
                    src="assets/images/brand-logos/Spondias-logo.png"
                    alt="logo"
                    className="toggle-logo"
                  />
                </a>
              </div>
            </div>
            {/* Start::header-element */}
            <div className="header-element mx-lg-0 mx-2 d-lg-none">
              {" "}
              {/* d-md-none hides on md+ screens */}
              <button
                className="btn header-link"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
                aria-label="Toggle sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-link-icon menu-btn"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 5h12M4 12h16M4 19h8"
                    color="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* End::header-element */}
          </div>

          <ul className="header-content-right">
            <li className="header-element dropdown">
              <a
                href="#"
                className="header-link dropdown-toggle"
                id="mainHeaderProfile"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={
                        localStorage.getItem("UserRole") === "employee"
                          ? profile?.image
                            ? `${import.meta.env.VITE_BASE_URL}/${
                                profile.image
                              }`
                            : "assets/images/profile/placeholder.png"
                          : "assets/images/faces/10.jpg"
                      }
                      alt="img"
                      className="avatar avatar-sm avatar-rounded"
                    />
                  </div>
                </div>
              </a>
              <ul
                className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                aria-labelledby="mainHeaderProfile"
              >
                <li className="p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-center text-center">
                    <div>
                      <p className="mb-0 fw-semibold lh-1">
                        {profile?.name ||
                          (profile?.firstName
                            ? `${profile?.firstName} ${profile?.lastName || ""}`
                            : "Name")}
                      </p>
                      <span className="fs-11 text-muted">
                        {profile?.email || "Email"}
                      </span>
                    </div>
                  </div>
                </li>

                {/* Conditionally render Profile link only for "employee" */}
                {role === "employee" && (
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/profile"
                    >
                      <i className="ri-user-line fs-15 me-2 text-gray fw-normal" />
                      Profile
                    </Link>
                  </li>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <i className="ri-logout-circle-line fs-15 me-2 text-gray fw-normal" />
                    Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
