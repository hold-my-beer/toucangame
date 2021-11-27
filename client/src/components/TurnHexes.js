import React from "react";
import { HexGrid, Layout, Hexagon } from "react-hexgrid";

const TurnHexes = ({
  deal,
  // , roundNumber,
  turnNumber,
  // turn,
  // isBonusMove,
  bonusMovesQty,
}) => {
  // const [width, setWidth] = useState(1);

  // useEffect(() => {
  //   if (width >= 100) return;

  //   const id = setTimeout(() => {
  //     setWidth(width + 1);
  //   }, 300);

  //   return () => clearTimeout(id);
  // }, [width]);

  return (
    <div className="turnHexes">
      {/* <h4 className="text-center">Раунд: {roundNumber}</h4>
      {isBonusMove ? (
        <h4 className="text-center text-danger">Бонусный Ход</h4>
      ) : (
        <h4 className="text-center">Ход: {turnNumber}</h4>
      )} */}
      {/* <div>
        <span>Текущий ход:</span>
      </div> */}
      <div className="turnNumber">
        <span>Ход: {turnNumber}</span>
      </div>
      {/* <div className="bonusMove">
        {bonusMovesQty ? (
          <span>
            Бонус ход:{" "}
            
            {bonusMovesQty}
          </span>
        ) : (
          ""
        )}
      </div> */}
      <div className="turnHexesContainer">
        {/* {turn &&
        !turn.loading &&
        turn.bonusMoves.filter((item) => item.moveIsMade === false).length ? (
          <span>
            Бонусный ход:{" "}
            {turn.bonusMoves.filter((item) => item.moveIsMade === false).length}
          </span>
        ) : ( */}
        {/* <div className="bonusMove"></div> */}
        <HexGrid width={140} height={45} viewBox="0 0 100 100">
          <Layout
            size={{ x: 45, y: 45 }}
            flat={false}
            spacing={1.1}
            origin={{ x: 25, y: 55 }}
          >
            {deal.map((item, index) =>
              item === "any" ? (
                <Hexagon
                  key={index}
                  q={index}
                  r={0}
                  s={0 - index}
                  className="any"
                  fill="MyGradient"
                >
                  <defs>
                    <linearGradient id="MyGradient" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffff99" />
                      <stop offset="25%" stopColor="#ffff99" />
                      <stop offset="25%" stopColor="#66ff33" />
                      <stop offset="50%" stopColor="#66ff33" />
                      <stop offset="50%" stopColor="#777" />
                      <stop offset="75%" stopColor="#777" />
                      <stop offset="75%" stopColor="#0099ff" />
                      <stop offset="100%" stopColor="#0099ff" />
                    </linearGradient>
                  </defs>
                  {/* <Text>{cellsLeft.any}</Text> */}
                </Hexagon>
              ) : (
                <Hexagon
                  key={index}
                  q={index}
                  r={0}
                  s={0 - index}
                  className={item}
                ></Hexagon>
              )
            )}
            {/* <Hexagon q={0} r={0} s={0} className={deal[0]}></Hexagon>
            <Hexagon q={1} r={0} s={-1} className={deal[1]}></Hexagon> */}
          </Layout>
        </HexGrid>
        {/* } */}
      </div>

      {/* <div className="turnProgressContainer">
        <div className="turnProgress" style={{ width: `${width + "%"}` }}></div>
      </div> */}
    </div>
  );
};

export default TurnHexes;
