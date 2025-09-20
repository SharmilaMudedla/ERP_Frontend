import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      &lt;&gt;
      {/* Start::main-footer */}
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span className="text-muted">
            {" "}
            Copyright © <span id="year" />{" "}
            <a href="javascript:void(0);" className="text-dark fw-medium"></a>.
            Designed by{" "}
            <a href="https://spondias.com/" target="_blank">
              <span className="fw-medium text-primary text-rainbow-animation">
                Spondias
              </span>
            </a>{" "}
            All rights reserved
          </span>
        </div>
      </footer>{" "}
      {/* End::main-footer */}
      {/* <span className="bi bi-heart-fill text-danger" /> */}
    </>
  );
};

export default Footer;
