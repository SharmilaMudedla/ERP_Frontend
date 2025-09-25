import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import ToasterAlert from "../toaster/ToasterAlert";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Services/loginService";
import { getRoles } from "../Services/roleService";
const Login = () => {
  const initialStage = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState(initialStage);

  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    setLoader(true);
    try {
      const response = await getRoles();
      if (response?.success) {
        setRoles(response?.data || []);
      }
    } catch (error) {
      setRoles([]);
      toast.error(error?.message || "Error fetching Roles");
      console.error(" Error fetching Roles:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.warning(err));
      setLoader(false);
      return;
    }

    try {
      const response = await userLogin(formData);
      if (response?.success) {
        const token = response?.data?.token;
        const userRoleId = response?.data?.user?.roleId;

        const matchedRole = roles.find(
          (role) => role._id === userRoleId || role.id === userRoleId
        );

        const roleName = matchedRole?.name
          ? matchedRole.name.toLowerCase()
          : "employee";

        localStorage.setItem("SpondiasAuthToken", token);
        localStorage.setItem("UserRole", roleName);

        toast.success(response?.message || "Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <ToasterAlert />
      <div className="bg-white">
        <div className="row authentication authentication-cover-main mx-0">
          <div className="col-xxl-6 col-xl-5 col-lg-12 d-xl-block d-none px-0">
            <div className="authentication-cover overflow-hidden">
              <div className="d-flex align-items-center justify-content-center p-3 rounded m-5">
                <div className="p-3 text-center">
                  <img
                    src="assets/images/brand-logos/Spondias-logo.png"
                    alt="Logo"
                    className="authentication-brand toggle-dark"
                    style={{ height: "122px" }}
                  />
                  <p className="mb-0 fs-16 lh-base op-8 mt-3">
                    Be part of something extraordinary. Sign in and unlock
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-6 col-xl-7">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-xxl-6 col-xl-9 col-lg-6 col-md-6 col-sm-8 col-12">
                <div className="card custom-card my-5 auth-circle">
                  <div className="card-body p-sm-5 p-4 m-1 m-sm-05">
                    <p className="h4 mb-2 fw-semibold">Sign In</p>
                    <p className="mb-4 text-muted fw-normal">
                      Welcome back, please login to your account.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="signin-email"
                          className="form-label text-default"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="signin-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="signin-password"
                          className="form-label text-default d-block"
                        >
                          Password
                          <a
                            href="/reset-password"
                            className="float-end link-danger op-5 fw-medium fs-12"
                          >
                            Forgot password?
                          </a>
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="signin-password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            className="show-password-button text-muted"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "transparent",
                            }}
                          >
                            <i
                              className={
                                showPassword ? "ri-eye-line" : "ri-eye-off-line"
                              }
                            />
                          </button>
                        </div>
                      </div>

                      <div className="d-grid mt-4">
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary"
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
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

export default Login;
