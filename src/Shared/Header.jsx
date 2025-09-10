import React from "react";

const Header = () => {
  return (
    <>
      <div className="page">
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
              <div className="header-element mx-lg-0 mx-2">
                <a
                  aria-label="Hide Sidebar"
                  className="sidemenu-toggle header-link"
                  data-bs-toggle="sidebar"
                  href="javascript:void(0);"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon menu-btn-close"
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
                      d="m18 6l-6 6m0 0l-6 6m6-6l6 6m-6-6L6 6"
                      color="currentColor"
                    />
                  </svg>
                </a>
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
                <a
                  href="javascript:void(0);"
                  className="header-search-icon border-0 "
                >
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
                  href="javascript:void(0);"
                  className="header-link"
                  data-bs-toggle="modal"
                  data-bs-target="#header-responsive-search"
                >
                  {/* Start::header-link-icon */}
                  <i className="bi bi-search header-link-icon" />
                  {/* End::header-link-icon */}
                </a>
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element country-selector dropdown">
                {/* Start::header-link|dropdown-toggle */}
                <a
                  href="javascript:void(0);"
                  className="header-link dropdown-toggle"
                  data-bs-auto-close="outside"
                  data-bs-toggle="dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
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
                      <path d="M7 8.38h4.5m5.5 0h-2.5m-3 0h3m-3 0V7m3 1.38c-.527 1.886-1.632 3.669-2.893 5.236M8.393 17c1.019-.937 2.17-2.087 3.214-3.384m0 0c-.643-.754-1.543-1.973-1.8-2.525m1.8 2.525l1.929 2.005" />
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                    </g>
                  </svg>
                </a>
                {/* End::header-link|dropdown-toggle */}
                <ul
                  className="main-header-dropdown dropdown-menu dropdown-menu-end"
                  data-popper-placement="none"
                >
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img src="assets/images/flags/us_flag.jpg" alt="img" />
                      </span>
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/spain_flag.jpg"
                          alt="img"
                        />
                      </span>
                      español
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/french_flag.jpg"
                          alt="img"
                        />
                      </span>
                      français
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img src="assets/images/flags/uae_flag.jpg" alt="img" />
                      </span>
                      عربي
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/germany_flag.jpg"
                          alt="img"
                        />
                      </span>
                      Deutsch
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/china_flag.jpg"
                          alt="img"
                        />
                      </span>
                      中国人
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/italy_flag.jpg"
                          alt="img"
                        />
                      </span>
                      Italiano
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                        <img
                          src="assets/images/flags/russia_flag.jpg"
                          alt="img"
                        />
                      </span>
                      Русский
                    </a>
                  </li>
                </ul>
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element header-theme-mode">
                {/* Start::header-link|layout-setting */}
                <a
                  href="javascript:void(0);"
                  className="header-link layout-setting"
                >
                  <span className="light-layout">
                    {/* Start::header-link-icon */}
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
                        color="currentColor"
                      />
                    </svg>
                    {/* End::header-link-icon */}
                  </span>
                  <span className="dark-layout">
                    {/* Start::header-link-icon */}
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
                        color="currentColor"
                      />
                    </svg>
                    {/* End::header-link-icon */}
                  </span>
                </a>
                {/* End::header-link|layout-setting */}
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element cart-dropdown dropdown">
                {/* Start::header-link|dropdown-toggle */}
                <a
                  href="javascript:void(0);"
                  className="header-link dropdown-toggle"
                  data-bs-auto-close="outside"
                  data-bs-toggle="dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
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
                      <path d="M8 16h7.263c4.488 0 5.17-2.82 5.998-6.93c.239-1.187.358-1.78.071-2.175s-.837-.395-1.938-.395H6" />
                      <path d="M8 16L5.379 3.515A2 2 0 0 0 3.439 2H2.5m6.38 14h-.411C7.105 16 6 17.151 6 18.571a.42.42 0 0 0 .411.429H17.5" />
                      <circle cx="10.5" cy="20.5" r="1.5" />
                      <circle cx="17.5" cy="20.5" r="1.5" />
                    </g>
                  </svg>
                  <span
                    className="badge bg-primary rounded-pill header-icon-badge"
                    id="cart-icon-badge"
                  >
                    6
                  </span>
                </a>
                {/* End::header-link|dropdown-toggle */}
                {/* Start::main-header-dropdown */}
                <div
                  className="main-header-dropdown dropdown-menu dropdown-menu-end"
                  data-popper-placement="none"
                >
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-16">Cart Items</p>
                      <span
                        className="badge bg-secondary fs-12 rounded-pill"
                        id="cart-data"
                      >
                        6 Items
                      </span>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <ul
                    className="list-unstyled mb-0"
                    id="header-cart-items-scroll"
                  >
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/1.jpg"
                              alt="Wireless Headphones"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">Wireless Headphones</a>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Black
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$120</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/2.jpg"
                              alt="Smartwatch"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">Smart Fitness Watch</a>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Silver
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$199</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/5.jpg"
                              alt="Gaming Laptop"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">Modern Laptop</a>
                              <span className="fs-9 ms-1 fw-medium text-success">
                                <i className="ri-discount-percent-line fs-13" />{" "}
                                20off
                              </span>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Black
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$1500</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/7.jpg"
                              alt="Bluetooth Speaker"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">Portable Bluetooth Speaker</a>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Blue
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$85</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/8.jpg"
                              alt="Fitness Tracker"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">Fitness Tracker</a>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Pink
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$45</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center cart-dropdown-item gap-3">
                        <div className="lh-1">
                          <span className="avatar avatar-md bg-gray-300">
                            <img
                              src="assets/images/ecommerce/jpg/3.jpg"
                              alt="DSLR Camera"
                            />
                          </span>
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex align-items-center justify-content-between mb-0">
                            <div className="mb-0 fs-13 fw-medium">
                              <a href="cart.html">DSLR Camera</a>
                              <div className="fs-11 mt-1 d-flex gap-2 flex-wrap">
                                <div className="text-default">
                                  <span className="text-primary">Qty :</span> 1
                                </div>
                                <div className="text-default">
                                  <span className="text-muted op-5">|</span>
                                </div>
                                <div className="text-default">
                                  <span className="text-secondary">
                                    Color :
                                  </span>{" "}
                                  Black
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                href="javascript:void(0);"
                                className="text-pink pe-2"
                              >
                                <i className="ri-heart-line" />
                              </a>
                              <a
                                href="javascript:void(0);"
                                className="header-cart-remove dropdown-item-close"
                              >
                                <i className="ri-delete-bin-line" />
                              </a>
                              <h6 className="fw-semibold mb-0 mt-2">$799</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="p-3 empty-header-item border-top">
                    <div className="text-center d-grid">
                      <a
                        href="checkout.html"
                        className="btn btn-primary btn-wave"
                      >
                        Proceed to checkout
                      </a>
                    </div>
                  </div>
                  <div className="p-5 empty-item d-none">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-primary-transparent">
                        <i className="ri-shopping-cart-2-line fs-2" />
                      </span>
                      <h6 className="fw-medium mb-1 mt-3">
                        Your Cart is Empty
                      </h6>
                      <span className="mb-3 fw-normal fs-13 d-block">
                        Add some items to make it happy :)
                      </span>
                    </div>
                  </div>
                </div>
                {/* End::main-header-dropdown */}
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element notifications-dropdown d-xl-block d-none dropdown">
                {/* Start::header-link|dropdown-toggle */}
                <a
                  href="javascript:void(0);"
                  className="header-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  id="messageDropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
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
                      <path d="M2.53 14.77c-.213 1.394.738 2.361 1.902 2.843c4.463 1.85 10.673 1.85 15.136 0c1.164-.482 2.115-1.45 1.902-2.843c-.13-.857-.777-1.57-1.256-2.267c-.627-.924-.689-1.931-.69-3.003C19.525 5.358 16.157 2 12 2S4.475 5.358 4.475 9.5c0 1.072-.062 2.08-.69 3.003c-.478.697-1.124 1.41-1.255 2.267" />
                      <path d="M8 19c.458 1.725 2.076 3 4 3c1.925 0 3.541-1.275 4-3" />
                    </g>
                  </svg>
                  <span className="header-icon-pulse bg-pink rounded pulse pulse-pink" />
                </a>
                {/* End::header-link|dropdown-toggle */}
                {/* Start::main-header-dropdown */}
                <div
                  className="main-header-dropdown dropdown-menu dropdown-menu-end"
                  data-popper-placement="none"
                >
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0 fs-16">Notifications</p>
                      <span
                        className="badge bg-secondary-transparent"
                        id="notifiation-data"
                      >
                        5 Unread
                      </span>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <ul
                    className="list-unstyled mb-0"
                    id="header-notification-scroll"
                  >
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-md flex-shrink-0">
                          <img src="assets/images/faces/14.jpg" alt="img" />
                          <a
                            href="javascript:void(0);"
                            className="badge rounded-pill bg-warning avatar-badge"
                          >
                            <i className="fe fe-plus" />
                          </a>
                        </span>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="fs-13">
                            <div className="text-muted">
                              <a
                                href="javascript:void(0);"
                                className="fw-medium"
                              >
                                Purni{" "}
                              </a>
                              commented on your{" "}
                              <span className="fw-medium text-default">
                                post
                              </span>
                            </div>
                            <div className="text-muted fw-normal fs-12">
                              2mins ago
                            </div>
                          </div>
                          <div>
                            <a
                              href="javascript:void(0);"
                              className="min-w-fit-content text-muted dropdown-item-close1"
                            >
                              <i className="ri-delete-bin-2-line fs-16" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-md flex-shrink-0 bg-success-transparent">
                          <i className="ri-shopping-cart-line fs-18 lh-1 align-middle" />
                          <a
                            href="javascript:void(0);"
                            className="badge rounded-pill bg-pink avatar-badge"
                          >
                            <i className="fe fe-box" />
                          </a>
                        </span>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="fs-13">
                            <div className="text-muted">
                              Updated the{" "}
                              <a
                                href="javascript:void(0);"
                                className="fw-medium text-default"
                              >
                                order details
                              </a>{" "}
                              for your purchase.
                            </div>
                            <div className="text-muted fw-normal fs-12">
                              5 mins ago
                            </div>
                          </div>
                          <div>
                            <a
                              href="javascript:void(0);"
                              className="min-w-fit-content text-muted dropdown-item-close1"
                            >
                              <i className="ri-delete-bin-2-line fs-16" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-md flex-shrink-0">
                          <img src="assets/images/faces/2.jpg" alt="img" />
                          <a
                            href="javascript:void(0);"
                            className="badge rounded-pill bg-primary avatar-badge"
                          >
                            <i className="fe fe-user-plus" />
                          </a>
                        </span>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="fs-13">
                            <div className="text-muted">
                              <a
                                href="javascript:void(0);"
                                className="fw-medium"
                              >
                                Priya Sharma
                              </a>{" "}
                              sent you a{" "}
                              <span className="fw-medium text-default">
                                follow request
                              </span>
                              .
                            </div>
                            <div className="text-muted fw-normal fs-12">
                              15 mins ago
                            </div>
                          </div>
                          <div>
                            <a
                              href="javascript:void(0);"
                              className="min-w-fit-content text-muted dropdown-item-close1"
                            >
                              <i className="ri-delete-bin-2-line fs-16" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-md flex-shrink-0">
                          <img src="assets/images/faces/12.jpg" alt="img" />
                          <a
                            href="javascript:void(0);"
                            className="badge rounded-pill bg-primary avatar-badge"
                          >
                            <i className="fe fe-credit-card" />
                          </a>
                        </span>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="fs-13">
                            <div className="text-muted">
                              <a
                                href="javascript:void(0);"
                                className="fw-medium"
                              >
                                Amit Patel
                              </a>{" "}
                              sent you a{" "}
                              <span className="fw-medium text-default">
                                money transfer
                              </span>{" "}
                              of ₹15,000.
                            </div>
                            <div className="text-muted fw-normal fs-12">
                              30 mins ago
                            </div>
                          </div>
                          <div>
                            <a
                              href="javascript:void(0);"
                              className="min-w-fit-content text-muted dropdown-item-close1"
                            >
                              <i className="ri-delete-bin-2-line fs-16" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-item">
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar avatar-md flex-shrink-0">
                          <img src="assets/images/faces/4.jpg" alt="img" />
                          <a
                            href="javascript:void(0);"
                            className="badge rounded-pill bg-warning avatar-badge"
                          >
                            <i className="fe fe-message-circle" />
                          </a>
                        </span>
                        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                          <div className="fs-13">
                            <div className="text-muted">
                              <a
                                href="javascript:void(0);"
                                className="fw-medium"
                              >
                                Neha Verma
                              </a>{" "}
                              replied to your{" "}
                              <span className="fw-medium text-default">
                                message
                              </span>
                              .
                            </div>
                            <div className="text-muted fw-normal fs-12">
                              1 hour ago
                            </div>
                          </div>
                          <div>
                            <a
                              href="javascript:void(0);"
                              className="min-w-fit-content text-muted dropdown-item-close1"
                            >
                              <i className="ri-delete-bin-2-line fs-16" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="p-3 empty-header-item1 border-top">
                    <div className="d-grid">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-primary btn-wave"
                      >
                        View All
                      </a>
                    </div>
                  </div>
                  <div className="p-5 empty-item1 d-none">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                        <i className="ri-notification-off-line fs-2" />
                      </span>
                      <h6 className="fw-medium mt-3">No New Notifications</h6>
                    </div>
                  </div>
                </div>
                {/* End::main-header-dropdown */}
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element header-fullscreen">
                {/* Start::header-link */}
                <a
                  onclick="openFullscreen();"
                  href="javascript:void(0);"
                  className="header-link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" full-screen-open header-link-icon"
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
                      d="m12.567 7.934l2.742.1c.407.015.73.35.73.758v2.615m-5.5 2.027l5.044-5.018M2 17c0-1.886 0-2.828.586-3.414S4.114 13 6 13h1c1.886 0 2.828 0 3.414.586S11 15.114 11 17v1c0 1.886 0 2.828-.586 3.414S8.886 22 7 22H6c-1.886 0-2.828 0-3.414-.586S2 19.886 2 18zm0-8.5v2M14 2h-4m12 12v-4m-8.5 12h2M2.06 5.5c.154-1.066.453-1.821 1.036-2.404S4.434 2.214 5.5 2.06m13 0c1.066.154 1.821.453 2.404 1.036c.582.583.882 1.338 1.036 2.404m0 13c-.154 1.066-.454 1.821-1.036 2.404c-.583.582-1.338.882-2.404 1.036"
                      color="currentColor"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="full-screen-close header-link-icon d-none"
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
                      <path d="M2 10.002c.029-3.414.218-5.296 1.46-6.537C4.924 2 7.282 2 11.997 2s7.073 0 8.538 1.465S22 7.287 22 12.003c0 4.715 0 7.073-1.465 8.537c-1.241 1.242-3.123 1.431-6.537 1.46" />
                      <path d="M4.999 13c-1.17.035-1.868.165-2.351.648s-.613 1.18-.648 2.35M8.001 13c1.17.035 1.868.165 2.351.648s.613 1.18.648 2.35m0 3.003c-.035 1.17-.165 1.868-.648 2.351s-1.18.613-2.35.648m-3.003 0c-1.17-.035-1.868-.165-2.351-.648s-.613-1.18-.648-2.35m14.413-7.996l-2.903-.066c-.432-.01-.777-.345-.782-.757l-.031-2.644m7.331-3.773l-6.747 6.601" />
                    </g>
                  </svg>
                </a>
                {/* End::header-link */}
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element dropdown">
                {/* Start::header-link|dropdown-toggle */}
                <a
                  href="javascript:void(0);"
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
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="mail.html"
                    >
                      <i className="ri-chat-1-line fs-15 me-2 text-gray fw-normal" />
                      Messages <span className="badge bg-pink ms-auto">02</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="profile.html"
                    >
                      <i className="ri-group-line fs-15 me-2 text-gray fw-normal" />
                      Friends
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="mail-settings.html"
                    >
                      <i className="ri-user-settings-line fs-15 me-2 text-gray fw-normal" />
                      Account Settings
                    </a>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />{" "}
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="sign-in-cover.html"
                    >
                      <i className="ri-logout-circle-line fs-15 me-2 text-gray fw-normal" />
                      Sign Out
                    </a>
                  </li>
                </ul>
              </li>
              {/* End::header-element */}
              {/* Start::header-element */}
              <li className="header-element">
                {/* Start::header-link|switcher-icon */}
                <a
                  href="javascript:void(0);"
                  className="header-link switcher-icon"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#switcher-canvas"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
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
                      <path d="m21.318 7.141l-.494-.856c-.373-.648-.56-.972-.878-1.101c-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 0 1-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178c-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19c-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 0 1-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176c-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234c.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105s.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1s.676.028 1.395-.176l1.22-.344a2 2 0 0 1 1.359.17l.336.194c.36.23.636.57.788.968l.334.997c.22.66.33.99.591 1.18c.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189s.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177c.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234s-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105s-.14-.626-.49-1.234" />
                      <path d="M15.52 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0" />
                    </g>
                  </svg>
                </a>
                {/* End::header-link|switcher-icon */}
              </li>
              {/* End::header-element */}
            </ul>
            {/* End::header-content-right */}
          </div>
          {/* End::main-header-container */}
        </header>
        {/* End::main-header */}
      </div>
    </>
  );
};

export default Header;
