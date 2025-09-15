import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        id="loader"
      >
        <img src="assets/images/media/loader.svg" alt="" />
        {/* <PropagateLoader color="#9ed5eb" size={15} speedMultiplier={1} /> */}
      </div>
    </>
  );
};

export default Loader;
