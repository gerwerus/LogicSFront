import React, { useRef, useState } from 'react'
import { Circle, Group, Line } from 'react-konva';

const RADIUS = 5;

function getMousePos(e) {
  
    const position = e.position();
    const stage = e.getStage();
    const pointerPosition = stage.getPointerPosition();
    return {
      x: pointerPosition.x - position.x,
      y: pointerPosition.y - position.y
    };
  }
  

function Anchor(props) {  
  const previewLine = useRef([])
  const anch = useRef([]);
  
  return (
    
    <Group>
      <Line
        x={props.x}
        y={props.y}
        points={[0, 0, 0, 0]}
        stroke='red'
        strokeWidth={5}
        perfectDrawn={false}
        ref={previewLine}
      />
      <Circle
        onMouseOut={() => {
          anch.current.radius(RADIUS);
          anch.current.fill('red')
          }
        }
        onMouseOver={() => {
          anch.current.radius(RADIUS + 3);
          anch.current.fill('white')
          }
        }
        onDragMove={(e) => {
            previewLine.current.points([0, 0, anch.current.x() - props.x, anch.current.y() - props.y]);
            anch.current.radius(2)
            anch.current.stroke('green')
          }
        }
        onDragEnd={(e) => props.handleWire(e)}
        x={props.x} 
        y={props.y}
        radius={RADIUS}
        stroke="red" 
        fill={'red'}
        fillEnabled
        draggable
        perfectDrawEnabled={false}
        ref={anch}
      />
    </Group>
  )
}

export default Anchor