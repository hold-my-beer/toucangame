import React from "react";
import CityPointsItem from "./CityPointsItem";

const CityPoints = ({ isMinor, cities, cityPoints }) => {
  const awardedPoints = [];
  cities.forEach((city) => {
    const cityPointIndex = cityPoints.findIndex(
      (item) => item.name === city.name
    );

    if (cityPointIndex === -1) {
      awardedPoints.push([]);
    } else {
      awardedPoints.push(cityPoints[cityPointIndex]);
    }
  });

  return (
    <div className="cityPoints">
      <div className="cityPointsBackground"></div>
      {cities.map((city, index) => (
        <CityPointsItem
          key={index}
          isMinor={isMinor}
          city={city}
          awardedPoints={awardedPoints[index]}
        />
      ))}
    </div>
  );
};

export default CityPoints;
