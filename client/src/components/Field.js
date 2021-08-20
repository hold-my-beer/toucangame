import React, { Component, useState, useEffect } from "react";
import {
  GridGenerator,
  HexGrid,
  Layout,
  Path,
  Pattern,
  Text,
  Hexagon,
  HexUtils,
} from "react-hexgrid";
import { v4 as uuidv4 } from "uuid";

// class Field extends Component {
//   constructor(props) {
//     super(props);
//     const hexagons = GridGenerator.rectangle(9, 10);
//     this.state = {
//       hexagons,
//       path: { start: null, end: null },
//     };
//   }
const Field = () => {
  const [hexagons, setHexagons] = useState(GridGenerator.rectangle(9, 10));
  const [path, setPath] = useState({ start: null, end: null });
  const [paths, setPaths] = useState([]);

  const pathsContain = (newPath) => {
    return (
      paths.filter(
        (item) =>
          (HexUtils.equals(item.start, newPath.start) &&
            HexUtils.equals(item.end, newPath.end)) ||
          (HexUtils.equals(item.start, newPath.end) &&
            HexUtils.equals(item.end, newPath.start))
      ).length > 0
    );
  };

  // onClick(event, source) {
  //   const { path } = this.state;
  //   if (path.start == null) {
  //     path.start = source.state.hex;
  //   } else {
  //     path.start = null;
  //     path.end = null;
  //   }
  //   this.setState({ path });
  // }
  const onClick = (e, source, hex) => {
    // console.log(e.target);
    // console.log(source);
    // console.log(hex);
    // hex.props = hex.props || {};
    // hex.props.className = "active";
    setHexagons([
      ...hexagons.map((item) => {
        item.props = {};

        if (HexUtils.equals(item, hex)) {
          item.props.className = "active";
        }

        return item;
      }),
    ]);
    // source.props.className = "active";

    // No path initiated
    if (!path.start) {
      setPath({ ...path, start: source.state.hex });
    }
    // The same hex clicked
    else if (HexUtils.equals(source.state.hex, path.start)) {
      setPath({ ...path, start: null });
    }
    // Hex clicked is a neighbour
    else if (HexUtils.distance(source.state.hex, path.start) < 2) {
      setPath({ ...path, end: source.state.hex });
    }
  };

  useEffect(() => {
    // If path.end is not null && no such path already created
    if (path.end && !pathsContain(path)) {
      setPaths([...paths, path]);
    }
    setPath({ start: null, end: null });
  }, [path.end]);

  // onMouseEnter(event, source) {
  //   // Set the path's end on hover
  //   const { path, hexagons } = this.state;
  //   const targetHex = source.state.hex;
  //   path.end = targetHex;

  //   // Color some hexagons
  //   const coloredHexas = hexagons.map((hex) => {
  //     hex.props = hex.props || {};
  //     // Highlight tiles that are next to the target (1 distance away)
  //     hex.props.className =
  //       HexUtils.distance(targetHex, hex) < 2 ? "active" : "";

  //     // If the tile is on same coordinate, add class specific to the coordinate name
  //     hex.props.className += targetHex.q === hex.q ? " q " : "";
  //     hex.props.className += targetHex.r === hex.r ? " r " : "";
  //     hex.props.className += targetHex.s === hex.s ? " s " : "";

  //     return hex;
  //   });

  //   this.setState({ path, hexagons: coloredHexas });
  // }
  const onMouseEnter = (e, source) => {};

  // render() {
  // let { hexagons, path } = this.state;
  return (
    <div className="field">
      {/* <h2>Pathfinding & active highlight</h2>
        <p>
          Click a tile to start drawing a path to your cursor. Click again to
          cancel.
        </p>
        <p>Hover around the board to see helper lines drawn.</p> */}
      <HexGrid width={600} height={800} viewBox="-10 10 100 100">
        <Layout
          size={{ x: 5, y: 5 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {hexagons.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              className={hex.props ? hex.props.className : null}
              // onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
              // onClick={(e, h) => this.onClick(e, h)}
              onClick={(e, h) => onClick(e, h, hex)}
            >
              {/* <Text>{HexUtils.getID(hex)}</Text> */}
              <image
                href="img/book-1296045.png"
                height="5"
                width="5"
                x="-2.5"
                y="-2.5"
              />
            </Hexagon>
          ))}
          {paths.map((item, i) => (
            <Path key={i} start={item.start} end={item.end} />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
  // }
};

// const Field = () => {
//   const divs = [
//     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//   ];
//   const [hex1, setHex1] = useState(null);
//   const [hex2, setHex2] = useState(null);
//   const [point1, setPoint1] = useState({});
//   const [point2, setPoint2] = useState({});

//   // const getCenterCoordinates = (e, index) => {
//   //   console.log(e.target.offsetWidth);
//   //   console.log(e.target.offsetHeight);
//   //   console.log(e.target.offsetTop);
//   //   console.log(e.target.offsetLeft);

//   //   if (!hex1) {
//   //     setHex1({
//   //       id: index,
//   //       width: e.target.offsetWidth,
//   //       height: e.target.offsetHeight,
//   //       top: e.target.offsetTop,
//   //       left: e.target.offsetLeft,
//   //     });
//   //   } else if (index === hex1.id) {
//   //     setHex1(null);
//   //   } else {
//   //     setHex2({
//   //       id: index,
//   //       width: e.target.offsetWidth,
//   //       height: e.target.offsetHeight,
//   //       top: e.target.offsetTop,
//   //       left: e.target.offsetLeft,
//   //     });
//   //   }
//   // };

//   const draw = () => {};

//   useEffect(() => {
//     if (hex1 && hex2) {
//       setPoint1({
//         top: hex1.top + hex1.height / 2,
//         left: hex1.left + hex1.width / 2,
//       });

//       setPoint2({
//         top: hex2.top + hex2.height / 2,
//         left: hex2.left + hex2.width / 2,
//       });

//       setHex1(null);
//       setHex2(null);

//       draw();
//     }
//   }, [hex1, hex2]);

//   return (
//     <div>
//       <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
//         {/* Grid with manually inserted hexagons */}
//         <Layout
//           size={{ x: 10, y: 10 }}
//           flat={true}
//           spacing={1.1}
//           origin={{ x: 0, y: 0 }}
//         >
//           <Hexagon q={0} r={0} s={0} />
//           {/* Using pattern (defined below) to fill the hexagon */}
//           <Hexagon q={0} r={-1} s={1} fill="pat-1" />
//           <Hexagon q={0} r={1} s={-1} />
//           <Hexagon q={1} r={-1} s={0}>
//             <Text>1, -1, 0</Text>
//           </Hexagon>
//           <Hexagon q={1} r={0} s={-1}>
//             <Text>1, 0, -1</Text>
//           </Hexagon>
//           {/* Pattern and text */}
//           <Hexagon q={-1} r={1} s={0} fill="pat-2">
//             <Text>-1, 1, 0</Text>
//           </Hexagon>
//           <Hexagon q={-1} r={0} s={1} />
//           <Hexagon q={-2} r={0} s={1} />
//           <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} />
//         </Layout>
//         <Pattern id="pat-1" link="http://cat-picture" />
//         <Pattern id="pat-2" link="http://cat-picture2" />
//       </HexGrid>
//     </div>
//   );
// };

export default Field;
