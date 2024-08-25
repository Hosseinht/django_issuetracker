import React from "react";

const Spinner = ({ height = "h-4", width = "w-4" }) => {
  return (
    <div
      className={`inline-block ${height} ${width} animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
