import React from "react";
import { useLocation } from "react-router-dom";
import Pageroutes from "./Pageroutes";
import Header from "./Shared/Header";
import Sidebar from "./Shared/Sidebar";
import Footer from "./Shared/Footer";

const App = () => {
  const location = useLocation();
  const excludeRoutes = ["/"];

  const showLayout = !excludeRoutes.includes(location.pathname);

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
