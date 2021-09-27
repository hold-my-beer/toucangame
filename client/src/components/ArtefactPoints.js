import React from "react";
import ArtefactPointsItem from "./ArtefactPointsItem";

const ArtefactPoints = ({ isMinor, artefacts }) => {
  return (
    <div className="artefactPoints">
      {artefacts.map((artefact) => (
        <ArtefactPointsItem isMinor={isMinor} artefact={artefact} />
      ))}
      {/* Obelisk Points */}
      {/* <div className="artefactPointsItem">
        <div className="mr-1 artefactPointsPicture">
          <img src="img/building-48701_640.png" alt="обелиск" />
        </div>
        <div className="mr-1 artefactPointsValue1">1</div>
        <div className="artefactPointsValue2">2+</div>
      </div> */}
      {/* Book Points */}
      {/* <div className="artefactPointsItem">
        <div className="mr-1 artefactPointsPicture">
          <img src="img/book-1296045_640.png" alt="книга" />
        </div>
        <div className="mr-1 artefactPointsValue1">2</div>
        <div className="artefactPointsValue2">2+</div>
      </div> */}
      {/* Toucan Points */}
      {/* <div className="artefactPointsItem">
        <div className="mr-1 artefactPointsPicture">
          <img src="img/toucan-154521_640.png" alt="тукан" />
        </div>
        <div className="mr-1 artefactPointsValue1">2</div>
        <div className="artefactPointsValue2">3+</div>
      </div> */}
      {/* Yeti Points */}
      {/* <div className="artefactPointsItem">
        <div className="mr-1 artefactPointsPicture">
          <img src="img/yeti-575808_640.png" alt="йети" />
        </div>
        <div className="mr-1 artefactPointsValue1">3</div>
        <div className="artefactPointsValue2">4+</div>
      </div> */}
      {/* Dragon Points */}
      {/* <div className="artefactPointsItem">
        <div className="mr-1 artefactPointsPicture">
          <img src="img/dragon-2023884_640.png" alt="дракон" />
        </div>
        <div className="mr-1 artefactPointsValue1">4</div>
        <div className="artefactPointsValue2">5+</div>
      </div> */}
    </div>
  );
};

export default ArtefactPoints;
