import React from 'react'
import {Circle, Group, Line, Shape} from 'react-konva';
function Xor({Rx = 0, Ry = 0, Rw = 100, Rh = 100, Tfz = 40, text, focusElement = false, ...props}) {
  return (
    <Group>
        <Shape
            sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(Rw/2 - 20, 0);
            context.quadraticCurveTo(0.8*Rw, 0, Rw, Rh/2);
            context.quadraticCurveTo(0.85*Rw, 0.85*Rh, Rw/2, Rh);
            context.lineTo(0, Rh);
            context.quadraticCurveTo(0.5*Rw, 0.5*Rh, 0, 0);
            context.closePath();
            context.fillStrokeShape(shape);
            }}
            fill="white"
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
        <Line
            points={[-Rw*0.1, 0, Rw/6, Rh/2, -Rw*0.1, Rh]}
            tension={0.5}
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
    </Group>
  )
}

export default Xor