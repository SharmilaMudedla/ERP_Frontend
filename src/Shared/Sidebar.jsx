import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    roles: false,
    user: false,
  });

  const toggleMenu = (key, e) => {
    e.preventDefault();

    setOpenMenus((prev) => {
      const newState = {};

      Object.keys(prev).forEach((menuKey) => {
        newState[menuKey] = menuKey === key ? !prev[menuKey] : false;
      });

      return newState;
    });
  };

  return (
    <>
      <aside className="app-sidebar sticky" id="sidebar">
        {/* Sidebar Header */}
        <div className="main-sidebar-header">
          <a href="index.html" className="header-logo">
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
              src="assets/images/brand-logos/toggle-logo.png"
              alt="logo"
              className="toggle-logo"
            />
          </a>
        </div>

        {/* Sidebar Menu */}
        <div className="main-sidebar" id="sidebar-scroll">
          <nav className="main-menu-container nav nav-pills flex-column">
            <ul className="main-menu" id="sidebarMenu">
              {/* Category */}
              <li className="slide__category">
                <span className="category-name">Main</span>
              </li>

              {/* Dashboard Dropdown */}
              <li
                className={`slide has-sub ${openMenus.dashboard ? "open" : ""}`}
              >
                <Link
                  to="/dashboard"
                  className="side-menu__item"
                  // onClick={(e) => toggleMenu("dashboard", e)}
                  aria-expanded={openMenus.dashboard}
                  aria-controls="dashboard-menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="side-menu__icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="m9 22l-.251-3.509a3.259 3.259 0 1 1 6.501 0L15 22"></path>
                      <path d="M2.352 13.214c-.354-2.298-.53-3.446-.096-4.465s1.398-1.715 3.325-3.108L7.021 4.6C9.418 2.867 10.617 2 12.001 2c1.382 0 2.58.867 4.978 2.6l1.44 1.041c1.927 1.393 2.89 2.09 3.325 3.108c.434 1.019.258 2.167-.095 4.464l-.301 1.96c-.5 3.256-.751 4.884-1.919 5.856S16.554 22 13.14 22h-2.28c-3.415 0-5.122 0-6.29-.971c-1.168-.972-1.418-2.6-1.918-5.857z"></path>
                    </g>
                  </svg>
                  <span className="side-menu__label">Dashboard</span>
                  <i className="ri-arrow-down-s-line side-menu__angle"></i>
                </Link>
              </li>
              {/* Role Dropdown */}
              <li className={`slide has-sub ${openMenus.roles ? "open" : ""}`}>
                <a
                  href="#dashboard"
                  className="side-menu__item"
                  onClick={(e) => toggleMenu("roles", e)}
                  aria-expanded={openMenus.roles}
                  aria-controls="dashboard-menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="side-menu__icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12M11 7h6M7 7h1m-1 5h1m-1 5h1m3-5h6m-6 5h6"
                      color="currentColor"
                    ></path>
                  </svg>
                  <span className="side-menu__label">Manage Roles</span>
                  <i className="ri-arrow-down-s-line side-menu__angle"></i>
                </a>

                <ul
                  id="dashboard-menu"
                  className="slide-menu child1"
                  style={{
                    display: openMenus.roles ? "block" : "none",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px",
                    transform: "translate(5px, 703px)",
                    boxSizing: "border-box",
                  }}
                >
                  <li className="slide side-menu__label1">
                    <a>Role</a>
                  </li>
                  <li className="slide ">
                    <Link
                      className="dropdown-item side-menu__item"
                      to="/add-role"
                    >
                      Add Role
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Users Dropdown */}
              <li className={`slide has-sub ${openMenus.user ? "open" : ""}`}>
                <a
                  href="#dashboard"
                  className="side-menu__item"
                  onClick={(e) => toggleMenu("user", e)}
                  aria-expanded={openMenus.user}
                  aria-controls="dashboard-menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="side-menu__icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path d="M4.5 14.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0"></path>
                      <path d="M9 14.5c0-1.657 1.295-3 2.893-3h.214c1.598 0 2.893 1.343 2.893 3s-1.295 3-2.893 3h-.214C10.295 17.5 9 16.157 9 14.5M13.56 2l-2.561 5m7-5l-2.821 5.602M10.44 2L12 4.594M6 2l2.821 5.5"></path>
                    </g>
                  </svg>
                  <span className="side-menu__label">Manage Users</span>
                  <i className="ri-arrow-down-s-line side-menu__angle"></i>
                </a>

                <ul
                  id="dashboard-menu"
                  className="slide-menu child1"
                  style={{
                    display: openMenus.user ? "block" : "none",
                    position: "relative",
                    left: "0px",
                    top: "0px",
                    margin: "0px",
                    transform: "translate(5px, 703px)",
                    boxSizing: "border-box",
                  }}
                >
                  <li className="slide side-menu__label1">
                    <a>Users</a>
                  </li>
                  <li className="slide ">
                    <Link
                      className="dropdown-item side-menu__item"
                      to="/add-user"
                    >
                      Add User
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
