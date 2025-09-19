import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pageroutes from "./Pageroutes";
import Header from "./Shared/Header";
import Sidebar from "./Shared/Sidebar";
import Footer from "./Shared/Footer";
import { jwtDecode } from "jwt-decode";
import "./App.css";
const tokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const restrictPaths = ["/"];
  const isLoginPage = restrictPaths.includes(location.pathname);
  const showLayout = !isLoginPage;
  useEffect(() => {
    const token = localStorage.getItem("SpondiasAuthToken");
    if (!token || (tokenExpired(token) && !isLoginPage)) {
      navigate("/", { replace: true });
    }
  }, [location.pathname]);
  return (
    <>
      <div className="page">
        {showLayout && <Header />}
        {showLayout && <Sidebar />}
        <Pageroutes />
        {showLayout && <Footer />}
      </div>
    </>
  );
};

export default App;
