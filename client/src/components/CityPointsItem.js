import React from "react";

const CityPointsItem = ({ isMinor, city, awardedPoints }) => {
  return (
    <div className="cityPointsItem">
      {/* <div className="cityPointsFrom">{city.name}</div>
      <div className="cityPointsTo">{city.name}</div> */}
      <div className="cityPointsFromTo">
        <span>{city.name}</span>
        <span>{city.name}</span>
      </div>
      <div className={`cityPointsValue ${awardedPoints.pts ? "awarded" : ""}`}>
        {isMinor ? city.points.minor : city.points.major}
      </div>
    </div>
  );
};

export default CityPointsItem;
