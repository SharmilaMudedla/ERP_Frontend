import React from "react";
import Pageroutes from "./Pageroutes";
import Header from "./Shared/Header";
import Sidebar from "./Shared/Sidebar";
import Footer from "./Shared/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Pageroutes />
      <Footer />
    </>
  );
};

export default App;
