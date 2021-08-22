import React from "react";

const Points = () => {
  return (
    <div className="points">
      {/* Artefact Points */}
      <div className="artefactPoints">
        {/* Obelisk Points */}
        <div className="artefactPointsItem">
          <div className="mr-1 artefactPointsPicture">
            <img src="img/building-48701_640.png" />
          </div>
          <div className="mr-1 artefactPointsValue1">1</div>
          <div className="artefactPointsValue2">2+</div>
        </div>
        {/* Book Points */}
        <div className="artefactPointsItem">
          <div className="mr-1 artefactPointsPicture">
            <img src="img/book-1296045_640.png" />
          </div>
          <div className="mr-1 artefactPointsValue1">2</div>
          <div className="artefactPointsValue2">2+</div>
        </div>
        {/* Toucan Points */}
        <div className="artefactPointsItem">
          <div className="mr-1 artefactPointsPicture">
            <img src="img/toucan-154521_640.png" />
          </div>
          <div className="mr-1 artefactPointsValue1">2</div>
          <div className="artefactPointsValue2">3+</div>
        </div>
        {/* Yeti Points */}
        <div className="artefactPointsItem">
          <div className="mr-1 artefactPointsPicture">
            <img src="img/yeti-575808_640.png" />
          </div>
          <div className="mr-1 artefactPointsValue1">3</div>
          <div className="artefactPointsValue2">4+</div>
        </div>
        {/* Dragon Points */}
        <div className="artefactPointsItem">
          <div className="mr-1 artefactPointsPicture">
            <img src="img/dragon-2023884_640.png" />
          </div>
          <div className="mr-1 artefactPointsValue1">4</div>
          <div className="artefactPointsValue2">5+</div>
        </div>
      </div>

      {/* City Points */}
      <div className="cityPoints">
        <div className="cityPointsItem">
          <div className="cityPointsFrom">А</div>
          <div className="cityPointsTo">А</div>
          <div className="cityPointsValue">14</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Б</div>
          <div className="cityPointsTo">Б</div>
          <div className="cityPointsValue">13</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">В</div>
          <div className="cityPointsTo">В</div>
          <div className="cityPointsValue">12</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Г</div>
          <div className="cityPointsTo">Г</div>
          <div className="cityPointsValue">11</div>
        </div>
        <div className="cityPointsItem">
          <div className="cityPointsFrom">Д</div>
          <div className="cityPointsTo">Д</div>
          <div className="cityPointsValue">10</div>
        </div>
      </div>

      {/* Bonus and Total Points */}
      <div className="otherPoints">
        <div className="bonusPoints">
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
          <div className="bonusPointValue"></div>
        </div>
        <div className="totalPoints">
          <div className="totalPointsItem totalFirstRoundArtefactPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalSecondRoundArtefactPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalCityPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalBonusPoints">
            <div className="totalPointValue"></div>
          </div>
          <div className="totalPointsItem totalOverallPoints">
            <div className="totalPointValue"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Points;
