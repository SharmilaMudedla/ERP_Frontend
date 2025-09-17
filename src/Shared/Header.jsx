import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("SpondiasAuthToken");
    localStorage.removeItem("UserRole");
    navigate("/");
  };
  return (
    <>
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
              <input
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
              </a>
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
            <li className="header-element header-theme-mode">
              <span
                className="header-link layout-setting"
                onClick={() => setDark((prev) => !prev)}
              >
                <span className="light-layout">
                  {/* Moon Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21.5 14.078A8.557 8.557 0 0 1 9.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 0 0 9.627 9.627c4.558 0 8.376-3.168 9.373-7.422"
                    />
                  </svg>
                </span>
                <span className="dark-layout">
                  {/* Sun Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06"
                    />
                  </svg>
                </span>
              </span>
            </li>

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
                      <p className="mb-0 fw-semibold lh-1">Arjun Arora</p>
                      <span className="fs-11 text-muted">
                        arjunarora@mail.com
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
