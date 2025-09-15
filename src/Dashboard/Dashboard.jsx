import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* Start::app-content */}
      <div className="main-content app-content">
        <div className="container-fluid">
          {/* Start::page-header */}
          <div className="d-flex align-items-center justify-content-between my-3 page-header-breadcrumb flex-wrap gap-2">
            <div>
              <p className="fw-medium fs-18 mb-0">Hello there, Arjun Arora</p>
              <p className="fs-13 text-muted mb-0">
                Let's make today a productive one!
              </p>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap"></div>
          </div>
          {/* End::page-header */}
          {/* Start:: row-1 */}
          {/* <div className="row">
            <div className="col-xxl-9">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card custom-card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex gap-3">
                        <div className="avatar avatar-md bg-primary svg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <rect width={256} height={256} fill="none" />
                            <path
                              d="M33.6,145.5A96,96,0,0,1,96,37.5v72Z"
                              opacity="0.2"
                            />
                            <path
                              d="M33.6,145.5A96,96,0,0,1,96,37.5v72Z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M128,128.42V32A96,96,0,1,1,45.22,176.64Z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                          </svg>
                        </div>
                        <div className="flex-fill">
                          <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                            Number Of Sales
                          </div>
                          <div className="fs-22 fw-semibold mb-1 text-primary ">
                            12,432
                          </div>
                          <div className="d-flex align-items-center fs-11">
                            <span className="text-success fw-semibold me-1">
                              <i className="ti ti-trending-up me-1 fw-medium align-middle text-success d-inline-flex" />
                              2.5%
                            </span>
                            <span className="text-default op-6">
                              This Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card custom-card overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex gap-3">
                        <div className="avatar avatar-md bg-secondary svg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <rect width={256} height={256} fill="none" />
                            <path
                              d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z"
                              opacity="0.2"
                            />
                            <line
                              x1={112}
                              y1={112}
                              x2={144}
                              y2={112}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <rect
                              x={32}
                              y={64}
                              width={192}
                              height={144}
                              rx={8}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                            Profit By Sale
                          </div>
                          <div className="fs-22 fw-semibold mb-1 text-secondary">
                            $4,132
                          </div>
                          <div className="d-flex align-items-center fs-11">
                            <span className=" text-success fw-semibold me-1">
                              <i className="ti ti-trending-up me-1 fw-medium align-middle text-success d-inline-flex" />
                              1.5%
                            </span>
                            <span className="text-default op-6">
                              This Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card custom-card overflow-hidden">
                    <div className="card-body  ">
                      <div className="d-flex gap-3">
                        <div className="avatar avatar-md bg-success svg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <rect width={256} height={256} fill="none" />
                            <path
                              d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48Z"
                              opacity="0.2"
                            />
                            <path
                              d="M204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z"
                              opacity="0.2"
                            />
                            <circle
                              cx={204}
                              cy={84}
                              r={28}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M176,85.29A28,28,0,1,1,192,58.71"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                            Total Revenue
                          </div>
                          <div className="fs-22 fw-semibold mb-1 text-success">
                            $15,482
                          </div>
                          <div className="d-flex align-items-center  fs-11">
                            <span className="text-danger fw-semibold me-1">
                              <i className="ti ti-trending-down me-1 fw-medium align-middle text-danger d-inline-flex" />
                              3.4%
                            </span>
                            <span className="text-default op-6">
                              This Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card custom-card overflow-hidden">
                    <div className="card-body ">
                      <div className="d-flex gap-3">
                        <div className="avatar avatar-md bg-pink svg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <rect width={256} height={256} fill="none" />
                            <circle cx={84} cy={108} r={52} opacity="0.2" />
                            <path
                              d="M10.23,200a88,88,0,0,1,147.54,0"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M172,160a87.93,87.93,0,0,1,73.77,40"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <circle
                              cx={84}
                              cy={108}
                              r={52}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                            <path
                              d="M152.69,59.7A52,52,0,1,1,172,160"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={16}
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex-fill fw-medium fs-13 mb-1 text-dark">
                            Total Customers
                          </div>
                          <div className="fs-22 fw-semibold mb-1 text-pink">
                            3,532
                          </div>
                          <div className="d-flex align-items-center fs-11">
                            <span className="text-danger fw-semibold me-1">
                              <i className="ti ti-trending-down me-1 fw-medium align-middle text-danger d-inline-flex" />
                              4.5%
                            </span>
                            <span className="text-default op-6">
                              This Month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* End:: row-1 */}
        </div>
      </div>
      {/* End::app-content */}
    </>
  );
};

export default Dashboard;
