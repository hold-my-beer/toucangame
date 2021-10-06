import React from "react";
import CityPointsItem from "./CityPointsItem";

const CityPoints = ({ isMinor, cities }) => {
  return (
    <div className="cityPoints">
      {cities.map((city, index) => (
        <CityPointsItem key={index} isMinor={isMinor} city={city} />
      ))}
    </div>
  );
};

export default CityPoints;
