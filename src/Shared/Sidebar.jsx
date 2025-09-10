import React from "react";

const Sidebar = () => {
  return (
    <aside className="app-sidebar sticky" id="sidebar">
      {/* Sidebar Header */}
      <div className="main-sidebar-header">
        <a href="index.html" className="header-logo">
          <img
            src="assets/images/brand-logos/desktop-logo.png"
            alt="logo"
            className="desktop-logo"
          />
          <img
            src="assets/images/brand-logos/toggle-dark.png"
            alt="logo"
            className="toggle-dark"
          />
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
            <li className="nav-item dropdown slide">
              <a
                href="#"
                className="nav-link dropdown-toggle side-menu__item d-flex justify-content-between align-items-center"
                id="dashboardDropdown"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="side-menu__icon me-2"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="m9 22l-.251-3.509a3.259 3.259 0 1 1 6.501 0L15 22" />
                    <path d="M2.352 13.214c-.354-2.298-.53-3.446-.096-4.465s1.398-1.715 3.325-3.108L7.021 4.6C9.418 2.867 10.617 2 12.001 2c1.382 0 2.58.867 4.978 2.6l1.44 1.041c1.927 1.393 2.89 2.09 3.325 3.108c.434 1.019.258 2.167-.095 4.464l-.301 1.96c-.5 3.256-.751 4.884-1.919 5.856S16.554 22 13.14 22h-2.28c-3.415 0-5.122 0-6.29-.971c-1.168-.972-1.418-2.6-1.918-5.857z" />
                  </svg>
                  <span className="side-menu__label">Dashboard</span>
                </span>
                <i className="ri-arrow-down-s-line side-menu__angle"></i>
              </a>

              <ul
                className="dropdown-menu slide-menu child1"
                aria-labelledby="dashboardDropdown"
                data-bs-parent="#sidebarMenu"
              >
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index.html"
                  >
                    Sales
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index2.html"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index3.html"
                  >
                    Ecommerce
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index4.html"
                  >
                    CRM
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index5.html"
                  >
                    Crypto
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="index11.html"
                  >
                    Stocks
                  </a>
                </li>
              </ul>
            </li>

            {/* Pages Dropdown */}
            <li className="slide__category">
              <span className="category-name">Pages</span>
            </li>

            <li className="nav-item dropdown slide">
              <a
                href="#"
                className="nav-link dropdown-toggle side-menu__item d-flex justify-content-between align-items-center"
                id="pagesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
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
                      <path d="M19.543 10.5L22 11c-.503-5.053-4.777-9-9.975-9C6.488 2 2 6.477 2 12s4.488 10 10.025 10c4.11 0 7.643-2.468 9.19-6" />
                      <path d="M10.337 10.88c-1.08 0-1.62.78-1.74 1.26s-.12 2.22-.048 2.94c.24.9.84 1.272 1.428 1.392c.54.048 2.82.03 3.48.03c.96.018 1.68-.342 1.98-1.422c.06-.36.12-2.34-.03-2.94c-.318-.96-1.11-1.26-1.71-1.26zm-.087-.421c0-.06.008-.406.01-.84c0-.398-.034-.78.156-1.13c.71-1.414 2.75-1.27 3.254.17c.087.237.092.612.09.96c-.003.443.006.84.006.84" />
                    </g>
                  </svg>
                  <span className="side-menu__label">Authentication</span>
                </span>
                <i className="ri-arrow-down-s-line side-menu__angle"></i>
              </a>

              <ul
                className="dropdown-menu slide-menu child1"
                aria-labelledby="pagesDropdown"
                data-bs-parent="#sidebarMenu"
              >
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="login.html"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="register.html"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item side-menu__item"
                    href="forgot.html"
                  >
                    Forgot Password
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Remove Bootstrap default caret */
        .dropdown-toggle::after {
          display: none !important;
        }

        /* Remove focus outlines */
        .dropdown-toggle:focus,
        .dropdown-item:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Sidebar dropdown animation */
        .dropdown-menu {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
