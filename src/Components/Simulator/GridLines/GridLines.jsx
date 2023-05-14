import React from "react";
import { Rect, Group } from "react-konva";
import { v4 as uuid } from 'uuid';

const WIDTH = 100;
const HEIGHT = 100;

const grid = [["white", "white"], ["white", "white"]];

const GridLines = (props) => {
  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 });
  const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  const gridComponents = [];
  var i = 0;
  for (var x = startX; x < endX; x += WIDTH) {
    for (var y = startY; y < endY; y += HEIGHT) {
      if (i === 4) {
        i = 0;
      }

      const indexX = Math.abs(x / WIDTH) % grid.length;
      const indexY = Math.abs(y / HEIGHT) % grid[0].length;

      gridComponents.push(
        
        {key: uuid.unique_id,
        body: <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill={grid[indexX][indexY]}
          stroke="black"
        />}
      );
    }
  }
  return (
    <Group 
      onClick={() => {
        props.setFocusElement('')
      }}
    >
      {gridComponents.map(g => g.body)}
    </Group>
    
  );
};

export default GridLines;