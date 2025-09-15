import React from "react";

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
            <a href="javascript:void(0);" className="text-dark fw-medium">
              Meno
            </a>
            . Designed with <span className="bi bi-heart-fill text-danger" /> by{" "}
            <a href="https://spruko.com/" target="_blank">
              <span className="fw-medium text-primary">Spruko</span>
            </a>{" "}
            All rights reserved
          </span>
        </div>
      </footer>{" "}
      {/* End::main-footer */}
    </>
  );
};

export default Footer;
