import React from 'react'
import {Circle, Group, Shape} from 'react-konva';
function Triangle({Rx = 0, Ry = 0, Rw = 100, Rh = 100, Tfz = 40, text, focusElement = false, ...props}) {
  return (
    <Group>
        <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(0, Rh);
              context.lineTo(Rw, Rh / 2, Rw, Rh/ 2);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            fill="white"
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
        <Circle
            x={Rw}
            y={Rh / 2}
            radius={10}
            fill="white"
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
    </Group>
  )
}

export default Triangle