// Layout.jsx
import React, { useState } from "react";
import Header from "../Shared/Header";
import Sidebar from "../Shared/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`app-wrapper ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="app-content">{children}</main>
    </div>
  );
};

export default Layout;
