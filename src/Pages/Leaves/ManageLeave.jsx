import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaves, changeLeaveStatus } from "../../Services/addleaveService";
import { toast } from "sonner";
import Loader from "../../loader/Loader";
import ToasterAlert from "../../toaster/ToasterAlert";
const ManageLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchLeaves = async () => {
    setLoader(true);
    try {
      const response = await getLeaves();
      console.log("response", response);
      if (response?.success) {
        setLeaves(response?.data || []);
      }
    } catch (error) {
      setLeaves([]);
      toast.error(error?.message || "Error fetching Leaves");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeStatus = async (id) => {
    setLoader(true);
    try {
      const response = await changeLeaveStatus(id);
      if (response?.success) {
        toast.success(response?.message || "Leave status updated");
        fetchLeaves();
      }
    } catch (error) {
      toast.error(error?.message || "Error updating status");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="main-content app-content">
        <div className="container-fluid">
          <div class="col-xxl-9">
            <div className="d-flex align-items-center justify-content-between my-3 page-header-breadcrumb flex-wrap gap-2">
              <div>
                <p className="fw-medium fs-18 mb-0">Hello there, Arjun Arora</p>
                <p className="fs-13 text-muted mb-0">
                  Let's make today a productive one!
                </p>
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
                          <span className="text-default op-6">This Month</span>
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
                          <span className="text-default op-6">This Month</span>
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
                          <span className="text-default op-6">This Month</span>
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
                          <span className="text-default op-6">This Month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card custom-card overflow-hidden">
                  <div className="card-header justify-content-between">
                    <div className="card-title">Recent Orders</div>
                    <div className="d-flex flex-wrap gap-2">
                      <div>
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search Here"
                          aria-label=".form-control-sm example"
                        />
                      </div>
                      <div className="dropdown">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary btn-sm btn-wave waves-effect waves-light"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {" "}
                          Sort By
                          <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block" />
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
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table text-nowrap table-hover">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Ordered Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-md bg-primary-transparent">
                                    JD
                                  </span>
                                </div>
                                <div>
                                  <span className="fw-semibold d-block">
                                    John Doe
                                  </span>
                                  <span className="text-muted fs-12">
                                    #SPK1001
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="assets/images/ecommerce/png/20.png"
                                      alt
                                    />
                                  </span>
                                </div>
                                <div className="flex-fill">
                                  <span className="d-block fw-semibold">
                                    Wrist Watch
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fw-semibold d-block">
                                2024-10-05
                              </span>
                              <span className="fs-12 text-muted">12:45PM</span>
                            </td>
                            <td>
                              <span className="badge bg-primary">Shipped</span>
                            </td>
                            <td>$150.00</td>
                            <td>
                              <div>
                                <i className="ri-bank-card-line me-1 fs-14" />
                                Credit Card
                              </div>
                              <div className="fs-12 text-muted">
                                **** **** 1111
                              </div>
                            </td>
                            <td>
                              <div className="btn-list">
                                <button className="btn btn-primary-light btn-icon btn-sm ">
                                  <i className="ri-eye-line" />
                                </button>
                                <button className="btn btn-secondary-light btn-icon btn-sm ">
                                  <i className="ti ti-pencil" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-md bg-primary-transparent">
                                    JS
                                  </span>
                                </div>
                                <div>
                                  <span className="fw-semibold d-block">
                                    Jane Smith
                                  </span>
                                  <span className="text-muted fs-12">
                                    #SPK1002
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="assets/images/ecommerce/png/16.png"
                                      alt
                                    />
                                  </span>
                                </div>
                                <div className="flex-fill">
                                  <span className="d-block fw-semibold">
                                    Teddy Bear
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fw-semibold d-block">
                                2024-10-06
                              </span>
                              <span className="fs-12 text-muted">10:15AM</span>
                            </td>
                            <td>
                              <span className="badge bg-secondary">
                                Pending
                              </span>
                            </td>
                            <td>$230.00</td>
                            <td>
                              <div>
                                <i className="ri-bank-card-line me-1 fs-14" />
                                MasterCard
                              </div>
                              <div className="fs-12 text-muted">
                                **** **** 4444
                              </div>
                            </td>
                            <td>
                              <div className="btn-list">
                                <button className="btn btn-primary-light btn-icon btn-sm ">
                                  <i className="ri-eye-line" />
                                </button>
                                <button className="btn btn-secondary-light btn-icon btn-sm ">
                                  <i className="ti ti-pencil" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-md bg-primary-transparent">
                                    BL
                                  </span>
                                </div>
                                <div>
                                  <span className="fw-semibold d-block">
                                    Bob Lee
                                  </span>
                                  <span className="text-muted fs-12">
                                    #SPK1003
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="assets/images/ecommerce/png/23.png"
                                      alt
                                    />
                                  </span>
                                </div>
                                <div className="flex-fill">
                                  <span className="d-block fw-semibold">
                                    Shoes
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fw-semibold d-block">
                                2024-10-07
                              </span>
                              <span className="fs-12 text-muted">04:53PM</span>
                            </td>
                            <td>
                              <span className="badge bg-success">
                                Delivered
                              </span>
                            </td>
                            <td>$120.00</td>
                            <td>
                              <div>
                                <i className="ri-bank-card-line me-1 fs-14" />
                                Bank Transfer
                              </div>
                              <div className="fs-12 text-muted">
                                Direct Payment
                              </div>
                            </td>
                            <td>
                              <div className="btn-list">
                                <button className="btn btn-primary-light btn-icon btn-sm ">
                                  <i className="ri-eye-line" />
                                </button>
                                <button className="btn btn-secondary-light btn-icon btn-sm ">
                                  <i className="ti ti-pencil" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-md bg-primary-transparent">
                                    AJ
                                  </span>
                                </div>
                                <div>
                                  <span className="fw-semibold d-block">
                                    Alice Johnson
                                  </span>
                                  <span className="text-muted fs-12">
                                    #SPK1004
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="assets/images/ecommerce/png/11.png"
                                      alt
                                    />
                                  </span>
                                </div>
                                <div className="flex-fill">
                                  <span className="d-block fw-semibold">
                                    Over Coat
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fw-semibold d-block">
                                2024-10-08
                              </span>
                              <span className="fs-12 text-muted">11:26AM</span>
                            </td>
                            <td>
                              <span className="badge bg-danger">Cancelled</span>
                            </td>
                            <td>$85.00</td>
                            <td>
                              <div>
                                <i className="ri-bank-card-line me-1 fs-14" />
                                American Express
                              </div>
                              <div className="fs-12 text-muted">
                                ****** 10005
                              </div>
                            </td>
                            <td>
                              <div className="btn-list">
                                <button className="btn btn-primary-light btn-icon btn-sm ">
                                  <i className="ri-eye-line" />
                                </button>
                                <button className="btn btn-secondary-light btn-icon btn-sm ">
                                  <i className="ti ti-pencil" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-bottom-0">
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-md bg-primary-transparent">
                                    MB
                                  </span>
                                </div>
                                <div>
                                  <span className="fw-semibold d-block">
                                    Michael Brown
                                  </span>
                                  <span className="text-muted fs-12">
                                    #SPK1005
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="assets/images/ecommerce/png/13.png"
                                      alt
                                    />
                                  </span>
                                </div>
                                <div className="flex-fill">
                                  <span className="d-block fw-semibold">
                                    Leather Watch
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="border-bottom-0">
                              <span className="fw-semibold d-block">
                                2024-10-09
                              </span>
                              <span className="fs-12 text-muted">03:29PM</span>
                            </td>
                            <td className="border-bottom-0">
                              <span className="badge bg-primary">Shipped</span>
                            </td>
                            <td className="border-bottom-0">$500.00</td>
                            <td className="border-bottom-0">
                              <div>
                                <i className="ri-bank-card-line me-1 fs-14" />
                                PayPal
                              </div>
                              <div className="fs-12 text-muted">PayPal App</div>
                            </td>
                            <td className="border-bottom-0">
                              <div className="btn-list">
                                <button className="btn btn-primary-light btn-icon btn-sm ">
                                  <i className="ri-eye-line" />
                                </button>
                                <button className="btn btn-secondary-light btn-icon btn-sm ">
                                  <i className="ti ti-pencil" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer py-2">
                    <div className="d-flex align-items-center ">
                      <div>
                        {" "}
                        Showing 5 Entries{" "}
                        <i className="bi bi-arrow-right ms-2 fw-semibold" />
                      </div>
                      <div className="ms-auto">
                        <nav
                          aria-label="Page navigation"
                          className="pagination-style-4"
                        >
                          <ul className="pagination mb-0">
                            <li className="page-item disabled">
                              {" "}
                              <a
                                className="page-link"
                                href="javascript:void(0);"
                              >
                                {" "}
                                Prev{" "}
                              </a>{" "}
                            </li>
                            <li className="page-item active">
                              <a
                                className="page-link"
                                href="javascript:void(0);"
                              >
                                1
                              </a>
                            </li>
                            <li className="page-item">
                              <a
                                className="page-link"
                                href="javascript:void(0);"
                              >
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              {" "}
                              <a
                                className="page-link text-primary"
                                href="javascript:void(0);"
                              >
                                {" "}
                                next{" "}
                              </a>{" "}
                            </li>
                          </ul>
                        </nav>
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

export default ManageLeave;
