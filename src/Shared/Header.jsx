import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import ToasterAlert from "../toaster/ToasterAlert";
import { toast } from "sonner";
import { getUserProfileDetails } from "../Services/userService";

const Header = () => {
  const [loader, setLoader] = useState(false);
  const [employees, setEmployees] = useState({});
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
  const fetchEmployeeDetails = async () => {
    setLoader(true);
    try {
      const response = await getUserProfileDetails();
      if (response?.success) {
        const employeeData = response?.data || {};
        setEmployees(employeeData);
      }
      console.log("response", response);
    } catch (error) {
      setEmployees([]);
      toast.error(error?.message || "Error fetching employees");
      console.error("Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("SpondiasAuthToken");
    localStorage.removeItem("UserRole");
    navigate("/");
  };
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      {/* Start::main-header */}
      <header className="app-header sticky" id="header">
        {/* Start::main-header-container */}
        <div className="main-header-container container-fluid">
          {/* Start::header-content-left */}
          <div className="header-content-left">
            {/* Start::header-element */}
            <div className="header-element">
              <div className="horizontal-logo">
                <a href="index.html" className="header-logo">
                  <img
                    src="assets/images/brand-logos/desktop-logo.png"
                    alt="logo"
                    className="desktop-logo"
                  />
                  <img
                    src="assets/images/brand-logos/toggle-logo.png"
                    alt="logo"
                    className="toggle-logo"
                  />
                  <img
                    src="assets/images/brand-logos/desktop-dark.png"
                    alt="logo"
                    className="desktop-dark"
                  />
                  <img
                    src="assets/images/brand-logos/toggle-dark.png"
                    alt="logo"
                    className="toggle-dark"
                  />
                </a>
              </div>
            </div>
            {/* End::header-element */}

            {/* Start::header-element */}
            <div className="header-element header-search d-md-block d-none my-auto">
              {/* Start::header-link */}
              {/* <input
                type="text"
                className="header-search-bar form-control search-sidebar bg-light-transparent"
                id="header-search"
                placeholder="Search for Results..."
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
              />
              <a href="#" className="header-search-icon border-0 ">
                <i className="bi bi-search" />
              </a> */}
              {/* End::header-link */}
            </div>
            {/* End::header-element */}
          </div>
          {/* End::header-content-left */}
          {/* Start::header-content-right */}
          <ul className="header-content-right">
            {/* Start::header-element */}
            <li className="header-element d-md-none d-block">
              <a
                href="#"
                className="header-link"
                data-bs-toggle="modal"
                data-bs-target="#header-responsive-search"
              >
                {/* Start::header-link-icon */}
                <i className="bi bi-search header-link-icon" />
                {/* End::header-link-icon */}
              </a>
            </li>
            {/* Start::header-element */}

            {/* End::header-element */}

            {/* End::header-element */}
            <li className="header-element dropdown">
              {/* Start::header-link|dropdown-toggle */}
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
                      src="assets/images/faces/10.jpg"
                      alt="img"
                      className="avatar avatar-sm avatar-rounded"
                    />
                  </div>
                </div>
              </a>
              {/* End::header-link|dropdown-toggle */}
              <ul
                className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                aria-labelledby="mainHeaderProfile"
              >
                <li className="p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-center text-center">
                    <div>
                      <p className="mb-0 fw-semibold lh-1">
                        {" "}
                        {employees?.name || "Name"}
                      </p>
                      <span className="fs-11 text-muted">
                        {employees?.email || "Email"}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="profile.html"
                  >
                    <i className="ri-user-line fs-15 me-2 text-gray fw-normal" />
                    Profile
                  </a>
                </li>
                <li>
                  {" "}
                  <hr className="dropdown-divider" />{" "}
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
            {/* End::header-element */}
          </ul>
          {/* End::header-content-right */}
        </div>
        {/* End::main-header-container */}
      </header>
      {/* End::main-header */}
    </>
  );
};

export default Header;
