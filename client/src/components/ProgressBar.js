import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    if (width >= 100) return;

    const id = setTimeout(() => {
      setWidth(width + 1);
    }, 300);

    return () => clearTimeout(id);
  }, [width]);

  return (
    <div className="progressBarContainer">
      <div className="progressBar" style={{ width: `${width + "%"}` }}></div>
    </div>
  );
};

export default ProgressBar;
