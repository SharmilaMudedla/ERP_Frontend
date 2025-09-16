import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Start::page-header */}
          <div className="my-4 page-header-breadcrumb d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="page-title fw-medium fs-18 mb-2">HRM</h1>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0);">Dashboards</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  HRM
                </li>
              </ol>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="d-flex gap-2">
                <div className="position-relative">
                  <button
                    className="btn btn-primary btn-wave"
                    type="button"
                    id="dropdownMenuClickableInside"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                  >
                    Filter By <i className="ri-arrow-down-s-fill ms-1" />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickableInside"
                  >
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Last 7 Days
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Last 30 Days
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Last 6 Months
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Last Year
                      </a>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-secondary btn-icon btn-wave"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Download"
                >
                  <i className="ti ti-download" />
                </button>
                <button
                  className="btn btn-success btn-icon btn-wave"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Share"
                >
                  <i className="ti ti-share-3" />
                </button>
              </div>
            </div>
          </div>
          {/* End::page-header */}
          {/* Start:: row-1 */}
          <div className="row">
            <div className="col-xxl-5 col-lg-12">
              <div className="row">
                <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="card custom-card hrm-cards overflow-hidden">
                    <div className="card-body p-4">
                      <span className="d-block mb-2">Total Employees</span>
                      <h4 className="fw-semibold mb-2">23,768</h4>
                      <span className="fs-12 text-muted">
                        This Month
                        <span className="text-success fs-12 fw-medium ms-2 d-inline-block">
                          <i className="ri-arrow-up-line me-1" />
                          2.45%
                        </span>
                      </span>
                      <span className="hrm-cards-icon svg-white text-fixed-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <polygon
                            points="224 64 128 96 32 64 128 32 224 64"
                            opacity="0.2"
                          />
                          <line
                            x1={32}
                            y1={64}
                            x2={32}
                            y2={144}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M56,216c15.7-24.08,41.11-40,72-40s56.3,15.92,72,40"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <polygon
                            points="224 64 128 96 32 64 128 32 224 64"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M169.34,82.22a56,56,0,1,1-82.68,0"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="card custom-card hrm-cards overflow-hidden secondary">
                    <div className="card-body p-4">
                      <span className="d-block mb-2">Total Jobs Applied</span>
                      <h4 className="fw-semibold mb-2">1,673</h4>
                      <span className="fs-12 text-muted">
                        This Month
                        <span className="text-danger fs-12 fw-medium ms-2 d-inline-block">
                          <i className="ri-arrow-down-line me-1" />
                          0.62%
                        </span>
                      </span>
                      <span className="hrm-cards-icon svg-white text-fixed-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <circle
                            cx={104}
                            cy={144}
                            r={32}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M72,144a32,32,0,1,1,32,32h88V80H64v64Z"
                            opacity="0.2"
                          />
                          <path
                            d="M53.39,208a56,56,0,0,1,101.22,0H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <polyline
                            points="176 176 192 176 192 80 64 80 64 96"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="card custom-card hrm-cards overflow-hidden success">
                    <div className="card-body p-4">
                      <span className="d-block mb-2">New Employees</span>
                      <h4 className="fw-semibold mb-2">526</h4>
                      <span className="fs-12 text-muted">
                        This Month
                        <span className="text-success fs-12 fw-medium ms-2 d-inline-block">
                          <i className="ri-arrow-up-line me-1" />
                          3.75%
                        </span>
                      </span>
                      <span className="hrm-cards-icon svg-white text-fixed-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <path
                            d="M128,232a32,32,0,0,1,32-32h64a8,8,0,0,0,8-8V64a8,8,0,0,0-8-8H160a32,32,0,0,0-32,32Z"
                            opacity="0.2"
                          />
                          <path
                            d="M128,88a32,32,0,0,1,32-32h64a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <line
                            x1={160}
                            y1={96}
                            x2={200}
                            y2={96}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <line
                            x1={160}
                            y1={128}
                            x2={200}
                            y2={128}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <line
                            x1={160}
                            y1={160}
                            x2={200}
                            y2={160}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="card custom-card hrm-cards overflow-hidden pink">
                    <div className="card-body p-4">
                      <span className="d-block mb-2">Newly Recruited</span>
                      <h4 className="fw-semibold mb-2">5,553</h4>
                      <span className="fs-12 text-muted">
                        This Month
                        <span className="text-success fs-12 fw-medium ms-2 d-inline-block">
                          <i className="ri-arrow-up-line me-1" />
                          21.54%
                        </span>
                      </span>
                      <span className="hrm-cards-icon svg-white text-fixed-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                        >
                          <rect width={256} height={256} fill="none" />
                          <path
                            d="M128,128h24a40,40,0,0,1,0,80H128Z"
                            opacity="0.2"
                          />
                          <path
                            d="M128,48H112a40,40,0,0,0,0,80h16Z"
                            opacity="0.2"
                          />
                          <line
                            x1={128}
                            y1={24}
                            x2={128}
                            y2={48}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <line
                            x1={128}
                            y1={208}
                            x2={128}
                            y2={232}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                          <path
                            d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={16}
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card custom-card">
                <div className="card-header">
                  <div className="card-title">Upcoming Events</div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled timeline-widget mb-0 mb-2">
                    <li className="timeline-widget-list">
                      <div className="d-flex align-items-top">
                        <div className="me-5 text-center">
                          <span className="d-block fs-20 fw-semibold text-primary">
                            02
                          </span>
                          <span className="d-block fs-12 text-muted">Mon</span>
                        </div>
                        <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between ps-3">
                          <div>
                            <p className="mb-1 text-truncate timeline-widget-content text-wrap fs-13 fw-semibold">
                              You have an announcement - Diam Eirmod
                            </p>
                            <p className="mb-0 fs-12 lh-1 text-muted">
                              10:00AM
                              <span className="badge bg-primary ms-2">
                                Announcement
                              </span>
                            </p>
                          </div>
                          <div className="dropdown mt-2 mt-sm-0">
                            <a
                              aria-label="anchor"
                              href="javascript:void(0);"
                              className="p-2 fs-14 bg-primary-transparent rounded"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-more-vertical" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-widget-list">
                      <div className="d-flex align-items-top">
                        <div className="me-5 text-center">
                          <span className="d-block fs-20 fw-semibold text-primary">
                            15
                          </span>
                          <span className="d-block fs-12 text-muted">Sun</span>
                        </div>
                        <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between ps-3">
                          <div>
                            <p className="mb-1 text-truncate timeline-widget-content text-wrap fs-13 fw-semibold">
                              National holiday - Vero Jayanti
                            </p>
                            <p className="mb-0 fs-12 lh-1 text-muted">
                              <span className="badge bg-warning">Holiday</span>
                            </p>
                          </div>
                          <div className="dropdown mt-2 mt-sm-0">
                            <a
                              aria-label="anchor"
                              href="javascript:void(0);"
                              className="p-2 fs-14 bg-primary-transparent rounded"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-more-vertical" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-widget-list">
                      <div className="d-flex align-items-top">
                        <div className="me-5 text-center">
                          <span className="d-block fs-20 fw-semibold text-primary">
                            23
                          </span>
                          <span className="d-block fs-12 text-muted">Mon</span>
                        </div>
                        <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between ps-3">
                          <div>
                            <p className="mb-1 text-truncate timeline-widget-content text-wrap fs-13 fw-semibold">
                              John pup birthday - Team Member
                            </p>
                            <p className="mb-0 fs-12 lh-1 text-muted">
                              09:00AM
                              <span className="badge bg-success ms-2">
                                Birthday
                              </span>
                            </p>
                          </div>
                          <div className="dropdown mt-2 mt-sm-0">
                            <a
                              aria-label="anchor"
                              href="javascript:void(0);"
                              className="p-2 fs-14 bg-primary-transparent rounded"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-more-vertical" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-widget-list">
                      <div className="d-flex align-items-top">
                        <div className="me-5 text-center">
                          <span className="d-block fs-20 fw-semibold text-primary">
                            31
                          </span>
                          <span className="d-block fs-12 text-muted">Tue</span>
                        </div>
                        <div className="d-flex flex-wrap flex-fill align-items-top justify-content-between ps-3">
                          <div>
                            <p className="mb-1 text-truncate timeline-widget-content text-wrap fs-13 fw-semibold">
                              National Holiday - Dolore Ipsum
                            </p>
                            <p className="mb-0 fs-12 lh-1 text-muted">
                              <span className="badge bg-warning">Holiday</span>
                            </p>
                          </div>
                          <div className="dropdown mt-2 mt-sm-0">
                            <a
                              aria-label="anchor"
                              href="javascript:void(0);"
                              className="p-2 fs-14 bg-primary-transparent rounded"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-more-vertical" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-sm-12">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title mb-2">Preformance By Category</div>
                  <div className="dropdown">
                    <a
                      href="javascript:void(0);"
                      className="p-2 fs-12 rounded bg-secondary-transparent"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      {" "}
                      Sort By{" "}
                      <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block" />{" "}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          This Week
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Last Week
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          This Month
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body px-0 pb-0">
                  <ul className="d-flex flex-wrap mb-0 list-unstyled gap-5 justify-content-around p-3 border-top border-bottom border-block-start-dashed border-block-end-dashed bg-light bg-opacity-25 mb-5">
                    <li>
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <div className="lh-1 me-1">
                          <span className="avatar avatar-sm bg-primary">
                            <i className="ri-stack-line fs-20" />
                          </span>
                        </div>
                        <div>
                          <span className="d-block mb-1 fw-medium text-muted">
                            Development
                          </span>
                          <h4 className="fw-medium mb-0">64,241</h4>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <div className="lh-1 me-1">
                          <span className="avatar avatar-sm bg-secondary">
                            <i className="ri-rocket-line fs-20" />
                          </span>
                        </div>
                        <div>
                          <span className="d-block mb-1 fw-medium text-muted">
                            Management
                          </span>
                          <h4 className="fw-medium mb-0">1,543</h4>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-start justify-content-between gap-2">
                        <div className="lh-1 me-1">
                          <span className="avatar avatar-sm bg-pink">
                            <i className="ri-check-line fs-20" />
                          </span>
                        </div>
                        <div>
                          <span className="d-block mb-1 fw-medium text-muted">
                            Designing
                          </span>
                          <h4 className="fw-medium mb-0">3,848</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div id="preformance-category" />
                </div>
              </div>
            </div>
          </div>
          {/* End:: row-1 */}
          {/* Start:: row-2 */}
          <div className="row">
            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card overflow-hidden">
                <div className="card-header justify-content-between">
                  <div className="card-title">Event List</div>
                  <a
                    href="javascript:void(0);"
                    className="fs-12 text-muted tag-link"
                  >
                    {" "}
                    View All
                    <i className="ti ti-arrow-narrow-right ms-1" />{" "}
                  </a>
                </div>
                <div className="card-body">
                  <ul className="list-group list-unstyled hrm-events-list mb-0">
                    <li>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main1 me-2">
                            <span className="avatar bg-primary-transparent svg-primary avatar-rounded avatar-md">
                              <i className="ri-calendar-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">
                              Office Anniversary
                            </span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              19, Dec 2024 - Thursday
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            Full Day
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main2 me-2">
                            <span className="avatar bg-secondary-transparent svg-secondary avatar-rounded avatar-md">
                              <i className="ri-cake-2-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">Holi</span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              10, Mar 2024 - Sunday
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            Festival
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main3 me-2">
                            <span className="avatar bg-success-transparent svg-success avatar-rounded avatar-md">
                              <i className="ri-add-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">
                              Good Friday
                            </span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              05, Apr 2024 - Friday
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            Festival
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main4 me-2">
                            <span className="avatar bg-danger-transparent svg-danger avatar-rounded avatar-md">
                              <i className="ri-flag-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">
                              Independence Day
                            </span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              15, Aug 2024 - Thursday
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            Public Holiday
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main5 me-2">
                            <span className="avatar bg-info-transparent svg-info avatar-rounded avatar-md">
                              <i className="ri-gift-2-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">
                              Christmas
                            </span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              25, Dec 2024 - Friday
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            Public Holiday
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center lh-1">
                          <span className="avatar-main6 me-2">
                            <span className="avatar bg-warning-transparent svg-warning avatar-rounded avatar-md">
                              <i className="ri-briefcase-2-line fs-14" />
                            </span>
                          </span>
                          <div className="d-flex flex-column">
                            <span className="d-block fw-medium mb-2">
                              Office Tour
                            </span>
                            <span className="d-block fw-medium text-muted fs-12 mb-1">
                              15, Jan 2024 - 16, Jan 2024
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="badge bg-primary-transparent">
                            2 Days
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card">
                <div className="card-header">
                  <div className="card-title">Source Overview</div>
                </div>
                <div className="card-body">
                  <div id="source-overview" />
                </div>
                <div className="row bg-light bg-opacity-50 mx-0 p-3 py-2 rounded">
                  <div className="col-6 border-end border-inline-end-dashed text-center">
                    <p className="text-muted mb-1 fs-12">This Month</p>
                    <h6 className="text-success">+62.45%</h6>
                  </div>
                  <div className="col-6 text-center">
                    <p className="text-muted mb-1 fs-12">Last Month</p>
                    <h6 className="text-danger">-48.12%</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">Today's Meetings</div>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-light btn-sm"
                    >
                      View All
                    </a>
                  </div>
                </div>
                <div className="card-body py-3">
                  <ul className="list-unstyled mb-0 schedule-list">
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-danger-transparent">
                            <img src="assets/images/faces/15.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Anurag Batiya</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            03 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-success-transparent">
                            <img src="assets/images/faces/6.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Team Meeting</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            05 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-pink-transparent">
                            <img src="assets/images/faces/13.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Client Meeting</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            06 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-secondary-transparent">
                            <img src="assets/images/faces/3.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Client Meeting</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            06 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-success-transparent">
                            <img src="assets/images/faces/11.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Team Meeting</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            05 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center flex-wrap flex-xl-nowrap gap-1">
                        <div className="lh-1">
                          <span className="avatar avatar-md avatar-rounded p-1 bg-info-transparent">
                            <img src="assets/images/faces/1.jpg" alt />
                          </span>
                        </div>
                        <div className="flex-fill ms-2 text-truncate">
                          <p className="fw-medium mb-0">Project Meeting</p>
                          <p className="fs-11 text-muted mb-0 text-nowrap text-truncate w-75">
                            <i className="ri-time-line me-1" />
                            04 May(9.00am-10.00am)
                          </p>
                        </div>
                        <div className="ms-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm text-nowrap"
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-6">
              <div className="card custom-card">
                <div className="card-header">
                  <div className="card-title">Recruitment Pipeline</div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled recruitment-pipeline-list mb-0">
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-primary-transparent">
                            <i className="ri ri-layout-grid-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">
                          Total Applications
                        </div>
                        <div className="text-end">
                          <span className="text-primary h6 mb-0 fw-semibold">
                            2,350
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-secondary-transparent">
                            <i className="ri ri-user-add-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">Recruited</div>
                        <div className="text-end">
                          <span className="text-secondary h6 mb-0">780</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-success-transparent">
                            <i className="ri ri-file-list-3-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">
                          Short Listed
                        </div>
                        <div className="text-end">
                          <span className="text-success h6 mb-0">650</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-warning-transparent">
                            <i className="ri ri-close-circle-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">Rejected</div>
                        <div className="text-end">
                          <span className="text-warning h6 mb-0">550</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-info-transparent">
                            <i className="ri ri-file-excel-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">Blocked</div>
                        <div className="text-end">
                          <span className="text-info h6 mb-0">310</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <span className="avatar avatar-md avatar-rounded bg-danger-transparent">
                            <i className="ri ri-information-line fs-15" />
                          </span>
                        </div>
                        <div className="flex-fill fw-semibold">Interviewed</div>
                        <div className="text-end">
                          <span className="text-danger h6 mb-0">220</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End:: row-2 */}
          {/* Start:: row-3 */}
          <div className="row">
            <div className="col-xxl-12">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">Employee Directory</div>
                  <div className="d-flex flex-wrap">
                    <div className="me-3 my-1">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Search Here"
                        aria-label=" example"
                      />
                    </div>
                    <div className="dropdown my-1">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm btn-primary"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sort By
                        <i className="ri-arrow-down-s-line align-middle ms-1" />
                      </a>
                      <ul className="dropdown-menu" role="menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            New
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            Popular
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            Relevant
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover text-nowrap table-bordered text-center">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            S.No
                          </th>
                          <th scope="col">Employee Id</th>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Position</th>
                          <th scope="col">Department</th>
                          <th scope="col">Email</th>
                          <th scope="col">Status</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Salary</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">01</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23520
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/1.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Richard Dom
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Team Leader</span>
                          </td>
                          <td>
                            <span className>Backend</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              richard116@demo.com
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-success-transparent">
                              Active
                            </span>
                          </td>
                          <td>
                            <span className>+0987654321</span>
                          </td>
                          <td>
                            <span className="fw-medium">$15,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">02</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23521
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/2.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Kakashra Sri
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Web Developer</span>
                          </td>
                          <td>
                            <span className>Front End</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              Kakashra987@demo.com
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-success-transparent">
                              Active
                            </span>
                          </td>
                          <td>
                            <span className>+0986548761</span>
                          </td>
                          <td>
                            <span className="fw-medium">$20,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">03</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23522
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/3.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Nikki Jey
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Project Manager</span>
                          </td>
                          <td>
                            <span className>HR</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">Nikki654@demo.com</a>
                          </td>
                          <td>
                            <span className="badge bg-info-transparent">
                              On Leave
                            </span>
                          </td>
                          <td>
                            <span className>+0986548787</span>
                          </td>
                          <td>
                            <span className="fw-medium">$25,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">04</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23523
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/4.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Sasukey Ahuhi
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Project Manager</span>
                          </td>
                          <td>
                            <span className>HR</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              Sasukey986@demo.com
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-success-transparent">
                              Active
                            </span>
                          </td>
                          <td>
                            <span className>+0986548788</span>
                          </td>
                          <td>
                            <span className="fw-medium">$30,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">05</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23524
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/5.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Xiong Yu
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>UI Developer</span>
                          </td>
                          <td>
                            <span className>Engineering</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">Xiongu987@demo.com</a>
                          </td>
                          <td>
                            <span className="badge bg-success-transparent">
                              Active
                            </span>
                          </td>
                          <td>
                            <span className>+0986548988</span>
                          </td>
                          <td>
                            <span className="fw-medium">$35,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">06</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23525
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/6.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Arifa Zed
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Team Member</span>
                          </td>
                          <td>
                            <span className>IT</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">Arifa432@demo.com</a>
                          </td>
                          <td>
                            <span className="badge bg-danger-transparent">
                              Resigned
                            </span>
                          </td>
                          <td>
                            <span className>+0986548985</span>
                          </td>
                          <td>
                            <span className="fw-medium">$40,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">07</td>
                          <td>
                            <span className="text-primary fs-14">
                              #emp23526
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/images/faces/7.jpg"
                                className="avatar avatar-sm"
                                alt
                              />
                              <div className="flex-1 flex-between pos-relative ms-2">
                                <div className>
                                  <a
                                    href="javascript:void(0);"
                                    className="fs-13 fw-medium"
                                  >
                                    Jennifer Tab
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className>Project Manager</span>
                          </td>
                          <td>
                            <span className>Front End</span>
                          </td>
                          <td>
                            <a href="javascript:void(0);">
                              Jennifer543@demo.com
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-success-transparent">
                              Active
                            </span>
                          </td>
                          <td>
                            <span className>+09865489987</span>
                          </td>
                          <td>
                            <span className="fw-medium">$45,000</span>
                          </td>
                          <td>
                            <div className="g-2">
                              <a
                                aria-label="anchor"
                                className="btn  btn-primary-light btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit"
                              >
                                <span className="ri-pencil-line fs-14" />
                              </a>
                              <a
                                aria-label="anchor"
                                className="btn btn-danger-light btn-sm ms-2"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete"
                              >
                                <span className="ri-delete-bin-7-line fs-14" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex align-items-center">
                    <div>
                      Showing 7 Entries{" "}
                      <i className="bi bi-arrow-right ms-2 fw-medium" />
                    </div>
                    <div className="ms-auto">
                      <nav
                        aria-label="Page navigation"
                        className="pagination-style-4"
                      >
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="javascript:void(0);">
                              Prev
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="javascript:void(0);">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="javascript:void(0);">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link text-primary"
                              href="javascript:void(0);"
                            >
                              next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End:: row-3 */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
