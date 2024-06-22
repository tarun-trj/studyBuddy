import React from "react";
import { MoonLoader } from "react-spinners";

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <MoonLoader color="#318a7e" size={50} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;